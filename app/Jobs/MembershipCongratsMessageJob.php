<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Telegram\Bot\Api;
class MembershipCongratsMessageJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */
    public $user;
    public function __construct($user)
    {
        $this->user = $user;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $message = `🎉 مبروك $this->user->name ! 🎉\nلقد تم تفعيل عضويتك بنجاح في أقوى شركة تسويق،EFM ! 🚀\nنتمنى لك النجاح والتفوق والوصول إلى الثراء معنا 💪💰\nكن على أتم الاستعداد لتنفيذ بعض المهام الجديدة المثيرة 🌟 التي ستساعدك في تحقيق أهدافك المالية 💸✨`;
        $telegram = new Api(env('TELEGRAM_BOT_TOKEN'));
        $telegram->sendMessage([
            'chat_id' => '@EFM_HUB_GROUP',
            'text' => $message,
        ]);
    }
}
