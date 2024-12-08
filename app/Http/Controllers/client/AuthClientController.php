<?php

namespace App\Http\Controllers\client;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Stevebauman\Location\Facades\Location;
use App\Models\LoginAttempt;
use App\Models\Client;
use PragmaRX\Google2FALaravel\Support\Authenticator;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Validator;
use App\Rules\checkactiveReferralUserCode;
use Illuminate\Support\Facades\Hash;
use App\Rules\ValidMail;
use Laravel\Ui\Presets\React;
use Illuminate\Support\Facades\Password;
class AuthClientController extends Controller
{
    public function login()
    {
        return Inertia::render('newui/Pages/Login/Login.jsx');
    }

    public function loginPost(Request $request)
    {
        $request->validate([
            'username' => 'required',
            'password' => 'required',
        ]);

        $ip = Location::get($request->ip());
        $loginAttempt = new LoginAttempt();
        $loginAttempt->ip_address = $request->ip();
        $loginAttempt->country = $ip ? $ip->countryName : null;

        $client = Client::where('username', $request->username)
                        ->orWhere('email', $request->username)
                        ->first();

        $loginAttempt->email = $client ? $client->email : $request->username;
        $loginAttempt->authenticatable_type = Client::class;
        $loginAttempt->authenticatable_id = $client ? $client->id : null;

        if ($client && Auth::attempt(['email' => $client->email, 'password' => $request->password])) {
            $request->session()->regenerate();
            $loginAttempt->successful = true;
            $loginAttempt->authenticatable_id = Auth::user()->id;
            $loginAttempt->save();

            $cookie = Cookie::make('session_id', session()->getId(), 120); // 120 minutes

            return response()->json(['message' => 'Login successful', 'user' => Auth::user()], 200)->cookie($cookie);
        }

        $loginAttempt->successful = false;
        $loginAttempt->save();

        return response()->json(['message' => 'Invalid credentials'], 401);
    }

    public function logout(Request $request)
    {
        try{
            Auth::logout();
            $request->session()->invalidate();
            $request->session()->regenerateToken();
            $cookie = Cookie::forget('session_id');
            return redirect()->route('client.login')->cookie($cookie);
            // return response()->json(['success' => true, 'message' => 'Logout successful'], 200)->cookie($cookie);
     }catch(\Exception $e){
            \Log::error($e->getMessage());
        }
    }
    public function twoFa()
    {
        return Inertia::render('auth/2faverify.tsx');
    }
    public function twoFaPost(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'code' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['success' => false, 'message' => 'Validation failed', 'errors' => $validator->errors()], 422);
        }
        $user = Auth::user();
        $google2fa = app('pragmarx.google2fa');
        $valid = $google2fa->verifyKey(auth()->user()->two_factor_code, $request->code);
        if ($valid) {
            session(['2fa_verified' => true]);
            return response()->json(['success' => true, 'message' => '2FA successful', 'user' => Auth::user()], 200);
        }
        return response()->json(['success' => false, 'message' => 'Invalid code']);
    }
    public function register(Request $request)
    {
        return Inertia::render('newui/Pages/SingUp/SingUp.tsx', [
            'referral_code' => $request->ref,
        ]);
    }
    public function registerPost(Request $request)
    {
        $rules = [
            'first_name' => 'required',
            'last_name' => 'required',
            'email' => ['required', 'unique:clients,email', new ValidMail],
            'password' => 'required|min:8|confirmed',
            'telegram' => ['required', 'unique:clients,telegram_username', 'regex:/^[^\s@]+$/', 'regex:/^[^\x{0600}-\x{06FF}\x{0750}-\x{077F}\x{08A0}-\x{08FF}\x{FB50}-\x{FDFF}\x{FE70}-\x{FEFF}\x{10E60}-\x{10E7F}\x{1EE00}-\x{1EEFF}]+$/u'],
            'referral_code' => ['nullable', new checkactiveReferralUserCode],
            'phone' => 'required|unique:clients,phone',
            'username' => ['required', 'unique:clients,username', 'regex:/^[^\s@]+$/', 'regex:/^[^\x{0600}-\x{06FF}\x{0750}-\x{077F}\x{08A0}-\x{08FF}\x{FB50}-\x{FDFF}\x{FE70}-\x{FEFF}\x{10E60}-\x{10E7F}\x{1EE00}-\x{1EEFF}]+$/u'],
        ];
        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            return response()->json(['success' => false, 'message' => 'Validation failed', 'errors' => $validator->errors()], 422);
        }
        $fullname = $request->first_name . ' ' . $request->last_name;
        $parent_id = $request->referral_code != null ? Client::where('username', $request->referral_code)->first()->id : null;
        Client::create([
            'name' => $fullname,
            'username' => $request->username,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'telegram_username' => $request->telegram,
            'phone' => $request->phone,
            'ref_id' => $parent_id,
        ]);
        return response()->json(['success' => true, 'message' => 'Register is done, you will navigate after 2 seconds!'], 200);
    }
    public function resetPassword()
    {
        return Inertia::render('newui/Pages/ForgetPassword/ForgetPassword.tsx');
    }
    public function resetPasswordPost(Request $request)
    {
        $rules = [
            'email' => ['required', 'email','exists:clients,email', new ValidMail],
        ];
        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            return response()->json(['success' => false, 'message' => 'Validation failed', 'errors' => $validator->errors()], 422);
        }
        $status = Password::broker('clients')->sendResetLink(
            $request->only('email'),
        );
        return $status === Password::RESET_LINK_SENT
            ? response()->json(['success' => true, 'message' => 'Password reset link sent'], 200)
            : response()->json(['success' => false, 'message' => 'Password reset link not sent'], 400);
    }
}
