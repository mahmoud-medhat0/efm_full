<?php

namespace App\Http\Controllers\client;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Transaction;

class HistoryController extends Controller
{
    public function LogOrders()
    {
        $orders = auth()->user()->orders()->orderBy('created_at', 'desc')->get();
        return Inertia::render('newui/Pages/History/OrdersHistory/Historysection.jsx', [
            'orders' => $orders
        ]);
    }
    public function LogLoginAttempts()
    {
        $loginAttempts = auth()->user()->loginAttempts()->orderBy('created_at', 'desc')->get();
        return Inertia::render('newui/Pages/History/LoginHistory/Historysection.jsx', [
            'loginAttempts' => $loginAttempts
        ]);
    }
    public function LogDeposit()
    {
        $deposits = Transaction::where('client_id', auth()->user()->id)->where('type', 'deposit')->orderBy('created_at', 'desc')->get();
        return Inertia::render('newui/Pages/History/DepositHistory/Historysection.jsx', [
            'deposits' => $deposits
        ]);
    }
    public function LogWithdraw()
    {
        $withdraws = Transaction::where('client_id', auth()->user()->id)->where('type', 'withdraw')->orderBy('created_at', 'desc')->get();
        return Inertia::render('newui/Pages/History/WithdrawHistory/Historysection.jsx', [
            'withdraws' => $withdraws
        ]);
    }
    public function LogTransaction()
    {
        $transactions = Transaction::where('client_id', auth()->user()->id)->orderBy('created_at', 'desc')->get();
        return Inertia::render('newui/Pages/History/TransactionHistory/Historysection.jsx', [
            'transactions' => $transactions
        ]);
    }
}
