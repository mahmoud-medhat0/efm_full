<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\TicketMessage;
use App\Models\Ticket;
/*
|--------------------------------------------------------------------------
| Card API Routes
|--------------------------------------------------------------------------
|
| Here is where you may register API routes for your card. These routes
| are loaded by the ServiceProvider of your card. You're free to add
| as many additional routes to this file as your card may require.
|
*/

Route::get('/get-messages/{id}', function ($id) {
    $messages = TicketMessage::where('ticket_id',$id)->with(['user','client','ticket'])->orderBy('created_at','asc')->get();
    return response()->json($messages);
});
Route::post('/send-message', function (Request $request) {
    $message = TicketMessage::create([
        'user_id' => auth('admin')->user()->id,
        'message' => $request->message,
        'ticket_id' => $request->ticket_id,
        'message_from' => $request->message_from,
    ])->load(['user','client','ticket']);
    return response()->json($message);
});
Route::post('/update-status', function (Request $request) {
    $ticket = Ticket::find($request->ticket_id);
    $ticket->status = $request->status;
    $ticket->save();
    return response()->json($ticket);
});
