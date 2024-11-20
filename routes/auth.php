<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Validator;
use App\Models\Client;
Route::group(['prefix' => 'client'], function () {
    Route::post('/email/verification-notification', function (Request $request) {
        $request->user()->sendEmailVerificationNotification();
 
    return back()->with('message', 'Verification link sent!');
})->middleware(['auth', 'throttle:6,1'])->name('client.verification.send');
});
 
Route::get('/email/verify/{id}/{hash}', function (EmailVerificationRequest $request) {
    $request->fulfill();
    auth()->user()->update(['email_verified' => 1,'email_verified_at'=>now()]);
    return redirect(route('client.dashboard.dashboard'));
})->middleware(['auth', 'signed'])->name('verification.verify');
Route::get('/password/reset/{token}', function ($token,Request $request) {
    return Inertia::render('auth/ResetNewPasswordd.tsx', ['token' => $token,'email'=>$request->email]);
})->name('password.reset');
Route::post('/password/reset', function (Request $request) {
    $rules = [
        'token' => 'required',
        'email' => 'required|email',
        'password' => 'required|min:8|confirmed',
    ];
    $validator = Validator::make($request->all(), $rules);
    if ($validator->fails()) {
        return response()->json(['success' => false, 'message' => $validator->errors()->first()]);
    }
    try {
        $status = Password::broker('clients')->reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($client, $password) {
                $user = Client::where('email',$client->email)->first();
                $user->forceFill(['password' => bcrypt($password)])->save();
            }
        );

        if ($status === Password::INVALID_USER) {
            return response()->json(['success' => false, 'message' => "We can't find a client with that email address."]);
        }

        return $status === Password::PASSWORD_RESET
            ? response()->json(['success' => true, 'message' => __($status)])
            : response()->json(['success' => false, 'message' => __($status)]);
    } catch (\Exception $e) {
        return response()->json(['success' => false, 'message' => $e->getMessage()]);
    }
})->name('password.reset.post');
