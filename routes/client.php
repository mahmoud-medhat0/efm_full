<?php
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Middleware\HandleInertiaRequests;
use App\Http\Controllers\Client\HomeController;
use App\Http\Controllers\client\AuthClientController;
use App\Http\Controllers\client\DashboardContrtoller;

Route::get('/',[HomeController::class,'index']);
Route::middleware(HandleInertiaRequests::class)->name('client.')->group(function () {
Route::controller(AuthClientController::class)->middleware(['web','guest'])->group(function () {
    Route::get('login', 'login')->name('login');
    Route::post('login', 'loginPost')->name('login.post');
    Route::get('register', 'register')->name('register');
    Route::get('reset-password', 'resetPassword')->name('reset-password');
});
Route::middleware('auth')->group(function () {
Route::controller(HomeController::class)->group(function () {
    Route::get('home', 'index')->name('home');
    Route::post('logout', 'logout')->name('logout');
    Route::get('advertise', 'advertise')->name('advertise');
    Route::get('btc-game', 'btcGame')->name('btc-game');
    Route::get('referral-contest', 'referralContest')->name('referral-contest');
    Route::get('view-videos', 'viewVideos')->name('view-videos');
    Route::get('view-ads', 'viewAds')->name('view-ads');
    Route::get('faq', 'faq')->name('faq');
    Route::get('news', 'news')->name('news');
    Route::get('support', 'support')->name('support');
    Route::get('terms', 'terms')->name('terms');
    Route::middleware('telegram.verified')->group(function () {
        Route::get('profile', 'profile')->name('profile');
        Route::get('dashboard', 'dashboard')->name('dashboard');
    });
    Route::get('email/verify', 'verifyEmail')->name('verify-email');
    Route::middleware('telegram.not.verified')->group(function () {
        Route::get('telegram-verify', 'telegramVerify')->name('telegram-verify');
        Route::post('telegram-send', 'telegramSend')->name('telegram-send');
        Route::post('telegram-verify', 'telegramVerifyPost')->name('telegram-verify.post');
        Route::post('telegram-resend', 'telegramResend')->name('telegram-resend');
    });
});
Route::controller(DashboardContrtoller::class)->prefix('dashboard')->group(function () {
    Route::get('/', 'index')->name('dashboard')->middleware('telegram.verified');
    Route::name('dashboard.')->middleware('telegram.verified')->group(function () {
        Route::get('advertiser-panel', 'advertiserPanel')->name('advertiser-panel');
        Route::get('messages', 'messages')->name('messages');
        Route::get('membership', 'membership')->name('membership');
        Route::get('orders', 'orders')->name('orders');
        Route::get('order', 'newOrder')->name('new-order');
        Route::post('order', 'newOrderPost')->name('new-order.post');
        Route::get('tasks', 'tasks')->name('tasks');
        Route::post('tasks/update', 'UpdateTask')->name('tasks.update');
        Route::post('yt-video-details','YtVideoDetails')->name('yt-video-details');
        Route::post('cli-ban','CliBan')->name('cli-ban');
        Route::get('convert-points', 'convertPoints')->name('convert-points');
        Route::get('coupons', 'coupons')->name('coupons');
        Route::get('deposit', 'deposit')->name('deposit');
        Route::post('deposit', 'depositPost')->name('deposit.post');
        Route::get('withdraw', 'withdraw')->name('withdraw');
        Route::post('withdraw', 'withdrawPost')->name('withdraw.post');
        Route::post('withdraw-account', 'withdrawAccount')->name('withdraw-account');
        Route::get('2fa', 'twoFa')->name('2fa');
        Route::get('banners', 'banners')->name('banners');
        Route::get('logs', 'logs')->name('logs');
        Route::name('logs.')->prefix('logs')->group(function () {
            Route::get('orders', 'LogOrders')->name('orders');
            Route::get('deposit', 'LogDeposit')->name('deposit');
            Route::get('withdraw', 'LogWithdraw')->name('withdraw');
            Route::get('login', 'LogLoginAttempts')->name('login');
        });
    });
});
});
});

