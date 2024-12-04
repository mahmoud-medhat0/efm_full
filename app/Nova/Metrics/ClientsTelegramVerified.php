<?php

namespace App\Nova\Metrics;

use Laravel\Nova\Http\Requests\NovaRequest;
use Laravel\Nova\Metrics\Value;
use Laravel\Nova\Nova;
use App\Models\Client;
class ClientsTelegramVerified extends Value
{
    // public $iconIsHtml = true;
    // public $icon = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-telegram" viewBox="0 0 16 16" style="display: block; margin: auto; position: relative;">
    //         <path d="M16 1.538a.5.5 0 0 0-.707-.454L1.5 7.5a.5.5 0 0 0 .07.94l3.9.975 1.5 4.5a.5.5 0 0 0 .94-.07l1.5-4.5 3.9-.975a.5.5 0 0 0 .07-.94L16 1.538zM6.5 10.5L5 9.5l6-3.5-4.5 4.5z"/>
    //         <svg x="50%" y="90%" text-anchor="middle" font-size="3" fill="currentColor"></svg>
    //         </svg>';
    public $icon = 'check-circle';
    public $width = '1/3';
    public function name()
    {
        return 'Clients Telegram Verified';
    }
    /**
     * Calculate the value of the metric.
     *
     * @param  \Laravel\Nova\Http\Requests\NovaRequest  $request
     * @return mixed
     */
    public function calculate(NovaRequest $request)
    {
        return $this->count($request, Client::where('telegram_verified', true));
    }

    /**
     * Get the ranges available for the metric.
     *
     * @return array
     */
    public function ranges()
    {
        return [
            30 => Nova::__('30 Days'),
            60 => Nova::__('60 Days'),
            365 => Nova::__('365 Days'),
            'TODAY' => Nova::__('Today'),
        ];
    }

    /**
     * Determine the amount of time the results of the metric should be cached.
     *
     * @return \DateTimeInterface|\DateInterval|float|int|null
     */
    public function cacheFor()
    {
        // return now()->addMinutes(5);
    }
}
