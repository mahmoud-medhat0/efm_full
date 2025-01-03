<?php

namespace App\Http\Controllers\client;

use DateInterval;
use Carbon\Carbon;
use App\Models\Task;
use App\Models\User;
use Inertia\Inertia;
use App\Models\Order;
use App\Models\Client;
use App\Models\Ticket;
use App\Models\Service;
use App\Models\Currency;
use App\Models\Gateways;
use App\Models\BanAttemp;
use App\Models\Membershib;
use Endroid\QrCode\QrCode;
use App\Models\ManualField;
use App\Models\Transaction;
use App\Models\AgentRequest;
use App\Rules\AdBlockDetect;
use Illuminate\Http\Request;
use App\Models\TicketMessage;
use App\Mail\SubscriptionMail;
use App\Models\TicketCategory;
use App\Models\ReferralSetting;
use App\Models\InterestCategory;
use App\Models\RegistrationOffer;
use App\Rules\IpDuplicateForTask;
use Illuminate\Support\Facades\DB;
use Alaouy\Youtube\Facades\Youtube;
use App\Http\Controllers\Controller;
use App\Models\WithdrawAccountField;
use Endroid\QrCode\Writer\PngWriter;
use Illuminate\Support\Facades\Mail;
use App\Jobs\PushDepositNotification;
use App\Models\SubscriptionMembership;
use App\Rules\ValidUserViaUSerOrEmail;
use App\Jobs\PushWithdrawlNotification;
use App\Jobs\PushMembershipNotification;
use App\Jobs\SendMessageNotificationBot;
use PragmaRX\Google2FALaravel\Google2FA;
use Illuminate\Support\Facades\Validator;
use App\Jobs\MembershipCongratsMessageJob;
use App\Rules\TaskBelongsToAuthClientRule;
use Stevebauman\Location\Facades\Location;
use Alaouy\Youtube\Rules\ValidYoutubeVideo;
use Laravel\Nova\Notifications\NovaNotification;
use App\Rules\WithdrawAccountBelongsToAuthClient;

