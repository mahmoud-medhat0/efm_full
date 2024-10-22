<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use App\Models\Client;
class checkactiveReferralUserCode implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $client = Client::where('username', $value)->first();
        if (!$client) {
            $fail('The Referral is not found.');
            return;
        }
        if ($client && !$client->hasActiveSubscription) {
            $fail('The Parent has no active subscription.');
        }
    }
}
