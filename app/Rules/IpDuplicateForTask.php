<?php

namespace App\Rules;

use Closure;
use App\Models\Task;
use Illuminate\Contracts\Validation\ValidationRule;

class IpDuplicateForTask implements ValidationRule
{
    public $taskId;
    public function __construct($taskId)
    {
        $this->taskId = $taskId;
    }
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $ip = request()->ip();
        $task = Task::find($this->taskId)->order->tasks->where('ip', $ip)->first();
        if($task){
            $fail('This IP has already completed this task');
        }
    }
}
