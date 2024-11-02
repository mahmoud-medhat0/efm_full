<?php

namespace App\Http\Controllers\client;

use DateInterval;
use App\Models\Task;
use App\Models\User;
use Inertia\Inertia;
use App\Models\Order;
use App\Models\Client;
use App\Models\Service;
use App\Models\Gateways;
use App\Models\BanAttemp;
use App\Models\Membershib;
use Endroid\QrCode\QrCode;
use App\Models\ManualField;
use App\Models\Transaction;
use App\Models\AgentRequest;
use Illuminate\Http\Request;
use App\Models\ReferralSetting;
use App\Models\InterestCategory;
use App\Models\RegistrationOffer;
use Illuminate\Support\Facades\DB;
use Alaouy\Youtube\Facades\Youtube;
use App\Http\Controllers\Controller;
use Endroid\QrCode\Writer\PngWriter;
use App\Jobs\PushDepositNotification;
use App\Models\SubscriptionMembership;
use App\Jobs\PushWithdrawlNotification;
use App\Jobs\PushMembershipNotification;
use PragmaRX\Google2FALaravel\Google2FA;
use Illuminate\Support\Facades\Validator;
use Stevebauman\Location\Facades\Location;
use Alaouy\Youtube\Rules\ValidYoutubeVideo;
use Laravel\Nova\Notifications\NovaNotification;

class DashboardContrtoller extends Controller
{
    public function index()
    {
        $loginFailed = auth()->user()->loginAttempts()->where('successful', false)->get();
        return Inertia::render('settings/index.tsx', [
            'loginFailures' => $loginFailed,
            'services' => Service::where('status', 'active')->get()->map(function ($service) {
                return [
                    'id' => $service->id,
                    'name' => $service->name,
                    'pending' => $service->pending_tasks(auth()->user())->count(),
                    'completed' => $service->completed_tasks(auth()->user())->count(),
                ];
            }),
            'pending_withdrawls' => auth()->user()->transactions()->where('type', 'withdraw')->where('status', 'pending')->sum('amount'),
            'direct_referrals' => auth()->user()->referrals()->count(),
            'referrals_earn' => auth()->user()->transactions()->where('type', 'referral')->sum('total'),
        ]);
    }
    public function PersonalSettings()
    {
        return Inertia::render('settings/pages/settings/PersonalSettings.tsx');
    }
    public function ChangePassword(Request $request)
    {
        $rules = [
            'current_password' => ['required'],
            'new_password' => ['required', 'min:8', 'confirmed'],
        ];

        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            return response()->json(['success' => false, 'message' => $validator->errors()->first()], 200);
        }

        $user = auth()->user();

        if (!password_verify($request->current_password, $user->password)) {
            return response()->json(['success' => false, 'message' => 'Current password is incorrect'], 200);
        }

        $user->password = bcrypt($request->new_password);
        $user->save();

