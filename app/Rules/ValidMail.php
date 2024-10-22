<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use ZeroBounce\SDK\ZeroBounce;

class ValidMail implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (!filter_var($value, FILTER_VALIDATE_EMAIL)) {
            $fail('The :attribute must be a valid email address.');
        }
        ZeroBounce::Instance()->initialize(env('ZEROBOUNCE_API_KEY'));
        $response = ZeroBounce::Instance()->validate(
            $value,              // The email address you want to validate
            ""                      
        );
        if ($response->status !== 'valid') {
            $fail('The :attribute is not a valid email address.');
        }
    }
}
