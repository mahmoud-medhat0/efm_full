<?php

namespace App\Rules;

use Closure;
use Telegram\Bot\Api;
use Illuminate\Contracts\Validation\ValidationRule;

class UserIdRelatedToUsername implements ValidationRule
{
    protected $telegram;

    public function __construct(protected string $username)
    {
        $this->telegram = new Api(env('TELEGRAM_BOT_TOKEN'));
    }

    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        try {
            $response = $this->telegram->getChatMember([
                'chat_id' => $value, // assuming $value is the user ID
                'user_id' => $value
            ]);

            $usernameMatches = strtolower($response['user']['username'] ?? '') == strtolower($this->username);

            if (!$usernameMatches) {
                $fail('The provided user ID does not match the expected username.');
            }
        } catch (\Exception $e) {
            $fail('Failed to verify the user ID with Telegram Bot.');
        }
    }
}
