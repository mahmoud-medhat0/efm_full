<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use GuzzleHttp\Client;

class ActivateWorkMode extends Command
{
    protected $signature = 'activate:work';
    protected $description = 'Activate Work Mode and open the group chat';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $botToken = env('TELEGRAM_BOT_TOKEN'); // استيراد التوكن من .env
        $chatId = '@EFM_HUB_GROUP'; // اسم المستخدم للمجموعة العامة
        $apiUrl = "https://api.telegram.org/bot$botToken";

        // إعداد الصلاحيات العامة
        $permissions = [
            'can_send_messages' => true,
            'can_send_media_messages' => true,
            'can_send_polls' => false,
            'can_send_other_messages' => true,
        ];

        try {
            // إرسال طلب ضبط الصلاحيات
            $client = new Client();
            $response = $client->post("$apiUrl/setChatPermissions", [
                'form_params' => [
                    'chat_id' => $chatId,
                    'permissions' => json_encode($permissions),
                ],
            ]);

            // التحقق من استجابة ضبط الصلاحيات
            $responseBody = json_decode($response->getBody(), true);
            if ($responseBody['ok'] === true) {
                $this->info("✅ تم ضبط صلاحيات المجموعة العامة بنجاح.");
            } else {
                $this->warn("❌ فشل في ضبط الصلاحيات: " . $responseBody['description']);
                return;
            }

            // إرسال رسالة تأكيد
            $response = $client->post("$apiUrl/sendMessage", [
                'form_params' => [
                    'chat_id' => $chatId,
                    'text' => "✅ تم فتح الجروب ✅\n\nمرحبًا بكم! 😊",
                ],
            ]);

            $responseBody = json_decode($response->getBody(), true);
            if ($responseBody['ok'] === true) {
                $this->info("✅ تم إرسال رسالة تأكيد بنجاح.");
            } else {
                $this->warn("❌ فشل في إرسال رسالة التأكيد: " . $responseBody['description']);
            }
        } catch (\Exception $e) {
            $this->error("❌ حدث خطأ أثناء ضبط الصلاحيات أو إرسال الرسالة: " . $e->getMessage());
        }

        $this->info('Work Mode activated and group chat opened.');
    }
}
