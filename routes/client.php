<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Middleware\HandleInertiaRequests;
use App\Http\Controllers\client\HomeController;
use App\Http\Controllers\client\AuthClientController;
use App\Http\Controllers\client\DashboardContrtoller;
use App\Http\Controllers\client\HistoryController;
use App\Http\Controllers\client\PersonalSettingsController;
use App\Http\Controllers\client\TicketsController;
use App\Http\Controllers\client\OrdersController;
use App\Http\Middleware\RedirectRoRegsiter;
Route::get('/', [HomeController::class, 'index']);
Route::get('/set-lang/{lang}', [HomeController::class, 'setLang'])->name('client.set-lang');
Route::get('email/verify', [HomeController::class, 'verifyEmail'])->name('verification.notice');

Route::middleware(HandleInertiaRequests::class)->name('client.')->group(function () {
    Route::controller(AuthClientController::class)->middleware(['web', 'guest'])->group(function () {
        Route::get('login', 'login')->name('login');
        Route::post('login', 'loginPost')->name('login.post');
        Route::get('register', 'register')->name('register');
        Route::post('register', 'registerPost')->name('register.post');
        Route::get('reset-password', 'resetPassword')->name('reset-password');
        Route::post('reset-password', 'resetPasswordPost')->name('reset-password.post');
        Route::post('logout', 'logout')->name('logout');
    });
    Route::controller(AuthClientController::class)->middleware('auth')->group(function () {
        Route::match(['get', 'post'], 'logout', 'logout')->name('logout');
        Route::middleware('has2fa')->group(function () {
            Route::get('2fa', 'twoFa')->name('2fa');
            Route::post('2fa', 'twoFaPost')->name('2fa.post');
        });
    });
    Route::controller(HomeController::class)->group(function () {
        // Route::middleware(RedirectRoRegsiter::class)->group(function () {
        Route::get('home', 'index')->name('home');
        Route::get('about-us', 'aboutUs')->name('about-us');
        Route::get('advertise', 'advertise')->name('advertise');
        Route::get('btc-game', 'btcGame')->name('btc-game');
        Route::get('referral-contest', 'referralContest')->name('referral-contest');
        // Route::get('view-videos', 'viewVideos')->name('view-videos');
        // Route::get('view-ads', 'viewAds')->name('view-ads');
        Route::get('faq', 'faq')->name('faq');
        Route::get('news', 'news')->name('news');
        Route::get('support', 'support')->name('support');
            Route::get('terms', 'terms')->name('terms');
        // });
        Route::middleware(['auth', 'verified', '2fa'])->group(function () {
            Route::get('profile', 'profile')->name('profile');
            Route::get('dashboard', 'dashboard')->name('dashboard');
        });
        Route::middleware(['auth', 'telegram.not.verified', '2fa'])->group(function () {
            Route::get('telegram-verify', 'telegramVerify')->name('telegram-verify');
            Route::post('telegram-send', 'telegramSend')->name('telegram-send');
            Route::post('telegram-verify', 'telegramVerifyPost')->name('telegram-verify.post');
            Route::post('telegram-resend', 'telegramResend')->name('telegram-resend');
        });
    });
    Route::name('dashboard.')->prefix('dashboard')->middleware(['auth', 'verified', '2fa'])->group(function () {
        Route::controller(DashboardContrtoller::class)->group(function () {
            Route::get('/', 'index')->name('dashboard');
            Route::get('currencies', 'currencies')->name('currencies');
            Route::get('referrals', 'referrals')->name('referrals');
            Route::get('advertiser-panel', 'advertiserPanel')->name('advertiser-panel');
            Route::get('messages', 'messages')->name('messages');
            Route::get('membership', 'membership')->name('membership');
            Route::post('membership/upgrade/balance', 'upgradeBalance')->name('membership.upgrade.balance');
            Route::post('membership/upgrade/gateway', 'upgradeBalanceGateway')->name('membership.upgrade.balance.gateway');
            Route::get('tasks', 'tasks')->name('tasks');
            Route::post('tasks/update', 'UpdateTask')->name('tasks.update');
            Route::post('yt-video-details', 'YtVideoDetails')->name('yt-video-details');
            Route::post('cli-ban', 'CliBan')->name('cli-ban');
            Route::get('convert-points', 'convertPoints')->name('convert-points');
            Route::get('2fa-qr-url', 'get2faQrUrl')->name('2fa-qr-url');
            Route::post('enable-2fa', 'enable2faPost')->name('enable-2fa.post');
            Route::post('disable-2fa', 'disable2faPost')->name('disable-2fa.post');
            Route::get('coupons', 'coupons')->name('coupons');
            Route::get('deposit', 'deposit')->name('deposit');
            Route::post('deposit', 'depositPost')->name('deposit.post');
            Route::middleware('telegram.verified')->group(function () {
                Route::get('withdraw', 'withdraw')->name('withdraw');
                Route::post('withdraw', 'withdrawPost')->name('withdraw.post');
                Route::post('withdraw-account', 'withdrawAccount')->name('withdraw-account');
            });
            Route::get('2fa', 'twoFa')->name('2fa');
            Route::get('banners', 'banners')->name('banners');
        });
        Route::controller(OrdersController::class)->group(function () {
            Route::get('orders', 'orders')->name('orders');
            Route::get('order', 'newOrder')->name('new-order');
            Route::post('order', 'newOrderPost')->name('new-order.post');
        });
        Route::controller(PersonalSettingsController::class)->group(function () {
            Route::get('personal-settings', 'PersonalSettings')->name('personal-settings');
            Route::post('update-profile-image', 'updateProfileImage')->name('update-profile-image');
            Route::post('change-password', 'ChangePassword')->name('change-password');
        });
        Route::controller(TicketsController::class)->group(function () {
            Route::get('create-ticket', 'createTicket')->name('create-ticket');
            Route::post('create-ticket', 'createTicketPost')->name('create-ticket.post');
            Route::get('tickets', 'tickets')->name('tickets');
            Route::get('ticket/{id}', 'showTicket')->name('show-ticket');
            Route::post('ticket/message', 'storeTicketMessage')->name('ticket.message.store');
        });
        Route::controller(HistoryController::class)->group(function () {
            Route::get('logs', 'logs')->name('logs');
            Route::name('logs.')->prefix('logs')->group(function () {
                Route::get('orders', 'LogOrders')->name('orders');
                Route::get('deposit', 'LogDeposit')->name('deposit');
                Route::get('withdraw', 'LogWithdraw')->name('withdraw');
                Route::get('login', 'LogLoginAttempts')->name('login');
                Route::get('transaction', 'LogTransaction')->name('transaction');
            });
        });
    });
});
