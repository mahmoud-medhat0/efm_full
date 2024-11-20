<?php

namespace App\Http\Controllers\client;

use Inertia\Inertia;
use App\Models\Ticket;
use Illuminate\Http\Request;
use App\Models\TicketMessage;
use App\Models\TicketCategory;
use App\Http\Controllers\Controller;
use App\Jobs\SendMessageNotificationBot;
use Illuminate\Support\Facades\Validator;

class TicketsController extends Controller
{
    public function createTicket(){
        $ticketCategories = TicketCategory::all();
        return Inertia::render('newui/Component/DashBoard/CreateTicket/CreateTicket.jsx',[
            'ticketCategories' => $ticketCategories,
        ]);
    }
    public function createTicketPost(Request $request){
        $rules = [
            'title' => ['required', 'string', 'max:255'],
            'ticket_category_id' => ['required', 'exists:ticket_categrories,id'],
            'description' => ['required', 'string'],
        ];
        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            return response()->json(['success' => false, 'message' => $validator->errors()->first()], 200);
        }
        if(auth()->user()->tickets()->where('status','=','pending')->count() >= 1){
            return response()->json(['success' => false, 'message' => 'You have reached the maximum number of tickets'], 200);
        }
        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('ticket_images', 'public');
        }
        $ticket = Ticket::create([
            'ticket_id' => 'SUPT#'.rand(100000, 999999),
            'title' => $request->title,
            'ticket_category_id' => $request->ticket_category_id,
            'client_id' => auth()->user()->id,
        ]);
        $ticket->ticketMessages()->create([
            'message' => $request->description,
            'message_from' => 'user',
            'client_id' => auth()->user()->id,
            'image' => $imagePath,
        ]);
        $message = 'New Ticket from ' . auth()->user()->name .' With Title: ' . $request->title . ' and id: ' . $ticket->ticket_id;
        SendMessageNotificationBot::dispatch($message)->onQueue('default');
        return response()->json(['success' => true, 'message' => 'Ticket created successfully with id: ' . $ticket->ticket_id]);
    }
    public function tickets(){
        $tickets = Ticket::where('client_id', auth()->user()->id)->with('ticketCategory')->get();
        return Inertia::render('newui/Component/DashBoard/TicketsTable/TicketsTable.jsx',[
            'tickets' => $tickets,
        ]);
    }
    public function showTicket($id){
        $ticket = Ticket::find($id);
        $ticketMessages = TicketMessage::where('ticket_id', $id)->with(['client', 'user'])->get()->toArray();
        return Inertia::render('newui/Component/DashBoard/ChatTicket/ChatTicket.jsx',[
            'ticket' => $ticket,
            'ticketMessages' => $ticketMessages,
        ]);
    }
    public function storeTicketMessage(Request $request){
        $rules = [
            'message' => ['required', 'string'],
        ];
        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            return response()->json(['success' => false, 'message' => $validator->errors()->first()], 200);
        }
        $attachment = null;
        if ($request->hasFile('image')) {
            $attachment = $request->file('image')->store('ticket_images', 'public');
        }
        TicketMessage::create([
            'ticket_id' => $request->ticket_id,
            'message' => $request->message,
            'message_from' => 'user',
            'client_id' => auth()->user()->id,
            'image' => $attachment,
        ]);
        return response()->json(['success' => true, 'message' => 'Ticket message sent successfully']);
    }
}
