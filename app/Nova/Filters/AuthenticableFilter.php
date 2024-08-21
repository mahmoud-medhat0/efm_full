<?php

namespace App\Nova\Filters;

use Laravel\Nova\Filters\Filter;
use Laravel\Nova\Http\Requests\NovaRequest;

class AuthenticableFilter extends Filter
{
    /**
     * The filter's component.
     *
     * @var string
     */
    public $name = 'Authenticable Type';

    public $component = 'select-filter';

    /**
     * Apply the filter to the given query.
     *
     * @param  \Laravel\Nova\Http\Requests\NovaRequest  $request
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @param  mixed  $value
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function apply(NovaRequest $request, $query, $value)
    {
        return $query->where('authenticatable_type', $value);
    }

    /**
     * Get the filter's available options.
     *
     * @param  \Laravel\Nova\Http\Requests\NovaRequest  $request
     * @return array
     */
    public function options(NovaRequest $request)
    {
        return [
            'Client'=>'App\Models\Client',
            'Admin'=>'App\Models\Admin',
        ];
    }
}
