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
    $successDeposits = Transaction::where('type','deposit')->where('status','success')->sum('total');
    $pendingDeposits = Transaction::where('type','deposit')->where('status','pending')->sum('total');
    $failedDeposits = Transaction::where('type','deposit')->where('status','canceled')->sum('total');
    $depositCharge = Transaction::where('type','deposit')->where('status','success')->sum('fee');
    $successWithdrawals = Transaction::where('type','withdrawal')->where('status','success')->sum('total');
    $pendingWithdrawals = Transaction::where('type','withdrawal')->where('status','pending')->sum('total');
    $failedWithdrawals = Transaction::where('type','withdrawal')->where('status','canceled')->sum('total');
    $withdrawalCharge = Transaction::where('type','withdrawal')->where('status','success')->sum('fee');
    return response()->json(['successDeposits' => $successDeposits, 'pendingDeposits' => $pendingDeposits, 'failedDeposits' => $failedDeposits, 'depositCharge' => $depositCharge, 'successWithdrawals' => $successWithdrawals, 'pendingWithdrawals' => $pendingWithdrawals, 'failedWithdrawals' => $failedWithdrawals, 'withdrawalCharge' => $withdrawalCharge]);
});
