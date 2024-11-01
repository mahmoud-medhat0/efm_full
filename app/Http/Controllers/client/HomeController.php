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
use App\Models\Gateways;
use App\Models\Aboutsection;
use App\Models\MembershipSection;
use App\Models\AdvertiseSection;
use App\Models\ReferralSection;

class HomeController extends Controller
{
    public function setLang($lang)
    {
        session()->put('locale', $lang);
        app()->setLocale($lang);
        return redirect()->back();
    }
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
            'gateways' => Gateways::where('is_active', 1)->get()->toArray(),
            'aboutSections' => Aboutsection::first(),
            'membershipSections' => MembershipSection::first(),
            'advertiseSections' => AdvertiseSection::first(),
            'referralSections' => ReferralSection::first(),
        ]);
    }
    public function aboutUs()
    {
        return Inertia::render('pages/AboutUs.tsx');
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
        $referralsLast24Hours = Client::select('name')
            ->withCount(['referrals' => function ($query) {
                $query->where('created_at', '>=', now()->subDay());
            }])
            ->orderBy('referrals_count', 'desc')
            ->get();
        $referralsLast24HoursTop100 = Client::select('name')
            ->withCount(['referrals' => function ($query) {
                $query->where('created_at', '>=', now()->subDay());
            }])
            ->orderBy('referrals_count', 'desc')
            ->take(100)
            ->get();
        $referralsLast7Days= Client::select('name')
            ->withCount(['referrals' => function ($query) {
                $query->where('created_at', '>=', now()->subDays(7));
            }])
            ->orderBy('referrals_count', 'desc')
            ->get();
        $referralsLast7DaysTop100 = Client::select('name')
            ->withCount(['referrals' => function ($query) {
                $query->where('created_at', '>=', now()->subDays(7));
            }])
            ->orderBy('referrals_count', 'desc')
            ->take(100)
            ->get();
        $referralsLast30Days = Client::select('name')
            ->withCount(['referrals' => function ($query) {
                $query->where('created_at', '>=', now()->subDays(30));
            }])
            ->orderBy('referrals_count', 'desc')
            ->get();
        $referralsLast30DaysTop100 = Client::select('name')
            ->withCount(['referrals' => function ($query) {
                $query->where('created_at', '>=', now()->subDays(30));
            }])
            ->orderBy('referrals_count', 'desc')
            ->take(100)
            ->get();
        $referralsTop100 = Client::select('name')
            ->withCount(['referrals'])
            ->orderBy('referrals_count', 'desc')
            ->take(100)
            ->get();
        $clients = Client::count();
        return Inertia::render('pages/ReferralContest.tsx', [
            'referralsLast24Hours' => $referralsLast24Hours,
            'referralsLast24HoursTop100' => $referralsLast24HoursTop100->toArray(),
            'referralsLast7Days' => $referralsLast7Days,
            'referralsLast7DaysTop100' => $referralsLast7DaysTop100->toArray(),
            'referralsLast30Days' => $referralsLast30Days,
            'referralsLast30DaysTop100' => $referralsLast30DaysTop100->toArray(),
            'referralsTop100' => $referralsTop100->toArray(),
            'clients' => $clients,
        ]);
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
        $user->update(['telegram_username' => str_replace(trim($request->username), '@', ''), 'telegram_id' => $request->id, 'telegram_code' => $otp]);
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
        $userName = '<b>' . $user->name . '</b>';
        $messageText = "🎉 مبروك {$userName} ! 🎉\n\nلقد تم تفعيل عضويتك بنجاح في أقوى شركة تسويق،EFM ! 🚀\nنتمنى لك النجاح والتفوق والوصول إلى الثراء معنا 💪💰\nكن على أتم الاستعداد لتنفيذ بعض المهام الجديدة المثيرة 🌟 التي ستساعدك في تحقيق أهدافك المالية 💸✨";
        $telegram = new Api(env('TELEGRAM_BOT_TOKEN'));
        $telegram->sendMessage([
            'chat_id' => $user->telegram_id,
            'text' => $messageText,
            'parse_mode' => 'HTML',
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
        if (auth()->user()->hasVerifiedEmail()) {
            return redirect()->route('client.dashboard');
        }
        auth()->user()->sendEmailVerificationNotification();
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
        return Inertia::render('pages/help/Terms.tsx', [
            'terms' => Term::first()->getTranslation('terms', app()->getLocale()),
        ]);
    }
    public function support()
    {
        return Inertia::render('pages/help/Support.tsx');
    }
}
