<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Telegram\Bot\Api;
class SendMessageNotificationBot implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */
    public $message;
    public function __construct($message)
    {
        $this->message = $message;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $telegram = new Api('7747906094:AAHXfHL9YgIx-vA6s5z-w6l8SKFzq6aubtw');
        $telegram->sendMessage([
            'chat_id' => '948449142',
            'text' => $this->message,
        ]);
        $telegram->sendMessage([
            'chat_id' => '7812601988',
            'text' => $this->message,
        ]);
        $telegram->sendMessage([
            'chat_id' => '5864049778',
            'text' => $this->message,
        ]);
        $telegram->sendMessage([
            'chat_id' => '6461632565',
            'text' => $this->message,
        ]);
    }
}
