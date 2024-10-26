<?php

namespace App\Nova;

use Carbon\Carbon;
use Laravel\Nova\Fields\ID;
use Illuminate\Http\Request;
use Laravel\Nova\Fields\Text;
use Laravel\Nova\Fields\Select;
use Laravel\Nova\Fields\Currency;
use Laravel\Nova\Fields\DateTime;
use Laravel\Nova\Fields\BelongsTo;
use Laravel\Nova\Fields\MorphMany;
use App\Nova\Actions\SetStatusSuccess;
use App\Nova\Actions\SetStatusCancelled;
use Laravel\Nova\Http\Requests\NovaRequest;
use Bolechen\NovaActivitylog\Resources\ActivityLog;
use Laravel\Nova\Fields\Image;
class Transaction extends Resource
{
    /**
     * The model the resource corresponds to.
     *
     * @var class-string<\App\Models\Transaction>
     */
    public static $model = \App\Models\Transaction::class;

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
            Select::make('Type')->options([
                'deposit' => 'Deposit',
                'withdrawal' => 'Withdrawal',
                'transfer' => 'Transfer',
                'refund' => 'Refund',
                'fee' => 'Fee',
            ]),
            Select::make('Status')->options([
                'pending' => 'Pending',
                'completed' => 'Completed',
                'failed' => 'Failed',
                'cancelled' => 'Cancelled',
            ]),
            Select::make('tnx_type')->options([
                'add' => 'Add',
                'subtract' => 'Subtract',
            ]),
            Text::make('Tnx')->readonly(),
            Text::make('Note'),
            Text::make('Description'),
            Currency::make('Amount')->displayUsing(function ($amount) {
                return $amount . ' ' . 'EGP';
            }),
            Currency::make('Fee')->displayUsing(function ($fee) {
                return $fee . ' ' . 'EGP';
            }),
            Currency::make('Total')->displayUsing(function ($total) {
                return $total . ' ' . 'EGP';
            }),
            Image::make('Attachment')->disk('private'),
            DateTime::make('Created At'),
            Text::make('Time Ago', function ($transaction) {
                return Carbon::parse($transaction->created_at)->diffForhumans();
            }),
            BelongsTo::make('Gateway', 'gateway', Gateways::class)->displayUsing(function ($gateway) {
                return $gateway->name;
            }),
            BelongsTo::make('Client', 'client', Client::class)->displayUsing(function ($client) {
                return $client->name;
            }),
            BelongsTo::make('Admin', 'admin', User::class)->displayUsing(function ($admin) {
                return $admin->name;
            }),
            MorphMany::make('Activity', 'activityLogs', ActivityLog::class),
        ];
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
        return [
            (new SetStatusSuccess),
            (new SetStatusCancelled),
        ];
    }
}
