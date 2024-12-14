<?php

namespace App\Nova;

use App\Models\Transaction;
use Laravel\Nova\Fields\ID;
use Illuminate\Http\Request;
use App\Models\RoiSubscription as RoiSubscriptionModel;
use Laravel\Nova\Fields\Number;
use Laravel\Nova\Fields\Select;
use App\Models\SubscriptionMembership;
use Laravel\Nova\Http\Requests\NovaRequest;
use Illuminate\Support\Facades\DB;

class RoiSubscription extends Resource
{
    /**
     * The model the resource corresponds to.
     *
     * @var class-string<\App\Models\RoiSubscription>
     */
    public static $model = \App\Models\RoiSubscription::class;

    /**
     * The single value that should be used to represent the resource when being displayed.
     *
     * @var string
     */
    public static $title = 'id';

    /**
     * The columns that should be searched.
     *
     * @var array
     */
    public static $search = [
        'id',
    ];

    /**
     * Get the fields displayed by the resource.
     *
     * @param  \Laravel\Nova\Http\Requests\NovaRequest  $request
     * @return array
     */
    public function fields(NovaRequest $request)
    {
        return [
            ID::make()->sortable(),
            Select::make('Patch')
                ->options([
                    'firstHalf' => 'First Half (15-30)',
                    'secondHalf' => 'Second Half (1-14)',
                ]),
            Number::make('Percent')->step(0.01),
        ];
    }
    public static function afterCreate(NovaRequest $request, $model)
    {
        DB::beginTransaction();
        try {
            $patch = $request->patch;
            $percent = $request->percent;
            $subscriptions = SubscriptionMembership::{$patch}()->get();
            foreach ($subscriptions as $subscription) {
                $amount = $subscription->membership->price;
                $roi = $amount * $percent / 100;
                $client = $subscription->client;
                if ($client) {
                    Transaction::create([
                        'client_id' => $subscription->client_id,
                        'amount' => $roi,
                        'fee' => 0,
                        'total' => $roi,
                        'type' => 'roi',
                        'tnx_type' => 'add',
                        'tnx' => 'Roi-' . uniqid(),
                        'description' => 'ROI for ' . $subscription->membership->name,
                        'status' => 'success',
                    ]);
                    $client->balance += $roi;
                    $subscription->client->save();
                } else {
                    throw new \Exception('Client not found ' . $subscription->client_id . 'for subscription ' . $subscription->id);
                }
            }
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            throw new \Exception('Transaction failed for client ' . $subscription->client_id . ' with error: ' . $e->getMessage());
        }
    }
    /**
     * Get the cards available for the request.
     *
     * @param  \Laravel\Nova\Http\Requests\NovaRequest  $request
     * @return array
     */
    public function cards(NovaRequest $request)
    {
        return [];
    }

    /**
     * Get the filters available for the resource.
     *
     * @param  \Laravel\Nova\Http\Requests\NovaRequest  $request
     * @return array
     */
    public function filters(NovaRequest $request)
    {
        return [];
    }

    /**
     * Get the lenses available for the resource.
     *
     * @param  \Laravel\Nova\Http\Requests\NovaRequest  $request
     * @return array
     */
    public function lenses(NovaRequest $request)
    {
        return [];
    }

    /**
     * Get the actions available for the resource.
     *
     * @param  \Laravel\Nova\Http\Requests\NovaRequest  $request
     * @return array
     */
    public function actions(NovaRequest $request)
    {
        return [];
    }
}
