<?php

namespace App\Jobs;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use App\Notifications\WithdrawlRequestNotification;

class PushWithdrawlNotification implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */
    public function __construct($user,$transaction)
    {
        $this->user = $user;
        $this->transaction = $transaction;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $users = User::whereHas('roles', function ($query) {
            $query->whereHas('permissions', function ($permQuery) {
                $permQuery->where('name', 'Withdrawal Notifications');
            });
        })->get();
        if($users->count() > 0){    
            foreach ($users as $user) {
                $user->notify(new WithdrawlRequestNotification($this->user,$this->transaction));
            }
        }
    }
}
