<?php

namespace App\Console\Commands;

use App\Models\Transaction;
use Illuminate\Console\Command;

class CancelDepositLongTime extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:cancel-deposit-long-time';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        Transaction::where('type', 'deposit')->where('status', 'pending')->where('created_at', '<', now()->subDays(2))->update(['status' => 'canceled']);
    }
}
