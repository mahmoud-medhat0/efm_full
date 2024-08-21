<?php

namespace App\Nova\Filters;

use Laravel\Nova\Filters\Filter;
use Laravel\Nova\Http\Requests\NovaRequest;

class AuthenticableUsers extends Filter
{
    /**
     * The filter's component.
     *
     * @var string
     */
    public $name = 'Authenticable Users';
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
        if ($request->filters()[0]->value) {
            return $query->where('authenticatable_id', $value)->where('authenticatable_type', $request->filters()[0]->value);
        }
        return $query->where('authenticatable_id', $value);
    }

    /**
     * Get the filter's available options.
     *
     * @param  \Laravel\Nova\Http\Requests\NovaRequest  $request
     * @return array
     */
    public function options(NovaRequest $request,array $filters=[])
    {
        // dd($filters);
        $admins = \App\Models\User::all()->pluck('id', 'name')->toArray();
        $clients = \App\Models\Client::all()->pluck('id', 'name')->toArray();

        // Merge the arrays and return
        return array_merge($admins, $clients);
    }
}
