<?php

namespace App\Nova\Filters\Transaction;

use Laravel\Nova\Filters\Filter;
use Laravel\Nova\Http\Requests\NovaRequest;

class TypeFilter extends Filter
{
    /**
     * The filter's component.
     *
     * @var string
     */
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
        return $query->where('type',$value);
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
            'Deposit' => 'deposit',
            'Withdraw' => 'withdraw',
            'Referral' => 'referral',
            'Membership' => 'membership',
            'Transfer' => 'transfer',
            'Fee' => 'fee',
            'Refund' => 'refund',
            'Bonus' => 'bonus',
            'Roi' => 'roi',
        ];
    }
}
