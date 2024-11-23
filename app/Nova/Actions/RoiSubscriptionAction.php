<?php

namespace App\Nova\Actions;

use Illuminate\Bus\Queueable;
use Laravel\Nova\Fields\Number;
use Laravel\Nova\Fields\Select;
use Laravel\Nova\Actions\Action;
use Illuminate\Support\Collection;
use Laravel\Nova\Fields\ActionFields;
use App\Models\SubscriptionMembership;
use App\Models\RoiSubscription;
use App\Models\Transaction;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Laravel\Nova\Http\Requests\NovaRequest;

class RoiSubscriptionAction extends Action
{
    use InteractsWithQueue, Queueable;

    /**
     * Perform the action on the given models.
     *
     * @param  \Laravel\Nova\Fields\ActionFields  $fields
     * @param  \Illuminate\Support\Collection  $models
     * @return mixed
     */
    public function handle(ActionFields $fields, Collection $models)
    {
        $patch = $fields->patch;
        $percent = $fields->percent;
        RoiSubscription::create([
            'patch' => $patch,
            'percent' => $percent,
        ]);
        $subscriptions = SubscriptionMembership::{$patch}()->get();
        foreach ($subscriptions as $subscription) {
            $amount = $subscription->membership->price;
            $roi = $amount * $percent / 100;
            Transaction::create([
                'client_id' => $subscription->client_id,
                'amount' => $roi,
                'fee' => 0,
                'total' => $roi,
                'type' => 'roi',
                'tnx_type' => 'add',
                'description' => 'ROI for ' . $subscription->membership->name,
                'status' => 'success',
            ]);
            $subscription->client->balance += $roi;
            $subscription->client->save();
        }
        return Action::message('ROI added successfully');
    }

    /**
     * Indicates if the action is standalone.
     *
     * @return bool
     */
    public function standalone()
    {
        return true;
    }

    /**
     * Get the fields available on the action.
     *
     * @param  \Laravel\Nova\Http\Requests\NovaRequest  $request
     * @return array
     */
    public function fields(NovaRequest $request)
    {
        return [
            Select::make('Patch')
                ->options([
                    'firstHalf' => 'First Half (1-14)',
                    'secondHalf' => 'Second Half (15-30)',
                ])
                ->displayUsingLabels(),
            Number::make('Percent')
        ];
    }
}
