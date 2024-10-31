<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Auth\EmailVerificationRequest;

use Illuminate\Http\Request;
Route::group(['prefix' => 'client'], function () {
    Route::post('/email/verification-notification', function (Request $request) {
        $request->user()->sendEmailVerificationNotification();
 
    return back()->with('message', 'Verification link sent!');
})->middleware(['auth', 'throttle:6,1'])->name('client.verification.send');
});
 
Route::get('/email/verify/{id}/{hash}', function (EmailVerificationRequest $request) {
    $request->fulfill();
 auth()->user()->update(['email_cerified=>1']);
    return redirect('/home');
})->middleware(['auth', 'signed'])->name('verification.verify');