<?php

namespace App\Nova\Filters\BanAttemp;

use Laravel\Nova\Filters\Filter;
use Laravel\Nova\Http\Requests\NovaRequest;

class CausrFilter extends Filter
{
    /**
     * The filter's component.
     *
     * @var string
     */
    public $component = 'text-filter';

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
        return $query->where('cause','like', '%'.$value.'%');
    }
}
