<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Telegram\Bot\Api;

class ActivateNightMode extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'activate:night';
    protected $description = 'Activate Night Mode and close the group chat';
    /**
     * Execute the console command.
     */
    public function handle()
    {
        $telegram = new Api(env('TELEGRAM_BOT_TOKEN'));
        $chatId = '@EFM_HUB_GROUP';
        $telegram->sendMessage([
            'chat_id' => $chatId,
            'text' => "⛔️ تم غلق الجروب ⛔️\n\n🕒 مواعيد عمل الجروب 🕒\n\nيومياً من 8 صباحًا 🌅 حتى 12 منتصف الليل 🌃",
        ]);
        $telegram->setChatPermissions([
            'chat_id' => $chatId,
            'permissions' => [
                'can_send_messages' => false,
                'can_send_media_messages' => false,
                'can_send_polls' => false,
                'can_send_other_messages' => false,
                'can_add_web_page_previews' => false,
            ],
        ]);
        $this->info('Night Mode activated and group chat closed.');
    }
}
