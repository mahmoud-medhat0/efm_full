<?php

namespace App\Http\Controllers;

use App\Models\Gateways;
use App\Models\Transaction;
use Illuminate\Http\Request;
use App\Models\Client;
use Illuminate\Support\Facades\DB;

class FawaterakController extends Controller
{
    public function successhook(Request $request)
    {
        $apiKey = env('FWATERAK_API_KEY');
        if($request->api_key !== $apiKey){
            return response()->json(['message' => 'Invalid API key'], 401);
        }
        $invoiceStatus = $this->getInvoiceStatus($request->invoice_id);
        if($invoiceStatus[0] == 'success'){
            try{
                DB::transaction(function () use ($invoiceStatus,$request) {
                    Transaction::create([
                        'gateway_id' => $invoiceStatus[1]['payment_method'],
                        'tnx' => 'DEP' . time(),
                        'tnx_type' => 'add',
                        'description' => 'Deposit from ' . Gateways::find($invoiceStatus[1]['payment_method'])->name,
                        'status' => $invoiceStatus[0],
                        'type' => 'deposit',
                        'client_id' => $invoiceStatus[1]['client_id'],
                        'amount' => doubleval($invoiceStatus[1]['amount']),
                        'fee' => doubleval($invoiceStatus[1]['fee']),
                        'total' => doubleval($invoiceStatus[1]['total']),
                        'invoice_id' => $request->invoice_id,
                        'invoice_key' => $request->invoice_key,
                        'payment_method' => $request->payment_method,
                        'reference_number' => $request->reference_number,
                    ]);
                    Client::find($invoiceStatus[1]['client_id'])->update([
                        'balance' => DB::raw('balance + ' . $invoiceStatus[1]['amount'])
                    ]);
                });
            }catch(\Exception $e){
                \Log::error('Error updating client balance: ' . $e->getMessage());
            }
            return response()->json(['message' => 'Invoice paid'], 200);
        }elseif($invoiceStatus[0] == 'failed'){
            \Log::info($invoiceStatus[1]);
            return response()->json(['message' => 'Invoice not paid'], 400);
        }
        return response()->json(['message' => 'Invoice not paid'], 400);
    }
    private function getInvoiceStatus($invoiceid)
    {
        $curl = curl_init();

        $options = [
            CURLOPT_URL => 'https://staging.fawaterk.com/api/v2/getInvoiceData/'.$invoiceid,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'GET',
            CURLOPT_HTTPHEADER => [
                'Content-Type: application/json',
                'Authorization: Bearer '.env('FWATERAK_API_KEY')
            ],
        ];

        curl_setopt_array($curl, $options);

        $response = curl_exec($curl);

        if (curl_errno($curl)) {
            $error_msg = curl_error($curl);
            curl_close($curl);
            throw new \Exception('Curl error: ' . $error_msg);
        }

        curl_close($curl);
        $responseData = json_decode($response, true);
        $payload = json_decode($responseData['data']['pay_load'], true);

        return [$responseData['status'], $payload];
    }
}
