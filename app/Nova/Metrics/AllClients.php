<?php

namespace App\Nova\Metrics;

use Laravel\Nova\Http\Requests\NovaRequest;
use Laravel\Nova\Metrics\Value;
use Laravel\Nova\Nova;
use App\Models\Client;
class AllClients extends Value
{
    public $icon = 'users';
    public $name = 'All Clients';
    public $width = '1/3';
    /**
     * Calculate the value of the metric.
     *
     * @param  \Laravel\Nova\Http\Requests\NovaRequest  $request
     * @return mixed
     */
    public function calculate(NovaRequest $request)
    {
        return $this->count($request, Client::class);
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
     * Get the actions available for this metric.
     *
     * @return array
     */
    public function actions(NovaRequest $request)
    {
        return [
            [
                'name' => 'View All Clients',
                'href' => '/resources/clients', // Nova route for the Client resource
            ],
        ];
    }

    /**
     * Define the link behavior for this metric.
     */
    public function resolveActions(NovaRequest $request)
    {
        return [
            [
                'name' => 'View All Clients',
                'href' => '/resources/clients', // Nova route for the Client resource
            ],
        ];
    }

    /**
     * Get the URI key of the metric.
     */
    public function uriKey()
    {
        return 'all-clients';
    }
}