        return response()->json(['success' => true, 'message' => 'Password changed successfully'], 200);
    }
    public function updateProfileImage(Request $request)
    {
        try {
            $user = auth()->user();
            $user->profile_image = $request->file('profile_image')->store('profile_images', 'public');
            $user->save();
            return response()->json(['success' => true, 'message' => 'Profile image updated successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'Failed to update profile image'], 200);
        }
    }
    public function advertiserPanel()
    {
        return Inertia::render('settings/pages/AdvertiserPanel/index.tsx');
    }
    //Finance methods
    public function deposit(Request $request)
    {
        $secretKey = "bd07a49cd84f877bcb4861c567e8bcb12e206c860aa963ba92";
        $queryParam = "Domain=https://56c7-196-133-114-138.ngrok-free.app&ProviderKey=FAWATERAK.1154";
        $hash = hash_hmac('sha256', $queryParam, $secretKey, false);
        return Inertia::render('settings/pages/AddFunds.tsx', [
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
            'hash' => $hash,
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
            if ($pending_deposit > 1) {
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
            $total = $request->amount + $fees;
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
            PushDepositNotification::dispatch(auth()->user(),$transaction)->onQueue('default');
            return response()->json(['success' => true, 'message' => 'Deposit successful', 'tnx' => $tnx]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 200);
        }
    }
    //withdraw methods
    public function withdraw()
    {
        return Inertia::render('settings/pages/WithdrawFunds.tsx', [
            'methods' => Gateways::withdrawGateways()->map(function ($gateway) {
                return [
                    'name' => $gateway->name,
                    'id' => $gateway->id,
                    'logo' => $gateway->logo,
                    'attachment' => $gateway->attachment,
                    'description_withdraw' => $gateway->description_withdraw,
                    'charge_type_withdraw' => $gateway->charge_type_withdraw,
                    'charge_withdraw' => $gateway->charge_withdraw,
                    'fields' => json_decode($gateway->fields, true),
                    'withdrawAccounts' => auth()->user()->withdrawAccounts()->where('gateway_id', $gateway->id)->first(),
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
        $fields = json_decode($gateway->fields, true);
        $rules[$fields['name']] = ($fields['validation']['required'] ? 'required' : 'nullable') .
            (isset($fields['validation']['regex']) ? '|regex:' . $fields['validation']['regex'] : '') .
            (isset($fields['validation']['unique']) && $fields['validation']['unique'] ? '|unique:withdraw_accounts,data->' . $fields['name'] : '');
        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            return response()->json(['success' => false, 'message' => 'Validation failed', 'errors' => $validator->errors()], 200);
        }

        $data[$fields['name']] = $request->input($fields['name']);

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
        ];
        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            return response()->json(['success' => false, 'message' => 'Validation failed', 'errors' => $validator->errors()], 200);
        }
        $gateway = Gateways::find($request->selectedMethod);
        $rules = [
            'amount' => ['required', 'numeric', 'min:' . $gateway->min_withdraw, 'max:' . $gateway->max_withdraw],
        ];
        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            return response()->json(['success' => false, 'message' => 'Validation failed', 'errors' => $validator->errors()], 200);
        }
        if ($gateway->attachment == true) {
            if ($request->attachment == null) {
                return response()->json(['success' => false, 'message' => 'Attachment is required'], 200);
            }
        }
        $attachmentPath = null;
        if ($request->hasFile('attachment')) {
            $attachment = $request->file('attachment');
            $attachmentPath = $attachment->storeAs('attachments', $attachment->getClientOriginalName() . '-' . time(), 'private');
        }
        $fees = $gateway->charge_type_withdraw == 'percentage' ? ($gateway->charge_withdraw * $request->amount / 100) : $gateway->charge_withdraw;
        $total = $request->amount - $fees;
        $tnx = "WITH" . time();
        $transaction = Transaction::create([
            'amount' => $request->amount,
            'fee' => $fees,
            'total' => $total,
            'tnx_type' => 'add',
            'tnx' => $tnx,
            'type' => 'withdraw',
            'description' => 'Withdraw to ' . $gateway->name,
            'gateway_id' => $request->selectedMethod,
            'client_id' => auth()->user()->id,
            'attachment' => $attachmentPath,
        ]);
        auth()->user()->update(['balance' => auth()->user()->balance - $total]);
        PushWithdrawlNotification::dispatch(auth()->user(),$transaction)->onQueue('default');
        return response()->json(['success' => true, 'message' => 'Withdraw successful', 'tnx' => $tnx]);
    }
    //logs methods
    public function LogOrders()
    {
        $orders = auth()->user()->orders()->get();
        return Inertia::render('settings/pages/Userlogs/OrderLogs.tsx', [
            'orders' => $orders
        ]);
    }
    public function LogTransaction()
    {
        $transactions = Transaction::where('client_id', auth()->user()->id)->orderBy('created_at', 'desc')->get();
        return Inertia::render('settings/pages/Userlogs/TransactionLogs.tsx', [
            'transactions' => $transactions
        ]);
    }
    public function LogLoginAttempts()
    {
        $loginAttempts = auth()->user()->loginAttempts()->get();
        return Inertia::render('settings/pages/Userlogs/LoginLogs.tsx', [
            'loginAttempts' => $loginAttempts
        ]);
    }
    public function LogWithdraw()
    {
        $withdraws = Transaction::where('client_id', auth()->user()->id)->where('type', 'withdraw')->get();
        return Inertia::render('settings/pages/Userlogs/WithdrawLogs.tsx', [
            'withdraws' => $withdraws
        ]);
    }
    public function LogDeposit()
    {
        $deposits = Transaction::where('client_id', auth()->user()->id)->where('type', 'deposit')->orderBy('created_at', 'desc')->get();
        return Inertia::render('settings/pages/Userlogs/DepositLogs.tsx', [
            'deposits' => $deposits
        ]);
    }
    //Order methods
    public function orders()
    {
        return Inertia::render('settings/pages/settings/Orders.tsx', [
            'orders' => auth()->user()->orders()->get()->toArray()
        ]);
    }
    public function newOrder()
    {
        return Inertia::render('settings/pages/NewOrder.tsx', [
            'services' => Service::where('status', 'active')->get()->map(function ($service) {
                return [
                    'id' => $service->id,
                    'name' => $service->name,
                    'icon' => $service->icon,
                    'min' => $service->min_amount,
                    'max' => $service->max_amount,
                    'minute_cost' => json_decode($service->calculation_formula, true)['minute_cost'],
                ];
            }),
            'categories' => InterestCategory::all()->toArray()
        ]);
    }
    public function YtVideoDetails(Request $request)
    {
        $validator = Validator::make(['url' => $request->url], [
            'url' => ['required', 'bail', new ValidYoutubeVideo],
        ]);
        if ($validator->fails()) {
            return response()->json(['success' => false, 'message' => 'Validation failed', 'errors' => $validator->errors()], 200);
        }
        $videoId = Youtube::parseVidFromURL($request->url);
        $video = Youtube::getVideoInfo($videoId);
        if ($video) {
            $thumbnail = $video->snippet->thumbnails->standard->url;
            $title = $video->snippet->title;
            $viewCount = number_format($video->statistics->viewCount);
            $likeCount = number_format($video->statistics->likeCount);
            $duration = iso8601ToDuration($video->contentDetails->duration);
            $interval = new DateInterval($video->contentDetails->duration);
            $minutes = ($interval->d * 24 * 60) + ($interval->h * 60) + $interval->i + number_format($interval->s / 60, 2);
            return response()->json(['success' => true, 'message' => 'Video details fetched successfully', 'thumbnail' => $thumbnail, 'title' => $title, 'viewCount' => $viewCount, 'likeCount' => $likeCount, 'duration' => $duration, 'minutes' => $minutes]);
        } else {
            return response()->json(['success' => false, 'message' => 'Video details Cant fetched', 'duration' => '']);
        }
    }
    public function newOrderPost(Request $request)
    {
        $rules = [
            'service_id' => ['required', 'exists:services,id'],
            'link' => ['required', 'url'],
            'amount' => ['required', 'numeric', 'min:' . Service::find($request->service_id)->min_amount, 'max:' . Service::find($request->service_id)->max_amount],
            'order_type' => ['required', 'string', 'in:full_time,custom_time'],
            'time_start' => ['required_if:order_type,custom_time', 'numeric', 'min:0'],
            'time_end' => ['required_if:order_type,custom_time', 'numeric', 'min:1', 'gt:time_start'],
        ];
        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            return response()->json(['success' => false, 'message' => 'Validation failed', 'errors' => $validator->errors()], 200);
        }
        $service = Service::find($request->service_id);
        if ($service->is_category_required) {
            $rules['categories'] = ['required', 'array'];
            $rules['categories.*'] = ['exists:interest_categories,id'];
        }
        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            return response()->json(['success' => false, 'message' => 'Validation failed', 'errors' => $validator->errors()], 200);
        }
        if ($request->service_id == "1") {
            $videoId = Youtube::parseVidFromURL($request->link);
            $video = Youtube::getVideoInfo($videoId);
            $interval = new DateInterval($video->contentDetails->duration);
            $minutes = ($interval->d * 24 * 60) + ($interval->h * 60) + $interval->i + number_format($interval->s / 60, 2);
            $price = $request->amount * ($minutes * json_decode($service->calculation_formula, true)['minute_cost']);
            $user = auth()->user();
            $thumbnail = $video->snippet->thumbnails->standard->url;
            $title = $video->snippet->title;
            if ($user->balance < $price) {
                return response()->json(['success' => false, 'message' => 'Insufficient balance to place the order'], 200);
            }
            Transaction::create([
                'amount' => $price,
                'fee' => 0,
                'total' => $price,
                'tnx_type' => 'sub',
                'tnx' => 'ORD' . time(),
                'type' => 'order',
                'description' => 'Order from ' . $service->name,
                'client_id' => auth()->user()->id,
            ]);
            foreach (json_decode($service->fields, true) as $field => $value) {
                $orderdata[$field] = isset(${$field}) ? ${$field} : null;
            }
            auth()->user()->update(['balance' => auth()->user()->balance - $price]);
            $order = Order::create([
                'order_id' => 'ORD' . time(),
                'provider_id' => auth()->user()->id,
                'service_id' => $request->service_id,
                'link' => $request->link,
                'target_amount' => $request->amount,
                'price' => $price,
                'status' => 'pending',
                'data' => json_encode($orderdata),
                'order_type' => $request->order_type,
                'time_start' => $request->time_start,
                'time_end' => $request->time_end,
            ]);
            if ($service->is_category_required) {
                $order->categories()->sync($request->categories);
            }
        } else {
            $price = $request->amount * $service->minute_cost;
        }

        return response()->json(['success' => true, 'message' => 'Order created successfully', 'price' => $price]);
    }
    //Tasks methods
    public function tasks()
    {
        return Inertia::render('settings/pages/settings/Tasks.tsx', [
            'tasks' => auth()->user()->tasks()->where('status', '!=', 'completed')->where('removed', false)->whereHas('order', function ($query) {
                $query->where('status', 'approved');
            })->get()->map(function ($task) {
                return [
                    'id' => $task->id,
                    'order_id' => $task->order_id,
                    'service_id' => $task->service_id,
                    'service_name' => $task->service->name,
                    'status' => $task->status,
                    'data' => json_decode($task->order->data, true),
                    'categories' => $task->order->categories->pluck('name')->toArray(),
                    'reward' => number_format($task->reward(), 2),
                    'order' => $task->order,
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
    public function UpdateTask(Request $request)
    {
        $task = Task::find($request->taskId);
        $ip = Location::get($request->ip());

        $user_agent = $request->userAgent();
        $country = $ip ? $ip->countryName : null;
        $task->update(['status' => $request->status, 'ip' => $ip, 'country' => $country, 'user_agent' => $user_agent]);
        if ($request->status == 'completed') {
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
            auth()->user()->update(['points' => auth()->user()->points + $task->reward()]);
            $task->order->update(['current_amount' => $task->order->current_amount + 1]);
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
        return Inertia::render('settings/pages/Membership.tsx', [
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
                    'name' => $plan->name . ' - ' . ($registrationOffer ? ($registrationOffer->type == 'percentage' ? $plan->price - ($registrationOffer->value * $plan->price / 100) : $plan->price - $registrationOffer->value) : $plan->price) . ' EGP ' . $plan->duration,
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
        $currentcount = Client::whereNotNull('activator_count')->latest()->first()->activator_count + 1;
        $registrationOffer = RegistrationOffer::where('min_activator_count', '<=', $currentcount)->where('max_activator_count', '>=', $currentcount)->first();
        $planPrice = $registrationOffer ? ($registrationOffer->type == 'percentage' ? $plan->price - ($registrationOffer->value * $plan->price / 100) : $plan->price - $registrationOffer->value) : $plan->price;

        if (auth()->user()->balance < $planPrice) {
            return response()->json(['success' => false, 'message' => 'Insufficient balance to upgrade'], 200);
        }
        if (auth()->user()->hasActiveSubscription) {
            return response()->json(['success' => false, 'message' => 'You already have an active membership'], 200);
        }
        try {
            DB::transaction(function () use ($request) {
                $plan = Membershib::find($request->plan);
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
                }
                $subscription = SubscriptionMembership::create([
                    'client_id' => auth()->user()->id,
                    'membership_id' => $request->plan,
                    'status' => 'active',
                    'start_date' => Carbon::now(),
                    'end_date' => $plan->is_lifetime == true
                        ? null
                        : now()->addDays($plan->duration),
                    'is_lifetime' => $plan->is_lifetime,
                ]);
                PushMembershipNotification::dispatch(auth()->user(),$subscription->id)->onQueue('default');
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
        return Inertia::render('settings/pages/settings/Referrals.tsx', [
            'referrals' => auth()->user()->referrals->map(function ($referral) {
                return [
                    'id' => mb_strtoupper(mb_substr(explode(' ', $referral->name)[0], 0, 1) . mb_substr(explode(' ', $referral->name)[1], 0, 1)),
                    'name' => $referral->name . ($referral->membership ? ' - ' . $referral->membership->name : ' - Free'),
                    'profile_image' => $referral->profile_image ? '/storage/' . $referral->profile_image : null,
                ];
            }),
            'referral_count' => auth()->user()->referrals->count(),
            'parent' => auth()->user()->parent,
        ]);
    }
}
