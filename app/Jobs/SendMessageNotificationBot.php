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
     * The message to be sent.
     */
    public string $message;
    public string $chatId;

    /**
     * Create a new job instance.
     *
     * @param string $message
     */
    public function __construct(string $message, string $chatId)
    {
        $this->message = $message;
        $this->chatId = $chatId;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        // Initialize the Telegram API
        $telegram = new Api('7747906094:AAHXfHL9YgIx-vA6s5z-w6l8SKFzq6aubtw');

        // Send the message to each unique chat ID
        $this->sendMessage($telegram, $this->chatId, $this->message);
    }

    /**
     * Send a message to a specific chat ID.
     *
     * @param Api $telegram
     * @param string $chatId
     * @param string $message
     */
    protected function sendMessage(Api $telegram, string $chatId, string $message): void
    {
        $telegram->sendMessage([
            'chat_id' => $chatId,
            'text' => $message,
        ]);
    }
}