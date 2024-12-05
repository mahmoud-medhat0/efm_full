<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\AgentRecieveRequest;
use App\Models\Transaction;
class AgentRecieveRequestFindTransaction extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'process:agent-recieve-request';

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
        $requests = AgentRecieveRequest::pending()->get();
        foreach($requests as $request){
            $transaction = Transaction::where('gateway_id',$request->gateway_id)->where('type','deposit')->where('status','pending')->where('total',$request->amount)->where('manual_fields','like','%"'.$request->sender_identifier.'"%')->first();
            $this->info($request->id.' - '.$transaction->id);
            if($transaction){
                $request->status = 'approved';
                $request->transaction_id = $transaction->id;
                $request->save();
                $transaction->client->update(['balance'=>$transaction->client->balance+$transaction->amount]);
                $transaction->agentRequest->update(['status'=>'approved']);
                $transaction->update(['status'=>'success']);
            }
        }
    }
}