class DashboardContrtoller extends Controller
{
    public function index()
    {
        $loginFailed = auth()->user()->loginAttempts()->where('successful', false)->get();
        return Inertia::render('newui/Component/DashBoard/Home/Home.jsx', [
            'loginFailures' => $loginFailed,
            'services' => Service::where('status', 'active')->get()->map(function ($service) {
                return [
                    'id' => $service->id,
                    'name' => $service->name,
                    'pending' => $service->pending_tasks(auth()->user())->count(),
                    'completed' => $service->completed_tasks(auth()->user())->count(),
                ];
            }),
            'tasksearn' => Task::where('paid', true)->where('client_id', auth()->user()->id)->get()->sum(function ($task) {
                return $task->reward();
            }),
            'video_clicks' => auth()->user()->tasks()->where('status', 'completed')->count(),
            'tasks' => auth()->user()->tasks()->where('removed', false)->count(),
            'tasks_completed' => auth()->user()->tasks()->where('status', 'completed')->where('removed', false)->count(),
            'deposits' => auth()->user()->transactions()->where('type', 'deposit')->where('status', 'success')->sum('amount'),
            'pending_withdrawls' => auth()->user()->transactions()->where('type', 'withdraw')->where('status', 'pending')->sum('amount'),
            'direct_referrals' => auth()->user()->referrals()->count(),
            'referrals_earn' => auth()->user()->transactions()->where('type', 'referral')->sum('total'),
        ]);
    }
    public function advertiserPanel()
    {
        return Inertia::render('settings/pages/AdvertiserPanel/index.tsx');
    }
    //Finance methods
    public function deposit(Request $request)
    {
        return Inertia::render('newui/Component/DashBoard/AddFunds/AddFunds.jsx', [
            'methods' => Gateways::depositGateways()->map(function ($gateway) {
                return [
                    'name' => $gateway->name,
                    'id' => $gateway->id,
                    'logo' => $gateway->logo,
                    'attachment' => $gateway->attachment,
                    'description_deposit' => $gateway->description_deposit,
                    'charge_type_deposit' => $gateway->charge_type_deposit,
                    'charge_deposit' => $gateway->charge_deposit,
                    'target_deposit' => $gateway->target_deposit,
                    'auto' => $gateway->auto,
                    'vat_deposit_type' => $gateway->vat_deposit_type,
                    'vat_deposit' => $gateway->vat_deposit,
                    'client_fields' => $gateway->clientFields(),
                ];
            }),
            'plan' => $request->plan ?? null,
            'method' => $request->method ?? null,
            'amount' => $request->amount ?? null,
        ]);
    }
    public function depositPost(Request $request)
    {
        try {
            $rules = [
                'selectedMethod' => ['required', 'exists:gateways,id'],
            ];
            $method = Gateways::find($request->selectedMethod);
            if ($method->client_fields && json_decode($method->client_fields, true) && count(json_decode($method->client_fields, true)) > 0) {
                $clientFields = json_decode($method->client_fields, true);
                if (is_array($clientFields)) {
                    foreach ($clientFields as $field) {
                        $manualField = ManualField::find($field);
                        $rules[str_replace(' ', '_', $manualField->name_en)] = ($manualField->required == 1 ? 'required' : 'nullable');
                    }
                } else {
                    return response()->json(['success' => false, 'message' => 'Client fields are not valid'], 200);
                }
            }
            $validator = Validator::make($request->all(), $rules);
            if ($validator->fails()) {
                return response()->json(['success' => false, 'message' => 'Validation failed', 'errors' => $validator->errors()], 200);
            }
            $pending_deposit = Transaction::where('client_id', auth()->user()->id)->where('type', 'deposit')->where('status', 'pending')->count();
            if ($pending_deposit > 0) {
                return response()->json(['success' => false, 'message' => 'You have a pending deposit. Please wait for approval.'], 200);
            }
            $gateway = Gateways::find($request->selectedMethod);
            if ($gateway->attachment == true) {
                if ($request->attachment == null) {
                    return response()->json(['success' => false, 'message' => 'Attachment is required'], 200);
                }
            }
            $rules = [
                'amount' => ['required', 'numeric', 'min:' . $gateway->min_deposit, 'max:' . $gateway->max_deposit],
            ];
            $validator = Validator::make($request->all(), $rules);
            if ($validator->fails()) {
                return response()->json(['success' => false, 'message' => 'Validation failed', 'errors' => $validator->errors()], 200);
            }
            if ($request->hasFile('attachment')) {
                $attachment = $request->file('attachment');
                $filename = 'deposit-' . time() . '-' . pathinfo($attachment->getClientOriginalName(), PATHINFO_FILENAME) . '.' . $attachment->getClientOriginalExtension();
                $attachmentPath = $attachment->storeAs('attachments/private', $filename, 'public');
            } else {
                $attachmentPath = null;
            }
            $methodData = [];
            if ($method->client_fields && json_decode($method->client_fields, true) && count(json_decode($method->client_fields, true)) > 0) {
                foreach (json_decode($method->client_fields, true) as $field) {
                    $field = ManualField::find($field);
                    $fieldName = str_replace(' ', '_', $field->NameEn);
                    $methodData[$fieldName] = [
                        'type' => $field->type,
                        'value' => $request->input($fieldName)
                    ];
                    if ($field->type == 'image') {
                        $uploadedFile = $request->file($fieldName);
                        $filename = 'deposit-manual-attachment-' . time() . '-' . pathinfo($uploadedFile->getClientOriginalName(), PATHINFO_FILENAME) . '.' . $uploadedFile->getClientOriginalExtension();
                        $methodData[$fieldName]['value'] = $uploadedFile->storeAs('attachments/private/manual_attachments', $filename, 'public');
                    } else {
                        $methodData[$fieldName]['value'] = $request->input($fieldName);
                    }
                }
            }
            $fees = $gateway->charge_type_deposit == 'percentage' ? ($gateway->charge_deposit * $request->amount / 100) : $gateway->charge_deposit;
            $vat = $gateway->vat_deposit_type == 'percentage' ? ($gateway->vat_deposit * $request->amount / 100) : $gateway->vat_deposit;
            $total = $request->amount + $fees + $vat;
            $methodData = json_encode($methodData);
            $tnx = 'DEP' . time();
            $transaction = Transaction::create([
                'amount' => $request->amount,
                'fee' => $fees,
                'total' => $total,
                'tnx_type' => 'add',
                'tnx' => $tnx,
                'type' => 'deposit',
                'description' => 'Deposit from ' . $gateway->name,
                'gateway_id' => $request->selectedMethod,
                'client_id' => auth()->user()->id,
                'attachment' => $attachmentPath,
                'manual_fields' => $methodData,
            ]);
            AgentRequest::create([
                'transaction_id' => $transaction->id,
                'gateway_id' => $request->selectedMethod,
                'client_id' => auth()->user()->id,
                'status' => 'pending',
            ]);
            PushDepositNotification::dispatch(auth()->user(), $transaction)->onQueue('default');
            $message = 'New Deposit Request from ' . auth()->user()->name . ' (' . auth()->user()->username . ')' . ' With Gateway: ' . $transaction->gateway->name . ' for ' . $transaction->amount . ' EGP';
            SendMessageNotificationBot::dispatch($message, '948449142')->onQueue('default');
            SendMessageNotificationBot::dispatch($message, '7812601988')->onQueue('default');
            SendMessageNotificationBot::dispatch($message, '5864049778')->onQueue('default');
            SendMessageNotificationBot::dispatch($message, '6461632565')->onQueue('default');
            return response()->json(['success' => true, 'message' => 'Deposit successful', 'tnx' => $tnx]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 200);
        }
    }
    //withdraw methods
    public function withdraw()
    {
        return Inertia::render('newui/Component/DashBoard/WithdrawFund/WithdrawFunds.jsx', [
            'methods' => Gateways::withdrawGateways()->map(function ($gateway) {
                return [
                    'name' => $gateway->name,
                    'id' => $gateway->id,
                    'logo' => $gateway->logo,
                    'attachment' => $gateway->attachment,
                    'description_withdraw' => $gateway->description_withdraw,
                    'charge_type_withdraw' => $gateway->charge_type_withdraw,
                    'charge_withdraw' => $gateway->charge_withdraw,
                    'withdrawAccounts' => auth()->user()->withdrawAccounts()->where('gateway_id', $gateway->id)->get()->toArray(),
                    'withdrawFields' => $gateway->withdrawFields(),
                ];
            }),
        ]);
    }
    public function withdrawAccount(Request $request)
    {
        $rules = [
            'selectedMethod' => ['required', 'exists:gateways,id'],
        ];
        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            return response()->json(['success' => false, 'message' => 'Validation failed', 'errors' => $validator->errors()], 400);
        }
        // Check if client has withdraw account in this gateway
        $existingAccount = auth()->user()->withdrawAccounts()->where('gateway_id', $request->selectedMethod)->first();
        if ($existingAccount) {
            return response()->json(['success' => false, 'message' => 'Withdraw account already exists for this gateway'], 400);
        }

