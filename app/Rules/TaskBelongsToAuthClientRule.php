<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use App\Models\Task;
class TaskBelongsToAuthClientRule implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $task = Task::find($value);
        if (!$task) {
            $fail('Task not found');
        }
        if ($task->client_id !== auth()->user()->id) {
            $fail('Task not found');
        }
    }
}
