<?php

namespace App\Nova;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Laravel\Nova\Fields\ID;
use Laravel\Nova\Http\Requests\NovaRequest;
use Laravel\Nova\Fields\Text;
use Laravel\Nova\Fields\BelongsTo;
use Laravel\Nova\Fields\Select;
use App\Models\Gateways as GatewaysModel;
use Laravel\Nova\Fields\Currency;
use App\Models\Transaction as TransactionModel;

class AgentRecieveRequest extends Resource
{
    /**
     * The model the resource corresponds to.
     *
     * @var class-string<\App\Models\AgentRecieveRequest>
     */
    public static $model = \App\Models\AgentRecieveRequest::class;

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
        'sender_name',
        'sender_identifier',
        'amount'
    ];
    public static function indexQuery(NovaRequest $request, $query)
    {
        return $query->whereIn('gateway_id', json_decode(auth('admin')->user()->gateways, true));
    }
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
            Select::make('Gateway', 'gateway_id')->options(GatewaysModel::whereIn('id', json_decode(auth('admin')->user()->gateways, true))->pluck('name', 'id'))->displayUsingLabels()->rules('required')->hideFromDetail()->hideFromIndex(),
            Text::make('Sender Name')->rules('nullable'),
            Text::make('Sender Identifier')->rules('required'),
            Currency::make('Amount')->rules('required'),
            Text::make('Status')->displayUsing(fn($status) => $status == 'pending' ? '<span class="badge badge-warning">Pending</span>' : '<span class="badge badge-success">Approved</span>')->hideWhenCreating()->hideWhenUpdating()->asHtml(),
            BelongsTo::make('User', 'user', User::class)->hideFromDetail()->hideFromIndex()->hideWhenCreating()->hideWhenUpdating()->nullable(),
            BelongsTo::make('Transaction')->hideFromDetail()->hideFromIndex()->hideWhenCreating()->hideWhenUpdating()->nullable(),
            BelongsTo::make('Gateway', 'gateway', Gateways::class)->display(fn($gateway) => $gateway->name)->hideWhenCreating()->hideWhenUpdating(),
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
        return [];
    }
}
