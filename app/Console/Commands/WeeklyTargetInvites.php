<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Client;
use App\Models\Coupoun;
use Illuminate\Support\Str;

class WeeklyTargetInvites extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:weekly-target-invites';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Send weekly target invites coupon to clients';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $firstDayOfPreviousWeek = now()->subWeek()->startOfWeek();
        $lastDayOfPreviousWeek = now()->subWeek()->endOfWeek();
        $clients = Client::select('id')->whereHas('subscriptionMemberships', function($query) use ($firstDayOfPreviousWeek, $lastDayOfPreviousWeek){
            $query->whereHas('client.referrals', function($query) use ($firstDayOfPreviousWeek, $lastDayOfPreviousWeek) {
                $query->whereHas('subscriptionMemberships', function($query) use ($firstDayOfPreviousWeek, $lastDayOfPreviousWeek) {
                    $query->whereBetween('created_at', [$firstDayOfPreviousWeek, $lastDayOfPreviousWeek]);
                });
            });
        })->withCount(['referrals as weekly_referrals_count' => function($query) use ($firstDayOfPreviousWeek, $lastDayOfPreviousWeek) {
            $query->whereHas('subscriptionMemberships', function($query) use ($firstDayOfPreviousWeek, $lastDayOfPreviousWeek) {
                $query->whereBetween('created_at', [$firstDayOfPreviousWeek, $lastDayOfPreviousWeek]);
            });
        }])->having('weekly_referrals_count', '>=', 1)->get();
        foreach($clients as $client){
            $couponCount = intval($client->weekly_referrals_count / 15);
            if($couponCount > 0){
                for($i = 0; $i < $couponCount; $i++){
                    Coupoun::create([
                        'code' => Str::random(10),
                        'type' => 'percentage',
                        'value' => 50,
                        'status' => 'active',
                        'description' => 'Weekly target invite coupon',
                        'client_id' => $client->id,
                    ]);
                }
            }
        }
    }
}
