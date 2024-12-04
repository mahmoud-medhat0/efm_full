<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\Transaction;
/*
|--------------------------------------------------------------------------
| Card API Routes
|--------------------------------------------------------------------------
|
| Here is where you may register API routes for your card. These routes
| are loaded by the ServiceProvider of your card. You're free to add
| as many additional routes to this file as your card may require.
|
*/

Route::get('/get-deposits-and-withdrawals', function (Request $request) {
    $successDeposits = number_format(Transaction::where('type','deposit')->where('status','success')->sum('total'), 2);
    $pendingDeposits = number_format(Transaction::where('type','deposit')->where('status','pending')->sum('total'), 2);
    $failedDeposits = number_format(Transaction::where('type','deposit')->where('status','cancelled')->sum('total'), 2);
    $depositCharge = number_format(Transaction::where('type','deposit')->where('status','success')->sum('fee'), 2);
    $successWithdrawals = number_format(Transaction::where('type','withdraw')->where('status','success')->sum('total'), 2);
    $pendingWithdrawals = number_format(Transaction::where('type','withdraw')->where('status','pending')->sum('total'), 2);
    $failedWithdrawals = number_format(Transaction::where('type','withdraw')->where('status','cancelled')->sum('total'), 2);
    $withdrawalCharge = number_format(Transaction::where('type','withdraw')->where('status','success')->sum('fee'), 2);
    return response()->json(['successDeposits' => $successDeposits, 'pendingDeposits' => $pendingDeposits, 'failedDeposits' => $failedDeposits, 'depositCharge' => $depositCharge, 'successWithdrawals' => $successWithdrawals, 'pendingWithdrawals' => $pendingWithdrawals, 'failedWithdrawals' => $failedWithdrawals, 'withdrawalCharge' => $withdrawalCharge]);
});
