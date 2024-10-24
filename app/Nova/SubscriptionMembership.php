<?php

namespace App\Nova;

use Illuminate\Http\Request;
use Laravel\Nova\Fields\ID;
use Laravel\Nova\Http\Requests\NovaRequest;
use Laravel\Nova\Fields\BelongsTo;
use Laravel\Nova\Fields\Number;
use Laravel\Nova\Fields\Boolean;
use Laravel\Nova\Fields\DateTime;
use Laravel\Nova\Fields\Select;

class SubscriptionMembership extends Resource
{
    /**
     * The model the resource corresponds to.
     *
     * @var class-string<\App\Models\SubscriptionMembership>
     */
    public static $model = \App\Models\SubscriptionMembership::class;

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
            BelongsTo::make('Client')->display(function($client){
                return $client->name;
            }),
            BelongsTo::make('Membership','membership',Membershib::class)->display(function($membership){
                return $membership->name;
            }),
            Select::make('Status','status')->options([
                'active'=>'Active',
                'inactive'=>'Inactive',
                'expired'=>'Expired',
            ]),
            DateTime::make('Start Date','start_date')->dependsOn('is_lifetime',function($field,$request,$formData){
                if($formData['is_lifetime'] == 0){
                    $field->show();
                }else{
                    $field->hide();
                }
            }),
            DateTime::make('End Date','end_date')->dependsOn('is_lifetime',function($field,$request,$formData){
                if($formData['is_lifetime'] == 0){
                    $field->show();
                }else{
                    $field->hide();
                }
            }),
            Number::make('Remaining Days','remaining_days')->hideWhenCreating()->hideWhenUpdating()->dependsOn('is_lifetime',function($field,$request,$formData){
                if($formData['is_lifetime'] == 0){
                    $field->show();
                }else{
                    $field->hide();
                }
            }),
            Boolean::make('Is Lifetime','is_lifetime'),
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
