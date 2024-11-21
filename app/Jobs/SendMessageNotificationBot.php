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

    /**
     * List of chat IDs to send messages to.
     */
    protected array $chatIds = [
        '948449142',
        '7812601988',
        '5864049778',
        '6461632565',
    ];

    /**
     * Create a new job instance.
     *
     * @param string $message
     */
    public function __construct(string $message)
    {
        $this->message = $message;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        // Initialize the Telegram API
        $telegram = new Api('7747906094:AAHXfHL9YgIx-vA6s5z-w6l8SKFzq6aubtw');

        // Send the message to each unique chat ID
        foreach (array_unique($this->chatIds) as $chatId) {
            $this->sendMessage($telegram, $chatId, $this->message);
        }
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