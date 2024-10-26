<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use GuzzleHttp\Client;
use Telegram\Bot\Laravel\Facades\Telegram;
use App\Models\TelegramUserViolation;
use App\Models\WelcomeBotMessages;
use Illuminate\Support\Str;
use Telegram\Bot\FileUpload\InputFile;
use Telegram\Bot\Api;
class TelegramController extends Controller
{
    private $client;
    public function __construct()
    {
        $this->client = new Client();
    }
    public function handleWebhook($token, Request $request)
    {
        // Log the entire request payload for debugging
        \Log::info('Received webhook request:', $request->all());

        // Verify the token to ensure that the request is authorized
        if ($token !== env('TELEGRAM_BOT_TOKEN')) {
            \Log::warning('Unauthorized attempt to access webhook with token: ' . $token);
            abort(403, 'Unauthorized access');
        }

        try {
            $message = $request->all();
            if (isset($message['message']['new_chat_member']) || isset($message['my_chat_member'])) {
                $this->handleGroupManagement($message['message']);
            }
            elseif (isset($message['message'])) {
                $this->handleCommand($message);
            } elseif (isset($message['callback_query'])) {
                $this->handleCallbackQuery($message['callback_query']);
            } else {
                \Log::error('Unknown message type received:', $message);
            }
            return response()->json(['status' => 'success']);
        } catch (\Exception $e) {
            // Log detailed error if an exception is thrown during the process
            \Log::error("Telegram webhook error: " . $e->getMessage(), [
                'exception' => $e,
                'trace' => $e->getTraceAsString(), // Include stack trace for more detailed debugging
            ]);

            // Return a JSON response with the error message and a 500 status code
            return response()->json([
                'error' => 'Internal Server Error',
                'message' => $e->getMessage(),
            ], 500);
        }
    }
    public function handleCommand($message)
    {
        // \Log::info($message);
        $text = $message['message']['text'] ?? '';
        $chatId = $message['message']['chat']['id'];
        $userId = $message['message']['from']['id'];
        $message_id = $message['message']['message_id'];
        if (isset($message['message']['chat'])) { // Check if 'chat' key exists
            \Log::info($text);
            if (preg_match('/https?:\/\/[^\s]+/', $text)) {
                // Delete the message containing the link
                $this->deleteMessage($chatId, $message_id);
                // Handle user ban logic
                $this->handleUserViolation($chatId, $userId);
            }
        }
        if (Str::contains($text, '/')) {
            switch ($text) {
                case '/start':
                    $image = InputFile::create("https://test.efmhub.com/images/welcome.jpg");
                    $text = "اهلا وسهلا بك في شركة <b>EFM</b> للتسويق الالكتروني والريح من الانترنت\nالشركه التي صممت لتقودك للثراء وبنيت لتدوم\nهنا تجد الفرصه الذهبيه لدخول عالم المال والثراء \nاشترك معنا ولا تضيع وقتك \nwww.efmhub.com";
                    $this->deleteMessage($chatId, $message_id);
                    $this->sendPhoto($chatId, $image, $text,null,'HTML');
                    break;
                case '/getid':
                        $this->sendMessage($chatId, "Your Id Is \n```\n{$userId}\n```\n");
                        break;
                case '/about':
                    $image = InputFile::create("https://test.efmhub.com/images/newabout.jpg");
                    $text = "من نحن ✨\n\nأقوى شركة لكسب المال عبر  الإنترنت حيث نقدم ميزات لا تضاه ومكافآت قوية تجعلها الخيار الأفضل للجميع 🤗✨\nنحن نؤمن بقوة الابتكار والتكنولوجيا ونسعى دائماً لتقديم حلول متطورة تلبي احتياجات عملائنا 👍🤍\nنقدم لك الفرصة لتحقيق الربح من خلال مهام بسيطة وممتعة مثل مشاهدة الفيديوهات والتفاعل على قنوات السوشيال ميديا⚡️🤩\nهذه المهام ستكون وسيلتك لكسب المال والوصول الى الثراء بدون جهد وبدون خبرة وبأقل تكلفة استثمارية🤯\nكما أننا نساعد الشركات على الإعلان عن جميع خدماتها ومنتجاتها، وفي المقابل نوفر لها جمهور كبير ومتابعين حقيقيين من جميع أنحاء العالم، بفضل استراتيجياتنا المدروسة يمكن لعملائنا الوصول إلى جمهور مستهدف وزيادة انتشارهم بشكل ملحوظ🤗✨\n\nرؤيتنا  👀\n\nأن نكون أول وسيلة حقيقية عبر الإنترنت لتوفير دخلاً سلبياً لجميع طبقات المجتمع ومساعدة أكبر عدد من مستخدمي الهواتف الذكية في جميع أنحاء العالم على تحقيق الأمان المالي 💰\n\nأهدافنا🎯\n\nالمساهمة في انتقال سوق الإعلان من المركزية إلى اللامركزية وإنهاء احتكار الشركات لأرباح الإعلان وجعله حق لأكبر عدد ممكن من الناس في جميع أنحاء العالم، بأبسط الموارد وأقل الاستثمارات ✨💵";
                    $this->deleteMessage($chatId, $message_id);
                    $this->sendPhoto($chatId, $image, $text);
                    break;
                case '/membership':
                    $image = InputFile::create("https://test.efmhub.com/images/membership.jpg");
                    $text = "مميزات عضوية EFM 🎉💼\n\n1️⃣ مصدر دخل مدى الحياة\n شركة EFM تتيح لك فرصة رائعة لربح المال بمجرد أداء مهام بسيطة، وكلما أنجزت مهام أكثر ربحت مال أكبر 💸✨\n\n2️⃣ مسابقات وجوائز مستمرة\nلدينا مسابقات وفعاليات مستمرة لذا كن على استعداد لتكون الفائز وتحقق أحلامك🏆🎁🎉\n\n3️⃣ عمولات تسويقية\n- إذا قمت بدعوة عميل وقام بالتعاقد مع شركتنا باختيار احد الباقات الخاصة بنا، ستحصل على عمولة مميزة \n- وإذا قام العميل بتفعيل حملة تسويقية مجدداً ستحصل على عمولة اخرى، بمعنى عند تجديد الحملة في الشركة ستحصل على عمولة مستمرة ! 💰💪\n- قم بدعوة أصدقائك عبر رابط الاشتراك الخاص بك والتأكد من تفعيل عضويتهم للحصول على عمولة 2.5% \n- ولكن هذا ليس كل شيء ! ستربح أيضًا من المحفظة الاستثمارية لشركة ENG MONEY التي تعمل في مجال الاستثمار بالأسواق المالية العالمية مدى الحياة 🌍📈🌟\n\n4️⃣ 🕒 مدة العضوية\nمدى الحياة مما يعني أنك ستستمتع بكل هذه المميزات إلى الأبد 🤯\n\n💲 سعر الاشتراك \n 50 دولار فقط، وسيتم إضافة هذا المبلغ إلى المحفظة الاستثمارية مما يعني أنك ستربح في جميع الحالات ! \n\n\nانطلق الآن وكن جزءًا من نجاحنا 💸🎊🎈\n";
                    $this->deleteMessage($chatId, $message_id);
                    $this->sendPhoto($chatId, $image, $text);
                    break;
                case '/competitions':
                    $image = InputFile::create("https://test.efmhub.com/images/competitions.jpg");
                    $text = "🎉🔥 مسابقة جوائز EFM الكبرى ! 🔥🎉\n\nهل أنتم مستعدون للمشاركة في حدث استثنائي ؟!\n نحن في EFM نعلن عن مسابقة مثيرة جداً بمناسبة الافتتاح ! 🎊✨\n\n🏆 جوائز مذهلة في انتظاركم :\n\n1️⃣المركز الأول: يحصل على سيارة جديدة أو ما يعادل قيمتها 🚗💥\n\n2️⃣المركز الثاني إلى الخامس: كل منهم يحصل على آيفون 16 برو ماكس📱🌟\n\n3️⃣المركز السادس إلى العاشر: كل منهم يحصل على أبل آيباد ميني 2024 📲🎉\n\n4️⃣المركز الحادي عشر حتى الخمسين: 50 دولار تضاف الى حسابك 💵🥳\n\n5️⃣المركز الواحد والخمسين حتى المئة: 20 دولار تضاف الى حسابك 💰🤩\n\n\n🔔 كيف تفوز؟\n\nقم بدعوة أصدقائك عبر رابط الدعوة الخاص بك والتأكد من تفعيل عضويتهم\n\n🥇الأكثر دعوةً سيحصل على المركز الأول🥇\n\n💪🏻🔥 لا تفوتوا الفرصة لتكونوا جزء من هذا الحدث العظيم، اجعلوا أصدقائكم ينضمون إلى عائلتنا في EFM !\n\n\n✨ بدأت المسابقة .. انطلقوا ! ✨";
                    $this->deleteMessage($chatId,$message_id);
                    $this->sendPhoto($chatId, $image, $text);
                    break;
                case '/offers' :
                    $image = InputFile::create("https://test.efmhub.com/images/offers.jpg");
                    $text = "🎉عرض افتتاح شركة  EFM🎉\n\n🔥 بمناسبة افتتاح شركتنا، يسعدنا أن نقدم لكم عروض وخصومات قوية جدًا لا تفوتوا الفرصة ! 🔥\n\n✨ خصم 60% من قيمة الاشتراك لأول 1000 مشترك! بدلاً من 50 دولار، ستكون 20 دولار فقط ! 😱💥\n\n✨ خصم 50% من قيمة الاشتراك لل 2000 مشترك التاليين! بدلاً من 50 دولار، ستكون 25 دولار فقط ! 💸🔥\n\n✨ خصم 30% من قيمة الاشتراك لل 5000 مشترك التاليين! بدلاً من 50 دولار، ستكون 35 دولار فقط ! 🔥💰\n\n⚠️ بعد وصول عدد المشتركين إلى 8000 مشترك، سينتهي العرض، وستكون قيمة الاشتراك 50 دولار !\n\n\n💥 لا تفوتوا الفرصة، وكونوا من أوائل المشتركين في EFM ! 🔥✨";
                    $this->deleteMessage($chatId,$message_id);
                    $this->sendPhoto($chatId, $image, $text);
                    break;
                case '/founder' :
                    $image = InputFile::create("https://test.efmhub.com/images/owner.jpg");
                    $text = "مؤسس الشركة ✴️\n\nالمهندس عبدالرحمن السمري حاصل على بكالوريوس هندسة برمجيات وعلوم حاسب آلي من بريطانيا، وشهادات معتمدة مثل تحليل البيانات و PMP و  DA  و ML\nهو مؤسس شركة EFM وكذلك صاحب شركة ENG MONEY ✌️✨✨\n\nيُعتبر المهندس عبدالرحمن شخص طموح يؤمن بأن كل فرد يمكنه الوصول إلى النجاح المالي، ويعمل بجد لتحقيق هذا الهدف 👌🎯\nفهو يسعى دائماً لمساعدة الجميع على تحقيق الربح من الإنترنت والوصول إلى الاستقرار المالي🤩\nاستناداً إلى خبرته الكبيرة في الأسواق المالية العالمية قام بتأسيس شركة ENG MONEY، حيث استطاع من خلالها توفير فرص استثمارية مميزة وحققت الشركة أرباح تجاوزت 280% في خلال عام واحد فقط من تاريخ تأسيس الشركة🤯✨\nوبعد هذا النجاح الكبير تستمر هذه السلسلة من النجاحات بتأسيس شركة EFM مستفيداً من خبرته الكبيرة في إدارة المشاريع لتحقيق هدفه في إنشاء أقوى شركة تسويق وربح عبر الإنترنت 💪💵✨";
                    $this->deleteMessage($chatId, $message_id);
                    $this->sendPhoto($chatId, $image, $text);
                    break;
                case '/join':
                    $aboutUrl = 'https://efmhub.com'; // Replace with your actual URL
                    $this->deleteMessage($chatId,$message_id);
                    $this->sendMessage($chatId,null,'Join EFM');
                    break;
                case '/help':
                        $text = "Chat With Agent in Out Telegram Support :\nBy Go To @EFMhub_Support_bot";
                        $this->deleteMessage($chatId,$message_id);
                        $this->sendMessage($chatId, $text);
                        break;
                case '/gateway':
                    $image = InputFile::create("https://test.efmhub.com/images/gateway.jpg");
                    $text = "📤 الايداع والسحب 📤\n\n👇وسائل الايداع والحسب 👇\n\n⚜️ المحافظ الالكترونية مثل فودافون كاش\n⚜️ التحويل الفوري انيستا باي\n⚜️ التحويل البنكي على حساب الشركة\n⚜️ الايداع المباشر في حساب الشركة\n⚜️ التواصل مع الوسيط المالي والوحيد لدينا\n\n🕙 مدة التنفيذ ⏱\nمن دقيقه الى ساعتين 🤩⏳\n\n⚠️ ملاحظة: لا تنسى الاحتفاظ بايصال الدفع وارفاقه في الطلب الخاص بك على موقع الشركة ⚠️";
                    $this->deleteMessage($chatId,$message_id);
                    $this->sendPhoto($chatId, $image, $text);
                    break;
                case '/unban':
                    if (isset($message['message']['reply_to_message'])) {
                        $repliedUserId = $message['message']['reply_to_message']['from']['id'];
                        if ($this->isUserAdmin($chatId, $userId)) {
                            $this->unbanUser($chatId, $repliedUserId);
                        } else {
                            $this->sendMessage($chatId, 'You do not have permission to unban users.');
                        }
                    } else {
                        $this->sendMessage($chatId, 'Please reply to the message of the user you want to unban.' );
                    }
                    break;
                case '/services':
                    $text = "🌟 خدمات شركة EFM 🌟\n
                    تُعتبر EFM الشركة الوحيدة التي تقدم مميزات فريدة لا تضاهى وجوائز قوية تجعلها الخيار الأمثل للجميع 👌✨\n

                    تضم الشركة نوعين من المستفدين :\n

                    مستخدموا EFM ( الجمهور ) : 👥\n
                    ينضم الينا الشخص من خلال عضوية خاصة مفعلة مدى الحياة، ويقوم بتنفيذ مهام بسيطة من خلال الانترنت لكسب الأرباح باستمرار وزيادة الدخل في أوقات الفراغ🤯\n

                    عملاء EFM ( العملاء ) : 💼\n
                    نقدم لهم باقات متنوعة تهدف إلى نشر الحملات والدعاية الإعلانية أونلاين لمشاريعهم أو شركاتهم، مع التركيز على استقطاب أكبر عدد ممكن من الجمهور المستهدف🎯";
                    $this->sendMessage($chatId, $text, $message_id);
                    break;
            }
        }
    }
    private function sendPhoto($chat_id, $photo, $caption = null)
    {
        $telegram = new Api(env('TELEGRAM_BOT_TOKEN'));

        $response = $telegram->sendPhoto([
            'chat_id' => $chat_id,
            'photo' => $photo,
            'caption' => $caption,
            'parse_mode' => 'HTML'
        ]);

        $messageId = $response->getMessageId();
    }
    private function deleteMessage($chat_id, $message_id)
    {
        $endpoint = "https://api.telegram.org/bot" . env('TELEGRAM_BOT_TOKEN') . "/deleteMessage";
        $payload = [
            'chat_id' => $chat_id,
            'message_id' => $message_id,
        ];
        try {
            $response = $this->client->post($endpoint, [
                'json' => $payload,
            ]);
            return $response;
        } catch (\GuzzleHttp\Exception\GuzzleException $e) {
            \Log::error("Error deleting message: " . $e->getMessage());
            return null;
        }
    }
    private function sendMessage($chat_id, $text, $reply_to_message_id = null, $reply_markup = null)
    {
        $endpoint = "https://api.telegram.org/bot" . env('TELEGRAM_BOT_TOKEN') . "/sendMessage";

        $payload = [
            'chat_id' => $chat_id,
            'text' => $text,
            'parse_mode' => $reply_markup == null ? 'Markdown' : 'HTML',
        ];
        if ($reply_to_message_id !== null) {
            $payload['reply_to_message_id'] = $reply_to_message_id;
        }
        if ($reply_markup != null) {
            $payload['reply_markup'] = json_encode($reply_markup);
        }

        try {
            $response = $this->client->post($endpoint, [
                'json' => $payload,
            ]);

            return $response;
        } catch (\GuzzleHttp\Exception\GuzzleException $e) {
            \Log::error("Error sending message: " . $e->getMessage());
            return null;
        }
    }
    private function isUserAdmin($chatId, $userId)
    {
        try {
            $response = Telegram::getChatMember([
                'chat_id' => $chatId,
                'user_id' => $userId,
            ]);

            $status = $response->getStatus();
            $this->sendMessage($chatId, $status);
            return in_array($status, ['administrator', 'creator']);
        } catch (\Exception $e) {
            \Log::error("Error checking admin status: " . $e->getMessage());
            return false;
        }
    }
    private function unbanUser($chatId, $userId)
    {

        if (TelegramUserViolation::where('user_id', $userId)->where('chat_id', $chatId)->exists()) {
            TelegramUserViolation::where('user_id', $userId)->where('chat_id', $chatId)->delete();
        }
        Telegram::unbanChatMember([
            'chat_id' => $chatId,
            'user_id' => $userId,
        ]);
    }
    private function banUser($chatId, $userId, $banDuration)
    {
        // Restrict the user for the given duration
        Telegram::restrictChatMember([
            'chat_id' => $chatId,
            'user_id' => $userId,
            'until_date' => time() + $banDuration, // Ban for specified duration
        ]);

        // Optionally, send a message to the group notifying about the ban
        Telegram::sendMessage([
            'chat_id' => $chatId,
            'text' => "User <b>$userId</b> has been banned for " . ($banDuration / (24 * 60 * 60)) . " days due to sharing a link.",
            'parse_mode' => 'HTML',
        ]);
    }
    function kickUser($chatId, $userId)
    {
        // Kick the user from the group
        Telegram::kickChatMember([
            'chat_id' => $chatId,
            'user_id' => $userId,
        ]);

        // Optionally, send a message to the group notifying about the permanent ban
        Telegram::sendMessage([
            'chat_id' => $chatId,
            'text' => "User has been permanently removed from the group due to repeated violations."
        ]);
    }
    private function handleGroupManagement($chatMemberUpdate)
    {
        \Log::info($chatMemberUpdate);
        $chat = $chatMemberUpdate['chat'];
        $newStatus = $chatMemberUpdate['new_chat_member']['status']??null;
        if (isset($chatMemberUpdate['new_chat_participant'])) {
            try {
                $messages = WelcomeBotMessages::where('status','new')->get();
                foreach ($messages as $message) {
                    $this->deleteMessage($chat['id'], $message->message_id);
                }
                WelcomeBotMessages::where('status','new')->delete();
                $participantName = '<b>'.$chatMemberUpdate['new_chat_participant']['first_name'].' '.isset($chatMemberUpdate['new_chat_participant']['last_name'])?' '.$chatMemberUpdate['new_chat_participant']['last_name']:'</b>';
                // \Log::info('New chat participant added', ['participant' => $participantName]);
                // Send a welcome message to the new participant
                $welcomeText = "مرحباً {$participantName} في شركة EFM للتسويق الإلكتروني والربح من الإنترنت ! 🌟💼\n\nنحن هنا لنفتح لك أبواب الفرص الحقيقية لتحقيق الثراء المالي والوصول إلى حياة الرفاهية التي تستحقها 🌍💰\n\nانضم إلينا في مسيرة نجاح بنيت لتدوم، حيث نقدم لك منصة شاملة لتحقيق طموحاتك المالية، عبر استراتيجيات مدروسة وفرص ذهبية لدخول عالم المال والثراء 💸🔑\n\nفي EFM نسعى جاهدين لتوفير بيئة عمل مريحة وداعمة تساعدك على تحقيق أهدافك المالية بخطوات ثابتة. من خلال تنفيذ مهام بسيطة، ستحصل على مكافآت مالية وفرص للفوز في المسابقات المثيرة 🎉🏆✨\n\nبمجرد اشتراكك، ستتاح لك الفرصة للتعلم الربح والمشاركة في حملات تسويقية تصل إلى جمهور واسع وتحقق لك دخلاً إضافياً من خلال التسويق الإلكتروني 📈🖥\n\nكل ما عليك هو اتخاذ الخطوة الأولى والانضمام إلينا اليوم، وسوف تكون على الطريق الصحيح نحو النجاح المالي والاستقرار 🚀👊\n\nلا تضيع الفرصة، كن جزءًا من عائلتنا الآن، واكتشف كيف يمكن لـEFM مساعدتك في تحقيق أحلامك وتحقيق الثروة ! 💪🌟";
                $response = $this->sendMessage($chat['id'], $welcomeText,null,'HTML');
                $messageId = json_decode($response->getBody()->getContents(), true)['result']['message_id'];
                WelcomeBotMessages::create([
                    'message_id' => $messageId,
                    'status' => 'new',
                ]);
            } catch (\Exception $e) {
                \Log::error("Error sending welcome message: " . $e->getMessage());
            }
        }


        if ($newStatus === 'member') {
            // \Log::info('new added member', ['status' => $newStatus]);
            // $name = $chatMemberUpdate['new_chat_member']['user']['first_name'];
            // $text = "مرحباً {$name}بك يا في شركة EFM للتسويق الإلكتروني والربح من الإنترنت ! 🌟💼\n\nنحن هنا لنفتح لك أبواب الفرص الحقيقية لتحقيق الثراء المالي والوصول إلى حياة الرفاهية التي تستحقها 🌍💰\n\nانضم إلينا في مسيرة نجاح بنيت لتدوم، حيث نقدم لك منصة شاملة لتحقيق طموحاتك المالية، عبر استراتيجيات مدروسة وفرص ذهبية لدخول عالم المال والثراء 💸🔑\n\nفي EFM نسعى جاهدين لتوفير بيئة عمل مريحة وداعمة تساعدك على تحقيق أهدافك المالية بخطوات ثابتة. من خلال تنفيذ مهام بسيطة، ستحصل على مكافآت مالية وفرص للفوز في المسابقات المثيرة 🎉🏆✨\n\nبمجرد اشتراكك، ستتاح لك الفرصة للتعلم الربح والمشاركة في حملات تسويقية تصل إلى جمهور واسع وتحقق لك دخلاً إضافياً من خلال التسويق الإلكتروني 📈🖥\n\nكل ما عليك هو اتخاذ الخطوة الأولى والانضمام إلينا اليوم، وسوف تكون على الطريق الصحيح نحو النجاح المالي والاستقرار 🚀👊\n\nلا تضيع الفرصة، كن جزءًا من عائلتنا الآن، واكتشف كيف يمكن لـEFM مساعدتك في تحقيق أحلامك وتحقيق الثروة ! 💪🌟\n\n🪙 www.efmhub.com 🪙";
            // $this->sendMessage($chat['id'], $text);
            // Handle bot being added to a group
        } elseif ($newStatus === 'left') {
            \Log::info("Bot removed from group: " . $chat['title']);
            // Handle bot being removed from a group
        }
    }
    function handleUserViolation($chatId, $userId)
    {
        // Find or create the violation record for this user
        $violation = TelegramUserViolation::firstOrCreate(
            ['user_id' => $userId, 'chat_id' => $chatId],
            ['violations' => 0]
        );

        // Increment the violation count
        $violation->violations += 1;
        $violation->save();

        // Ban duration based on violation count
        switch ($violation->violations) {
            case 1:
                // First violation: ban for 1 day
                $this->banUser($chatId, $userId, 1 * 24 * 60 * 60); // 1 day in seconds
                break;
            case 2:
                // Second violation: ban for 1 week
                $this->banUser($chatId, $userId, 7 * 24 * 60 * 60); // 1 week in seconds
                break;
            case 3:
                // Third violation: ban for 1 month
                $this->banUser($chatId, $userId, 30 * 24 * 60 * 60); // 1 month in seconds
                break;
            case 4:
                // Fourth violation: permanent ban (kick from group)
                $this->kickUser($chatId, $userId);
                break;
        }
    }
}
