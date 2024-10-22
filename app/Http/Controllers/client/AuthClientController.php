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
class AuthClientController extends Controller
{
    public function login()
    {
        return Inertia::render('auth/Login.tsx');
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
        $loginAttempt->country = $ip? $ip->countryName : null;
        $loginAttempt->email = Client::where('username', $request->username)->first()!=null ? Client::where('username', $request->username)->first()->username : $request->username;
        $loginAttempt->authenticatable_type = Client::class;
        $loginAttempt->authenticatable_id = Client::where('username', $request->username)->first()!=null ? Client::where('username', $request->username)->first()->id : null;    
        if (Auth::attempt($request->only('username', 'password'))) {
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

            return response()->json(['success' => true, 'message' => 'Logout successful'], 200)->cookie($cookie);
     }catch(\Exception $e){
            \Log::error($e->getMessage());
            return response()->json(['success' => false,'message' => $e->getMessage()], 500);
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
    public function register()
    {
        return Inertia::render('auth/Register.tsx');
    }
    public function registerPost(Request $request)
    {
        // dd($request->all());
        $rules = [
            'first_name' => 'required',
            'last_name' => 'required',
            'email' => ['required', 'unique:clients,email', new ValidMail],
            'password' => 'required|min:8|confirmed',
            'telegram' => 'required|unique:clients,telegram_username',
            'referral_code' => ['nullable', new checkactiveReferralUserCode],
            'phone' => 'required|unique:clients,phone',
            'username' => 'required|unique:clients,username',
        ];
        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            return response()->json(['success' => false, 'message' => 'Validation failed', 'errors' => $validator->errors()], 422);
        }
        $fullname = $request->first_name . ' ' . $request->last_name;
        Client::create([
            'name' => $fullname,
            'username' => $request->username,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'telegram_username' => $request->telegram,
            'phone' => $request->phone,
        ]);
        return response()->json(['success' => true, 'message' => 'Register is done, you will navigate after 2 seconds!'], 200);
    }
}
