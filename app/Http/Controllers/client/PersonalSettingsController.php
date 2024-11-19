<?php

namespace App\Http\Controllers\client;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;

class PersonalSettingsController extends Controller
{
    public function PersonalSettings()
    {
        return Inertia::render('newui/Component/DashBoard/PersonalSettings/PersonalSettings.jsx');
    }
    public function ChangePassword(Request $request)
    {
        $rules = [
            'current_password' => ['required'],
            'new_password' => ['required', 'min:8', 'confirmed'],
        ];

        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            return response()->json(['success' => false, 'message' => $validator->errors()->first()], 200);
        }

        $user = auth()->user();

        if (!password_verify($request->current_password, $user->password)) {
            return response()->json(['success' => false, 'message' => 'Current password is incorrect'], 200);
        }

        $user->password = bcrypt($request->new_password);
        $user->save();

        return response()->json(['success' => true, 'message' => 'Password changed successfully'], 200);
    }
    public function updateProfileImage(Request $request)
    {
        try {
            $user = auth()->user();
            $user->profile_image = $request->file('profile_image')->store('profile_images', 'public');
            $user->save();
            return response()->json(['success' => true, 'message' => 'Profile image updated successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'Failed to update profile image'], 200);
        }
    }
}
