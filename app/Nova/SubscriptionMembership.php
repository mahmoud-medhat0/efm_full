<?php

namespace App\Nova;

use Laravel\Nova\Fields\ID;
use Illuminate\Http\Request;
use Laravel\Nova\Fields\Number;
use Laravel\Nova\Fields\Select;
use Laravel\Nova\Fields\Boolean;
use Laravel\Nova\Fields\DateTime;
use Laravel\Nova\Fields\BelongsTo;
use Laravel\Nova\Http\Requests\NovaRequest;
use App\Nova\Filters\SubscriptionMembership\ClientFilter;
use App\Nova\Filters\SubscriptionMembership\StatusFilter;
use App\Nova\Filters\SubscriptionMembership\CreatedAtEndFilter;
use App\Nova\Filters\SubscriptionMembership\CreatedAtEndtFilter;
use App\Nova\Filters\SubscriptionMembership\CreatedAtStartFilter;

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
        'id','client.name','membership.name','status','start_date','end_date','remaining_days'
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
            })->sortable(),
            BelongsTo::make('Membership','membership',Membershib::class)->display(function($membership){
                return $membership->name;
            })->sortable(),
            Select::make('Status','status')->options([
                'active'=>'Active',
                'inactive'=>'Inactive',
                'expired'=>'Expired',
            ])->sortable(),
            DateTime::make('Start Date','start_date')->dependsOn('is_lifetime',function($field,$request,$formData){
                if($formData['is_lifetime'] == 0){
                    $field->show();
                }else{
                    $field->hide();
                }
            })->sortable(),
            DateTime::make('End Date','end_date')->dependsOn('is_lifetime',function($field,$request,$formData){
                if($formData['is_lifetime'] == 0){
                    $field->show();
                }else{
                    $field->hide();
                }
            })->sortable(),
            Number::make('Remaining Days','remaining_days')->hideWhenCreating()->hideWhenUpdating()->dependsOn('is_lifetime',function($field,$request,$formData){
                if($formData['is_lifetime'] == 0){
                    $field->show();
                }else{
                    $field->hide();
                }
            })->sortable(),
            Boolean::make('Is Lifetime','is_lifetime')->sortable(),
            DateTime::make('created_at')->readonly()->sortable(),
            DateTime::make('updated_at')->readonly()->sortable(),
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
        return [
            new ClientFilter,
            new CreatedAtStartFilter,
            new CreatedAtEndFilter,
            new StatusFilter,   
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
