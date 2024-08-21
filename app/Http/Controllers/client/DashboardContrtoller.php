<?php

namespace App\Http\Controllers\client;

use Inertia\Inertia;
use App\Models\Gateways;
use App\Models\Transaction;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class DashboardContrtoller extends Controller
{
    public function index()
    {
        $loginFailed = auth()->user()->loginAttempts()->where('successful', false)->get();
        return Inertia::render('settings/index.tsx', [
            'loginFailures' => $loginFailed
        ]);
    }
    //Finance methods
    public function deposit()
    {
        return Inertia::render('settings/pages/AddFunds.tsx',[
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
            })
        ]);
    }
    public function depositPost(Request $request)
    {
        $rules = [
            'selectedMethod' => ['required', 'exists:gateways,id'],
        ];
        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            return response()->json(['success' => false,'message' => 'Validation failed', 'errors' => $validator->errors()], 200);
        }
        $gateway = Gateways::find($request->selectedMethod);
        if($gateway->attachment == true){
            if($request->attachment == null){
                return response()->json(['success' => false,'message' => 'Attachment is required'], 200);
            }
        }
        $rules = [
            'amount' => ['required', 'numeric', 'min:'.$gateway->min_deposit,'max:'.$gateway->max_deposit],
        ];
        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            return response()->json(['success' => false,'message' => 'Validation failed', 'errors' => $validator->errors()], 200);
        }
        $fees = $gateway->charge_type_deposit == 'percentage' ? ($gateway->charge_deposit * $request->amount/100) : $gateway->charge_deposit;
        $total = $request->amount - $fees;
        $tnx = 'DEP'.time();
        Transaction::create([
            'amount' => $request->amount,
            'fee' => $fees,
            'total' => $total,
            'tnx_type' => 'add',
            'tnx' => $tnx,
            'type' => 'deposit',
            'description' => 'Deposit from '.$gateway->name,
            'gateway_id' => $request->selectedMethod,
            'client_id' => auth()->user()->id,
        ]);
        return response()->json(['success' => true,'message' => 'Deposit successful','tnx' => $tnx]);
    }
    //withdraw methods
    public function withdraw()
    {
        return Inertia::render('settings/pages/WithdrawFunds.tsx',[
            'methods' => Gateways::withdrawGateways()->map(function ($gateway) {
                return [
                    'name' => $gateway->name,
                    'id' => $gateway->id,
                    'logo' => $gateway->logo,
                    'attachment' => $gateway->attachment,
                    'description_withdraw' => $gateway->description_withdraw,
                    'charge_type_withdraw' => $gateway->charge_type_withdraw,
                    'charge_withdraw' => $gateway->charge_withdraw,
                    'fields' => json_decode($gateway->fields,true),
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
            return response()->json(['success' => false,'message' => 'Validation failed', 'errors' => $validator->errors()], 400);
        }
        // Check if client has withdraw account in this gateway
        $existingAccount = auth()->user()->withdrawAccounts()->where('gateway_id', $request->selectedMethod)->first();
        if ($existingAccount) {
            return response()->json(['success' => false,'message' => 'Withdraw account already exists for this gateway'], 400);
        }

        $gateway = Gateways::find($request->selectedMethod);
        $fields = json_decode($gateway->fields, true);
        $rules[$fields['name']] = ($fields['validation']['required'] ? 'required' : 'nullable') .
                                  (isset($fields['validation']['regex']) ? '|regex:' . $fields['validation']['regex'] : '') .
                                  (isset($fields['validation']['unique']) && $fields['validation']['unique'] ? '|unique:withdraw_accounts,data->' . $fields['name'] : '');
        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            return response()->json(['success' => false,'message' => 'Validation failed', 'errors' => $validator->errors()], 200);
        }
                          
        $data[$fields['name']] = $request->input($fields['name']);
        
        $data = json_encode($data);
        auth()->user()->withdrawAccounts()->create([
            'client_id' => auth()->user()->id,
            'data' => $data,
            'gateway_id' => $request->selectedMethod,
        ]);
        return response()->json(['success' => true,'message' => 'Withdraw account created successfully']);
    }
    public function withdrawPost(Request $request)
    {
        $rules = [
            'selectedMethod' => ['required', 'exists:gateways,id'],
        ];
        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            return response()->json(['success' => false,'message' => 'Validation failed', 'errors' => $validator->errors()], 200);
        }
        $gateway = Gateways::find($request->selectedMethod);
        $rules = [
            'amount' => ['required', 'numeric', 'min:'.$gateway->min_withdraw,'max:'.$gateway->max_withdraw],
        ];
        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            return response()->json(['success' => false,'message' => 'Validation failed', 'errors' => $validator->errors()], 200);
        }
        $fees = $gateway->charge_type_withdraw == 'percentage' ? ($gateway->charge_withdraw * $request->amount/100) : $gateway->charge_withdraw;
        $total = $request->amount - $fees;
        $tnx = 'WITH'.time();
        Transaction::create([
            'amount' => $request->amount,
            'fee' => $fees,
            'total' => $total,
            'tnx_type' => 'add',
            'tnx' => $tnx,
            'type' => 'withdraw',
            'description' => 'Withdraw to '.$gateway->name,
            'gateway_id' => $request->selectedMethod,
            'client_id' => auth()->user()->id,
        ]);
        auth()->user()->update(['balance' => auth()->user()->balance - $total]);
        return response()->json(['success' => true,'message' => 'Withdraw successful','tnx' => $tnx]);
    }
    //logs methods
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
        $deposits = Transaction::where('client_id', auth()->user()->id)->where('type', 'deposit')->get();
        return Inertia::render('settings/pages/Userlogs/DepositLogs.tsx', [
            'deposits' => $deposits
        ]);
    }

}
