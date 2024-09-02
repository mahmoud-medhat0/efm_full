<?php

namespace App\Nova;

use Illuminate\Http\Request;
use Laravel\Nova\Fields\ID;
use Laravel\Nova\Http\Requests\NovaRequest;
use Laravel\Nova\Fields\Select;
use Laravel\Nova\Fields\Text;
use Naif\ToggleSwitchField\ToggleSwitchField;
use Laravel\Nova\Fields\Number;
use Laravel\Nova\Fields\BelongsTo;
use Laravel\Nova\Fields\Boolean;
use Laravel\Nova\Fields\HasMany;
use Laravel\Nova\Fields\MorphMany;
use Bolechen\NovaActivitylog\Resources\ActivityLog;

class Task extends Resource
{
    /**
     * The model the resource corresponds to.
     *
     * @var class-string<\App\Models\Task>
     */
    public static $model = \App\Models\Task::class;

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
            Select::make('Status', 'status')->options([
                'pending' => 'Pending',
                'completed' => 'Completed',
                'failed' => 'Failed',
                'in_progress' => 'In Progress',
            ]),
            ToggleSwitchField::make('Paid', 'paid'),
            Boolean::make('Removed', 'removed'),
            Number::make('Points Reward', 'points_reward')->step(0.01)->default(0),
            Text::make('Link', 'link')->readonly(),
            Text::make('IP', 'ip')->readonly(),
            Text::make('User Agent', 'user_agent')->readonly(),
            Text::make('Country', 'country')->readonly(),
            BelongsTo::make('Order', 'order', Order::class)->displayUsing(function ($order) {
                return $order->order_id;
            }),
            BelongsTo::make('Client', 'client', Client::class)->displayUsing(function ($client) {
                return $client->name;
            }),
            BelongsTo::make('Service', 'service', Service::class)->displayUsing(function ($service) {
                return $service->name;
            }),
            HasMany::make('Ban Attemps', 'banAttemps', BanAttemp::class),
            MorphMany::make('Activity Logs', 'activityLogs', ActivityLog::class),
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
