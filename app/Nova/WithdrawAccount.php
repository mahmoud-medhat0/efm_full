<?php

namespace App\Nova;

use Laravel\Nova\Fields\ID;
use Illuminate\Http\Request;
use Laravel\Nova\Fields\Code;
use Laravel\Nova\Fields\Text;
use Laravel\Nova\Fields\BelongsTo;
use Laravel\Nova\Fields\MorphMany;
use App\Models\Gateways as GatewayModel;
use Illuminate\Support\Facades\Validator;
use Laravel\Nova\Http\Requests\NovaRequest;
use App\Nova\Filters\WithdrawAccount\ClientFilter;
use App\Nova\Filters\WithdrawAccount\GatewayFilter;
use Bolechen\NovaActivitylog\Resources\ActivityLog;

class WithdrawAccount extends Resource
{
    /**
     * The model the resource corresponds to.
     *
     * @var class-string<\App\Models\WithdrawAccount>
     */
    public static $model = \App\Models\WithdrawAccount::class;

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
        'id','gateway.name','client.name','data'
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
            BelongsTo::make('Gateways', 'gateway', Gateways::class)->displayUsing(fn ($gateway) => $gateway->name)->sortable(),
            BelongsTo::make('Client', 'client', Client::class)->displayUsing(fn ($user) => $user->name)->sortable(),
            Code::make('Data')->sortable(),
            MorphMany::make('Activity Log', 'activityLogs', ActivityLog::class)->sortable(),    
        ];
    }
    protected static function afterUpdateValidation(NovaRequest $request, $validator)
    {
        // Fetch the gateway based on the gateway_id in the request
        $gateway = GatewayModel::find($request->gateway);

        // If gateway is not found, add an error to the validator
        if (is_null($gateway)) {
            $validator->errors()->add('gateway', 'The selected gateway is invalid.');
            return;
        }

        // Decode the JSON fields for validation configuration
        $fields = json_decode($gateway->fields, true);

        // Build the rules string based on the gateway's validation settings
        $rules = [
            $fields['name'] => [
                $fields['validation']['required'] ? 'required' : 'nullable',
                isset($fields['validation']['regex']) ? 'regex:' . $fields['validation']['regex'] : '',
                isset($fields['validation']['unique']) && $fields['validation']['unique'] ? 'unique:withdraw_accounts,data->' . $fields['name'] : '',
            ]
        ];

        // Clean up empty rules (if any)
        $rules[$fields['name']] = array_filter($rules[$fields['name']]);
        // Manually validate the 'data' field against the generated rules
        $dataValidator = Validator::make(
            [$fields['name'] => json_decode($request->data,true)[$fields['name']]], $rules
        );

        // If there are validation errors, merge them with the existing validator's errors
        if ($dataValidator->fails()) {
            $validator->errors()->add($fields['name'],$dataValidator->errors());
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
        return [
            new GatewayFilter,
            new ClientFilter,
        ];
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
