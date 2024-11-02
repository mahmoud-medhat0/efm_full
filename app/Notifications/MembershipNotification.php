<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use App\Models\SubscriptionMembership;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Laravel\Nova\Notifications\NovaChannel;
use Laravel\Nova\Notifications\NovaNotification;
use Illuminate\Notifications\Messages\MailMessage;
use Laravel\Nova\URL;

class MembershipNotification extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct($user,$membershipId)
    {
        $this->user = $user;
        $this->membershipId = $membershipId;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return [NovaChannel::class];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toNova(object $notifiable): NovaNotification
    {
        $membership = SubscriptionMembership::find($this->membershipId)->membership->name;
        return NovaNotification::make()
                    ->message('New Membership Subscription from ' . $this->user->name . ' for ' . $membership .' Plan')
                    ->action('View Membership', URL::make('nova/resources/subscription-memberships' . $this->membershipId));
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
