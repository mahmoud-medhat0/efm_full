<?php

namespace App\Http\Controllers\Client;

use App\Models\News;
use App\Models\Term;
use App\Models\User;
use Inertia\Inertia;
use Telegram\Bot\Api;
use App\Models\Client;
use App\Models\Feedback;
use App\Models\FaqQuestion;
use Illuminate\Http\Request;
use App\Rules\UserTelegramCode;
use Illuminate\Validation\Rule;
use Telegram\Bot\Traits\Telegram;
use App\Http\Controllers\Controller;
use App\Rules\UserIdInteractedToBot;
use Illuminate\Support\Facades\Auth;
use App\Rules\UserIdRelatedToUsername;
use Illuminate\Support\Facades\Validator;

class HomeController extends Controller
{
    public function index()
    {
        return Inertia::render('home.jsx', [
            'user' => Auth::user(),
            'feedbacks' => Feedback::all(),
            'faqQuestions' => FaqQuestion::where('is_active', 1)->get()->map(function ($faq) {
                return [
                    'question' => $faq->getTranslation('question', app()->getLocale()),
                    'answer' => $faq->getTranslation('answer', app()->getLocale()),
                ];
            }),
        ]);
    }

    public function logout()
    {
        Auth::logout();
        return redirect()->route('client.login');
    }

    public function advertise()
    {
        return Inertia::render('pages/Advertise.tsx');
    }

    public function btcGame()
    {
        return Inertia::render('pages/BitcoinGame.tsx');
    }

    public function referralContest()
    {
        return Inertia::render('pages/ReferralContest.tsx');
    }

    public function viewAds()
    {
        return Inertia::render('pages/earn_money/ViewADS.tsx');
    }

    public function viewVideos()
    {
        return Inertia::render('pages/earn_money/ViewVideos.tsx');
    }

    public function profile()
    {
        return Inertia::render('profile');
    }

    public function telegramVerify()
    {
        return Inertia::render('auth/TelegramVerification.tsx');
    }

    public function telegramSend(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id' => ['required', new UserIdInteractedToBot, new UserIdRelatedToUsername($request->username)],
            'username' => ['required', 'string', 'max:255', Rule::unique('clients', 'telegram_username')->ignore(Auth::id())],
        ]);

        if ($validator->fails()) {
            return response()->json(['success' => false, 'errors' => $validator->errors()], 200);
        }
        $otp = rand(100000, 999999);
        $user = Client::find(auth()->id());
        $user->update(['telegram_username' => $request->username, 'telegram_id' => $request->id, 'telegram_code' => $otp]);
        $appName = env('APP_NAME');
        $messageText = "Hello! Your OTP for *{$appName}* is: ```{$otp}``` \nPlease enter this code on our website to complete your verification.\nDo not share this OTP with anyone.";
        $telegram = new Api(env('TELEGRAM_BOT_TOKEN'));
        $telegram->sendMessage([
            'chat_id' => $request->id,
            'text' => $messageText,
            'parse_mode' => 'Markdown',
        ]);
        return response()->json(['success' => true, 'message' => 'Thanks for your registration. Telegram verification code sent to your account.']);
    }

    public function telegramVerifyPost(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'code' => ['required', 'digits:6', new UserTelegramCode],
        ]);
        if ($validator->fails()) {
            return response()->json(['success' => false, 'errors' => $validator->errors()], 200);
        }
        $user = Client::find(auth()->id());
        $user->update(['telegram_verified' => 1]);
        $appName = env('APP_NAME');
        $messageText = "🎉Congratulations! 🎉\nVerification have been successfully done ✅\nWelcome to 💲{$appName}💲\nYour Money is The Max 💲 .. Enjoy & Relax 😊";
        $telegram = new Api(env('TELEGRAM_BOT_TOKEN'));
        $telegram->sendMessage([
            'chat_id' => $user->telegram_id,
            'text' => $messageText,
            'parse_mode' => 'Markdown',
        ]);
        return response()->json(['success' => true, 'message' => 'Telegram verification successful.']);
    }

    public function telegramResend(Request $request)
    {
        if (auth()->user()->telegram_verified) {
            return response()->json(['success' => false, 'message' => 'Telegram verification already done.']);
        }
        if (!auth()->user()->telegram_id || !auth()->user()->telegram_username) {
            return response()->json(['success' => false, 'message' => 'Please enter your Telegram ID and username to verify.']);
        }
        $user = Client::find(auth()->id());
        $user->update(['telegram_code' => rand(100000, 999999)]);
        $appName = env('APP_NAME');
        $messageText = "Hello! Your OTP for *{$appName}* is: ```{$user->telegram_code}``` \nPlease enter this code on our website to complete your verification.\nDo not share this OTP with anyone.";
        $telegram = new Api(env('TELEGRAM_BOT_TOKEN'));
        $telegram->sendMessage([
            'chat_id' => $user->telegram_id,
            'text' => $messageText,
            'parse_mode' => 'Markdown',
        ]);
        return response()->json(['success' => true, 'message' => 'Telegram verification code resended.']);
    }

    public function verifyEmail()
    {
        return Inertia::render('auth/VerifyEmail.tsx');
    }

    public function faq()
    {
        return Inertia::render('pages/help/Faq.tsx', [
            'faqQuestions' => FaqQuestion::where('is_active', 1)->get()->map(function ($faq) {
                return [
                    'id' => $faq->id,
                    'question' => $faq->getTranslation('question', app()->getLocale()),
                    'answer' => $faq->getTranslation('answer', app()->getLocale()),
                ];
            }),
        ]);
    }
    public function news()
    {
        return Inertia::render('pages/help/News.tsx', [
            'news' => News::latest('created_at')->get()->map(function ($news) {
                return [
                    'title' => $news->getTranslation('title', app()->getLocale()),
                    'description' => $news->getTranslation('description', app()->getLocale()),
                    'published_at' => $news->published_at,
                    'date' => $news->published_at->format('M d, Y'),
                    'time' => $news->published_at->format('h:i A'),
                ];
            }),
        ]);
    }
    public function terms()
    {
        return Inertia::render('pages/help/Terms.tsx',[
            'terms' => Term::first()->getTranslation('terms', app()->getLocale()),
        ]);
    }
    public function support()
    {
        return Inertia::render('pages/help/Support.tsx');
    }
}
