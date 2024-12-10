<?php

namespace App\Console\Commands;

use App\Models\Order;
use Illuminate\Console\Command;

class RemoveTasksCompeletedOrders extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:remove-tasks-compeleted-orders';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Remove tasks of completed orders';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $orders = Order::where('status', 'approved')->where('current_amount', '<=', 'target_amount')->get();
        foreach ($orders as $order) {
            $order->tasks()->whereIn('status', ['pending','in_progress','failed'])->update(['status' => 'expired']);
        }
        $orders2 = Order::where('status', 'approved')->where('current_amount', '>=', 'target_amount')->get();
        foreach ($orders2 as $order) {
            $order->tasks()->where('status', 'expired')->update(['status' => 'pending']);
        }
    }
}

