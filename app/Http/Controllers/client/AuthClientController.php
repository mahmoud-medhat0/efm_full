<?php

namespace App\Http\Controllers\client;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Stevebauman\Location\Facades\Location;
use App\Models\LoginAttempt;
use App\Models\Client;

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
            return response()->json(['message' => 'Login successful','user' => Auth::user()], 200);
        }
        $loginAttempt->successful = false;
        $loginAttempt->save();
        return response()->json(['message' => 'Invalid credentials'], 401);
    }

    public function logout()
    {
        Auth::logout();
        return response()->json(['message' => 'Logout successful'], 200);
    }
    public function register()
    {
        return Inertia::render('auth/Register.tsx');
    }
}
