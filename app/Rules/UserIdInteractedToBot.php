<?php

namespace App\Rules;

use Closure;
use Telegram\Bot\Api;
use Illuminate\Contracts\Validation\ValidationRule;

class UserIdInteractedToBot implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $telegramInstance = new Api(env('TELEGRAM_BOT_TOKEN'));
        try {
            $response = $telegramInstance->getChatMember([
                'chat_id' => $value,
                'user_id' => $value
            ]);
            // If we reach here, it means the user has interacted with the bot
            // No need to return anything in a void function
        } catch (\Exception $e) {
            // If an exception is thrown, it likely means the user hasn't interacted with the bot
            $fail('The provided user ID has not interacted with our Telegram bot.', $e->getMessage());
        }
    }
}