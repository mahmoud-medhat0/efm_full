<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * Define the application's command schedule.
     */
    protected function schedule(Schedule $schedule): void
    {
        $schedule->command('process:agent-recieve-request')->everyMinute();
        $schedule->command('app:cancel-deposit-long-time')->everyMinute();
        $schedule->command('app:remove-tasks-compeleted-orders')->everyMinute();
        $schedule->command('activate:night')->dailyAt('00:00');
        $schedule->command('activate:work')->dailyAt('08:00');
        $schedule->command('weekly:target-invites')->weeklyOn(1, '08:00');
    }

    /**
     * Register the commands for the application.
     */
    protected function commands(): void
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}
