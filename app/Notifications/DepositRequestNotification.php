<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Laravel\Nova\Notifications\NovaChannel;
use Laravel\Nova\Notifications\NovaNotification;
use Laravel\Nova\URL;
class DepositRequestNotification extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct($user,$transaction)
    {
        $this->user = $user;
        $this->transaction = $transaction;
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
        return NovaNotification::make()
                    ->message('New Deposit Request from ' . $this->user->name . ' for ' . $this->transaction->amount . ' EGP')
                    ->action('View Deposit', URL::make('/nova/resources/transactions/' . $this->transaction->id));
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
