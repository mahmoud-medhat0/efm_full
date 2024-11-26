<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use App\Models\Client;
use App\Models\RegistrationOffer;
class SubscriptionMail extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    public $client;
    public function __construct(Client $client)
    {
        $this->client = $client;
    }

    public function build()
    {
        return $this->subject('Subscription Invoice Mail')->view('invoice')->with([
            'client' => $this->client,
            'membership' => $this->client->getMembershipAttribute()->price,
            'discount' => RegistrationOffer::where('min_activator_count', '<=', $this->client->activator_count)->where('max_activator_count', '>=', $this->client->activator_count)->first()->value,
            'base_url' => config('app.url') // Pass the base URL
        ]);
    }
}
