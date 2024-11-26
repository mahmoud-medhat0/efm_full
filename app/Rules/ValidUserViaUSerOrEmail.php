<?php

namespace App\Rules;

use Closure;
use App\Models\Client;
use Illuminate\Contracts\Validation\ValidationRule;

class ValidUserViaUSerOrEmail implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $client = Client::where('username', $value)->orWhere('email', $value)->first();
        if (!$client) {
            $fail('The :attribute must be a valid user or email.');
        }
        if (!$client->has_active_subscription) {
            $fail('The :attribute is doesnot have active subscription.');
        }
    }
}
