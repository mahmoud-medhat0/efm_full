<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\Models\Client;
use App\Models\Task;
use Illuminate\Support\Facades\Log;
class GenerateOrderTasks implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */
    public $order;
    public function __construct($order)
    {
        $this->order = $order;
        $this->handle();
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $clients = new Client();
        $clients = $clients->ValidClient()->select('id')->get();
        foreach ($clients as $client) {
            Task::create([
                'order_id' => $this->order->id,
                'client_id' => $client->id,
                'service_id' => $this->order->service_id,
                'link' => $this->order->link,
            ]);
        }
    }
}