        $gateway = Gateways::find($request->selectedMethod);
        $fields = $gateway->withdrawFields();
        foreach ($fields as $field) {
            $rules[$field->name_en] = ($field->is_required == 1 ? 'required' : 'nullable') .
                (isset($field->is_unique) && $field->is_unique ? '|unique:withdraw_accounts,data->' . $field->name_en : '');
        }
        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            return response()->json(['success' => false, 'message' => 'Validation failed', 'errors' => $validator->errors()], 200);
        }
        $data = [];
        foreach ($fields as $field) {
            $data[$field->name_en] = $request->input($field->name_en);
        }
        $data = json_encode($data);
        auth()->user()->withdrawAccounts()->create([
            'client_id' => auth()->user()->id,
            'data' => $data,
            'gateway_id' => $request->selectedMethod,
        ]);
        return response()->json(['success' => true, 'message' => 'Withdraw account created successfully']);
    }
    public function withdrawPost(Request $request)
    {
        $rules = [
            'selectedMethod' => ['required', 'exists:gateways,id'],
            'account_id' => ['required', 'exists:withdraw_accounts,id', new WithdrawAccountBelongsToAuthClient],
            'amount' => ['required', 'numeric', 'min:' . Gateways::find($request->selectedMethod)->min_withdraw, 'max:' . min(Gateways::find($request->selectedMethod)->max_withdraw, auth()->user()->balance)],
        ];
        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            return response()->json(['success' => false, 'message' => 'Validation failed', 'errors' => $validator->errors()], 200);
        }
        $gateway = Gateways::find($request->selectedMethod);
        $rules = [
            'amount' => ['required', 'numeric', 'min:' . $gateway->min_withdraw, 'max:' . min($gateway->max_withdraw, auth()->user()->balance)],
        ];
        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            return response()->json(['success' => false, 'message' => 'Validation failed', 'errors' => $validator->errors()], 200);
        }
        $fees = $gateway->charge_type_withdraw == 'percentage' ? ($gateway->charge_withdraw * $request->amount / 100) : $gateway->charge_withdraw;
        $vat = $gateway->vat_withdraw_type == 'percentage' ? ($gateway->vat_withdraw * $request->amount / 100) : $gateway->vat_withdraw;
        $total = $request->amount - $fees - $vat;
        $tnx = "WITH" . time();
        $transaction = Transaction::create([
            'amount' => $request->amount,
            'fee' => $fees,
            'total' => $total,
            'tnx_type' => 'sub',
            'tnx' => $tnx,
            'type' => 'withdraw',
            'description' => 'Withdraw to ' . $gateway->name,
            'gateway_id' => $request->selectedMethod,
            'client_id' => auth()->user()->id,
            'withdraw_account_id' => $request->account_id,
        ]);
        auth()->user()->update(['balance' => auth()->user()->balance - $request->amount]);
        PushWithdrawlNotification::dispatch(auth()->user(), $transaction)->onQueue('default');
        $message = 'New Withdraw Request from ' . auth()->user()->name . ' (' . auth()->user()->username . ')' . ' With Gateway: ' . $transaction->gateway->name . ' for ' . $transaction->amount . ' EGP';
        SendMessageNotificationBot::dispatch($message, '948449142')->onQueue('default');
        SendMessageNotificationBot::dispatch($message, '7812601988')->onQueue('default');
        SendMessageNotificationBot::dispatch($message, '5864049778')->onQueue('default');
        SendMessageNotificationBot::dispatch($message, '6461632565')->onQueue('default');
        return response()->json(['success' => true, 'message' => 'Withdraw successful', 'tnx' => $tnx]);
    }
    //Tasks methods
    public function tasks()
    {
        return Inertia::render('newui/Component/DashBoard/Tasks/Tasks.jsx', [
            'tasks' => auth()->user()->tasks()->where('removed', false)->whereHas('order', function ($query) {
                $query->where('status', 'approved');
            })->orderBy('created_at', 'desc')->get()->map(function ($task) {
                return [
                    'id' => $task->id,
                    'order_id' => $task->order_id,
                    'service_id' => $task->service_id,
                    'service_name' => $task->service->name,
                    'service_code' => $task->service->service_code,
                    'service_type' => $task->service->type,
                    'service_thumbnail' => $task->service->icon,
                    'description' => $task->order->description,
                    'fields' => $task->service->fields(),
                    'instructions' => $task->order->instructions,
                    'status' => $task->status,
                    'data' => json_decode($task->order->data, true),
                    'categories' => $task->order->categories->pluck('name')->toArray(),
                    'reward' => number_format($task->reward(), 2),
                    'order' => $task->order,
                    'rejection_cause_name' => $task->rejection_cause_name,
                ];
            }),
            'categories' => auth()->user()->tasks()->where('status', '!=', 'completed')->where('removed', false)->whereHas('order', function ($query) {
                $query->where('status', 'approved');
            })->with('service:id,name')->select('service_id')->distinct()->get()->map(function ($task) {
                return [
                    'service_id' => $task->service_id,
                    'service_name' => $task->service->name,
                ];
            })->toArray()
        ]);
    }
    public function getTaskStatus(Request $request)
    {
        $rules = [
            'taskId' => ['required', 'exists:tasks,id', new TaskBelongsToAuthClientRule, new IpDuplicateForTask($request->taskId), new AdBlockDetect],
        ];
        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            return response()->json(['success' => false, 'message' => $validator->errors()->first()], 200);
        }
        $task = Task::find($request->taskId);
        $ip = DetectIp();
        return response()->json(['success' => true, 'status' => $task->status, 'ip_detected' => $ip]);
    }
    public function UpdateTask(Request $request)
    {
        $task = Task::find($request->taskId);
        if ($task->status != 'completed' && $task->status != 'cancelled') {
            $user_agent = $request->userAgent();
            if ($request->status == 'completed' && $task->status != 'completed' && $task->paid == false) {
                Transaction::create([
                    'status' => 'success',
                    'amount' => $task->reward(),
                    'fee' => 0,
                    'total' => $task->reward(),
                    'tnx_type' => 'add',
                    'tnx' => 'PTS' . time(),
                    'type' => 'points',
                    'description' => 'Points reward for task of Order ID: ' . $task->order->order_id,
                    'client_id' => auth()->user()->id,
                ]);
                $task->update(['paid' => true, 'points_reward' => $task->reward()]);
                auth()->user()->increment('balance', $task->reward());
                Order::find($task->order_id)->increment('current_amount');
            }
            if ($request->status == 'in_progress' && $task->status != 'in_progress') {
                Order::find($task->order_id)->increment('current_amount');
            }
            if ($request->status == 'failed' && $task->status != 'failed') {
                Order::find($task->order_id)->decrement('current_amount');
            }
            $task->update(['status' => $request->status, 'ip' => $request->ip(), 'country' => $request->country, 'user_agent' => $user_agent]);
        }
    }
    public function UpdateManualTask(Request $request)
    {
        try {
            $rules = [
                'task_id' => ['required', 'exists:tasks,id', new TaskBelongsToAuthClientRule],
            ];
            $validator = Validator::make($request->all(), $rules);
            if ($validator->fails()) {
                return response()->json(['success' => false, 'message' => $validator->errors()->first()], 200);
            }
            $task = Task::find($request->task_id);
            $fields = $task->service->fields();
            foreach ($fields as $field) {
                $rules[str_replace(' ', '_', $field->name_en)] = ($field->required == 1 ? 'required' : 'nullable');
            }
            $validator = Validator::make($request->all(), $rules);
            if ($validator->fails()) {
                return response()->json(['success' => false, 'message' => $validator->errors()->first()], 200);
            }
            $data = [];
            foreach ($fields as $field) {
                if ($field->type == 'image') {
                    if ($request->hasFile(str_replace(' ', '_', $field->name_en))) {
                        $uploadedFile = $request->file(str_replace(' ', '_', $field->name_en));
                        $filename = 'task-manual-attachment-' . time() . '-' . pathinfo($uploadedFile->getClientOriginalName(), PATHINFO_FILENAME) . '.' . $uploadedFile->getClientOriginalExtension();
                        $data[$field->name_en]['value'] = $uploadedFile->storeAs('attachments/private/tasks/manual/' . auth()->user()->id, $filename, 'public');
                        $data[$field->name_en]['type'] = $field->type;
                    } else {
                        return response()->json(['success' => false, 'message' => 'File not uploaded'], 200);
                    }
                } else {
                    $data[$field->name_en]['value'] = $request->input(str_replace(' ', '_', $field->name_en));
                    $data[$field->name_en]['type'] = $field->type;
                }
            }
            $data = json_encode($data);
            $task->update(['status' => 'under_review', 'data' => $data]);
            $task->order->increment('current_amount');
            $task->update(['ip' => $request->ip(), 'country' => $request->country, 'user_agent' => $request->userAgent(), 'under_review_date' => now()]);
            return response()->json(['success' => true, 'message' => 'Task updated successfully']);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 200);
        }
    }
    public function cliBan(Request $request)
    {
        $request->validate([
            'cause' => ['required', 'string'],
        ]);
        BanAttemp::create([
            'client_id' => auth()->user()->id,
            'cause' => $request->cause,
        ]);
        Client::find(auth()->user()->id)->update(['is_active' => false]);
    }
    //convert Point Methods
    public function convertPoints()
    {
        return Inertia::render('settings/pages/settings/ConvertPoints.tsx', [
            'points' => auth()->user()->points,
        ]);
    }
    //2fa methods
    public function twoFa()
    {
        return Inertia::render('settings/pages/settings/TwoFactorAuthentication.tsx');
    }
    public function get2faQrUrl()
    {
        $google2fa = app('pragmarx.google2fa');
        // Generate a secret key for the user
        $secret = $google2fa->generateSecretKey();
        // Generate the QR code URL
        $qrCodeUrl = $google2fa->getQRCodeUrl(
            config('app.name'), // Company name
            auth()->user()->email, // User's email
            $secret // Secret key
        );
        auth()->user()->update(['two_factor_code' => $secret]);
        $qrCode = new QrCode($qrCodeUrl);
        $writer = new PngWriter();
        $result = $writer->write($qrCode);
        $dataUri = $result->getDataUri();
        return response()->json(['success' => true, 'message' => 'QR code generated successfully', 'qrCodeUrl' => $dataUri]);
    }
    public function enable2faPost(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'code' => ['required', 'string', 'min:6', 'max:6'],
        ]);

        if ($validator->fails()) {
            return response()->json(['success' => false, 'message' => $validator->errors()->first()], 200);
        }
        $google2fa = app('pragmarx.google2fa');
        $valid = $google2fa->verifyKey(auth()->user()->two_factor_code, $request->code);
        if ($valid) {
            auth()->user()->update(['is_2a' => true]);
            return response()->json(['success' => true, 'message' => '2FA enabled successfully']);
        }
        return response()->json(['success' => false, 'message' => 'Invalid code']);
    }
    public function disable2faPost()
    {
        auth()->user()->update(['is_2a' => false]);
        return response()->json(['success' => true, 'message' => '2FA disabled successfully']);
    }
    public function enable2fa()
    {
        return Inertia::render('settings/pages/settings/Enable2fa.tsx');
    }
    public function membership()
    {
        $currentcount = Client::whereNotNull('activator_count')->latest()->first()->activator_count + 1;
        $registrationOffer = RegistrationOffer::where('min_activator_count', '<=', $currentcount)->where('max_activator_count', '>=', $currentcount)->first();
        return Inertia::render('newui/Component/DashBoard/Upgradeaccount/Upgradeaccount.jsx', [
            'methods' => Gateways::depositGateways()->map(function ($gateway) {
                return [
                    'name' => $gateway->name,
                    'id' => $gateway->id,
                    'logo' => $gateway->logo,
                    'attachment' => $gateway->attachment,
                    'description_deposit' => $gateway->description_deposit,
                    'charge_type_deposit' => $gateway->charge_type_deposit,
                    'charge_deposit' => $gateway->charge_deposit,
                ];
            }),
            'plans' => Membershib::all()->map(function ($plan) use ($registrationOffer) {
                return [
                    'name' => $plan->is_lifetime ? $plan->name . ' - ' . ($registrationOffer ? ($registrationOffer->type == 'percentage' ? $plan->price - ($registrationOffer->value * $plan->price / 100) : $plan->price - $registrationOffer->value) : $plan->price) : $plan->name . ' - ' . number_format($plan->price, 0, '.', ''),
                    'id' => $plan->id,
                ];
            }),
            'memberships' => Membershib::all()->map(function ($membership) {
                return [
                    'name' => $membership->name,
                    'price' => $membership->price,
                    'duration' => $membership->duration,
                ];
            })
        ]);
    }
    public function upgradeBalance(Request $request)
    {
        $rules = [
            'plan' => ['required', 'exists:membershibs,id'],
        ];
        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            return response()->json(['success' => false, 'message' => $validator->errors()->first()], 200);
        }
        $plan = Membershib::find($request->plan);
        if ($plan->is_lifetime == 1 || $plan->is_lifetime == true) {
            $currentcount = Client::whereNotNull('activator_count')->latest()->first()->activator_count + 1;
            $registrationOffer = RegistrationOffer::where('min_activator_count', '<=', $currentcount)->where('max_activator_count', '>=', $currentcount)->first();
            $planPrice = $registrationOffer ? ($registrationOffer->type == 'percentage' ? $plan->price - ($registrationOffer->value * $plan->price / 100) : $plan->price - $registrationOffer->value) : $plan->price;
        } else {
            $planPrice = $plan->price;
        }
        if (auth()->user()->balance < $planPrice) {
            return response()->json(['success' => false, 'message' => 'Insufficient balance to upgrade'], 200);
        }
        if (auth()->user()->hasActiveSubscription) {
            return response()->json(['success' => false, 'message' => 'You already have an active membership'], 200);
        }
        if (auth()->user()->parent && auth()->user()->parent->hasActiveSubscription && auth()->user()->parent->Membership->id != $request->plan) {
            return response()->json(['success' => false, 'message' => 'You can only upgrade to your parent membership'], 200);
        }
        try {
            DB::transaction(function () use ($request) {
                try {
                    $plan = Membershib::find($request->plan);
                    if ($plan->is_lifetime) {
                        $currentcount = Client::whereNotNull('activator_count')->latest()->first()->activator_count + 1;
                        $registrationOffer = RegistrationOffer::where('min_activator_count', '<=', $currentcount)->where('max_activator_count', '>=', $currentcount)->first();
                        $planPrice = $registrationOffer ? ($registrationOffer->type == 'percentage' ? $plan->price - ($registrationOffer->value * $plan->price / 100) : $plan->price - $registrationOffer->value) : $plan->price;
                        Transaction::create([
                            'amount' => $planPrice,
                            'fee' => 0,
                            'total' => $planPrice,
                            'tnx_type' => 'sub',
                            'tnx' => 'SUB' . time(),
                            'type' => 'membership',
                            'description' => 'Upgrade to ' . $plan->name,
                            'client_id' => auth()->user()->id,
                            'status' => 'success',
                        ]);
                        $LastActiveNumber = Client::whereNotNull('activator_count')->count();
                        $user = Client::find(auth()->user()->id);
                        $user->update([
                            'balance' => $user->balance - $planPrice,
                            'activator_count' => $LastActiveNumber + 1
                        ]);
                        if (auth()->user()->parent != null && ReferralSetting::where('code', 'activator_reward')->where('is_active', true)->exists()) {
                            $activatorReward = ReferralSetting::where('code', 'activator_reward')->where('is_active', true)->first()->type;
                            $activatorRewardValue = ReferralSetting::where('code', 'activator_reward')->where('is_active', true)->first()->value;
                            $rewardvalue = $activatorReward == 'percentage' ? ($planPrice * $activatorRewardValue / 100) : $activatorRewardValue;
                            if ($rewardvalue > 0) {
                                Transaction::create([
                                    'amount' => $rewardvalue,
                                    'fee' => 0,
                                    'total' => $rewardvalue,
                                    'tnx_type' => 'add',
                                    'tnx' => 'REF' . time(),
                                    'type' => 'referral',
                                    'description' => 'Referral reward for ' . auth()->user()->name,
                                    'client_id' => auth()->user()->parent->id,
                                    'status' => 'success',
                                ]);
                                auth()->user()->parent->update(['balance' => auth()->user()->parent->balance + $rewardvalue]);
                            }
                            auth()->user()->parent->increment('invites_premium');
                            if (auth()->user()->parent->invites_premium >= 5) {
                                auth()->user()->parent->increment('invites_premium_period');
                                auth()->user()->parent->decrement('invites_premium', 5);
                                Transaction::create([
                                    'amount' => 100,
                                    'fee' => 0,
                                    'total' => 100,
                                    'tnx_type' => 'add',
                                    'tnx' => 'BON' . time(),
                                    'type' => 'bonus',
                                    'description' => 'Bonus reward for ' . auth()->user()->parent->name,
                                    'client_id' => auth()->user()->parent->id,
                                    'status' => 'success',
                                ]);
                                auth()->user()->parent->increment('balance', 100);
                                if (auth()->user()->parent->parent != null) {
                                    Transaction::create([
                                        'amount' => 50,
                                        'fee' => 0,
                                        'total' => 50,
                                        'tnx_type' => 'add',
                                        'tnx' => 'BON' . time(),
                                        'type' => 'bonus',
                                        'description' => 'Bonus reward for Help Person 5 Premium Invites',
                                        'client_id' => auth()->user()->parent->parent->id,
                                        'status' => 'success',
                                    ]);
                                    auth()->user()->parent->parent->increment('balance', 50);
                                }
                            }
                        }
                        $subscription = SubscriptionMembership::create([
                            'client_id' => auth()->user()->id,
                            'membership_id' => $request->plan,
                            'status' => 'active',
                            'start_date' => now(),
                            'end_date' => $plan->subscriptionMemberships
                                ? null
                                : now()->addDays($plan->duration),
                            'is_lifetime' => $plan->subscriptionMemberships,
                        ]);
                        PushMembershipNotification::dispatch(auth()->user(), $subscription->id)->onQueue('default');
                        $message = 'New Membership Upgrade from ' . auth()->user()->name . ' (' . auth()->user()->username . ')' . ' To ' . $plan->name;
                        SendMessageNotificationBot::dispatch($message, '948449142')->onQueue('default');
                        SendMessageNotificationBot::dispatch($message, '7812601988')->onQueue('default');
                        SendMessageNotificationBot::dispatch($message, '5864049778')->onQueue('default');
                        SendMessageNotificationBot::dispatch($message, '6461632565')->onQueue('default');
                        MembershipCongratsMessageJob::dispatch(auth()->user())->onQueue('default');
                    } else {
                        if (auth()->user()->parent != null) {
                            $levelReferralCommissions = $plan->levels_referral_commissions;
                            foreach ($levelReferralCommissions as $id => $level) {
                                $parentlevel = Client::find(auth()->user()->parent->id)->getParentReferralLevel($level['level']);
                                if ($parentlevel != null) {
                                    $ParentClient = Client::find($parentlevel->id);
                                    Transaction::create([
                                        'amount' => (int)$plan->price * $level['percentage'] / 100,
                                        'fee' => 0,
                                        'total' => (int)$plan->price * $level['percentage'] / 100,
                                        'tnx_type' => 'add',
                                        'tnx' => 'REF' . time(),
                                        'type' => 'referral',
                                        'description' => 'Referral reward for ' . auth()->user()->name,
                                        'client_id' => $ParentClient->id,
                                        'status' => 'success',
                                    ]);
                                    $ParentClient->increment('balance', $plan->price * $level['percentage'] / 100);
                                }
                            }
                        }
                        Transaction::create([
                            'amount' => $plan->price,
                            'fee' => 0,
                            'total' => $plan->price,
                            'tnx_type' => 'sub',
                            'tnx' => 'SUB' . time(),
                            'type' => 'membership',
                            'description' => 'Upgrade to ' . $plan->name,
                            'client_id' => auth()->user()->id,
                            'status' => 'success',
                        ]);
                        auth()->user()->update(['balance' => auth()->user()->balance - $plan->price]);
                        $subscription = SubscriptionMembership::create([
                            'client_id' => auth()->user()->id,
                            'membership_id' => $request->plan,
                            'status' => 'active',
                            'start_date' => now(),
                            'end_date' => now()->addDays($plan->days),
                            'is_lifetime' => $plan->is_lifetime,
                        ]);
                        PushMembershipNotification::dispatch(auth()->user(), $subscription->id)->onQueue('default');
                        $message = 'New Membership Upgrade from ' . auth()->user()->name . ' (' . auth()->user()->username . ')' . ' To ' . $plan->name;
                        SendMessageNotificationBot::dispatch($message, '948449142')->onQueue('default');
                        SendMessageNotificationBot::dispatch($message, '7812601988')->onQueue('default');
                        SendMessageNotificationBot::dispatch($message, '5864049778')->onQueue('default');
                        SendMessageNotificationBot::dispatch($message, '6461632565')->onQueue('default');
                        MembershipCongratsMessageJob::dispatch(auth()->user())->onQueue('default');
                    }
                } catch (\Exception $e) {
                    DB::rollBack();
                    return response()->json(['success' => false, 'message' => $e->getMessage()], 200);
                }
            });
            return response()->json(['success' => true, 'message' => 'Upgrade balance successful']);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 200);
        }
    }
    public function upgradeBalanceGateway(Request $request)
    {
        $rules = [
            'plan' => ['required', 'exists:membershibs,id'],
            'method' => ['required', 'exists:gateways,id'],
        ];
        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            return response()->json(['success' => false, 'message' => $validator->errors()->first()], 200);
        }
        return response()->json(['success' => true, 'message' => 'You Will Be Redirected To Payment Page', 'route' => route('client.dashboard.deposit', ['method' => $request->method, 'amount' => Membershib::find($request->plan)->price])]);
    }
    public function referrals()
    {
        return Inertia::render('newui/Component/DashBoard/DirectReferrals/DirectReferrals.jsx', [
            'referrals' => auth()->user()->referrals->map(function ($referral) {
                return [
                    'id' => mb_strtoupper(mb_substr(explode(' ', $referral->name)[0], 0, 1) . mb_substr(explode(' ', $referral->name)[1], 0, 1)),
                    'name' => $referral->name . ($referral->membership ? ' - ' . $referral->membership->name : ' - Free'),
                    'profile_image' => $referral->profile_image ? '/storage/' . $referral->profile_image : null,
                    'email' => $referral->email,
                    'type' => $referral->membership ? $referral->membership->name : 'Free',
                    'has_subscription' => $referral->membership != null ? true : false,
                    'referral_count' => $referral->countReferralsByMembership()->toArray(),
                    'referral_count_free' => $referral->getReferralCountByFreeMembership(),
                ];
            }),
            'referral_count' => auth()->user()->referrals->count(),
            'parent' => auth()->user()->parent,
            'me' => auth()->user(),

        ]);
    }
    public function currencies()
    {
        $currencies = Currency::all();
        return Inertia::render('newui/Component/DashBoard/Currencies/Currencies.jsx', [
            'currencies' => $currencies,
        ]);
    }
    public function transferMoney()
    {
        return Inertia::render('newui/Component/DashBoard/TransferMoneyPage/TransferMoneyPage.jsx');
    }
    public function transferMoneyPost(Request $request)
    {
        $rules = [
            'client' => ['required', new ValidUserViaUSerOrEmail],
            'amount' => ['required', 'numeric', 'min:1', 'max:' . auth()->user()->balance],
        ];
        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            return response()->json(['success' => false, 'message' => $validator->errors()->first()], 200);
        }
        $client = Client::where('username', $request->client)->orWhere('email', $request->client)->first();
        Transaction::create([
            'amount' => $request->amount,
            'fee' => 0,
            'total' => $request->amount,
            'tnx_type' => 'sub',
            'tnx' => 'TRF' . time(),
            'type' => 'transfer',
            'description' => 'Transfer to ' . $client->name,
            'client_id' => auth()->user()->id,
            'status' => 'success',
        ]);
        auth()->user()->update(['balance' => auth()->user()->balance - $request->amount]);
        Transaction::create([
            'amount' => $request->amount,
            'fee' => 0,
            'total' => $request->amount,
            'tnx_type' => 'add',
            'tnx' => 'TRF' . time(),
            'type' => 'transfer',
            'description' => 'Transfer from ' . auth()->user()->name,
            'client_id' => $client->id,
            'status' => 'success',
        ]);
        $client->update(['balance' => $client->balance + $request->amount]);
        return response()->json(['success' => true, 'message' => 'Transfer successful']);
    }
}
