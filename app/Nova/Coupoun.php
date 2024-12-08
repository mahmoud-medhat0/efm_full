<?php

namespace App\Nova;

use Illuminate\Http\Request;
use Laravel\Nova\Fields\ID;
use Laravel\Nova\Http\Requests\NovaRequest;
use Laravel\Nova\Fields\Text;
use Laravel\Nova\Fields\Number;
use Laravel\Nova\Fields\BelongsTo;
use Laravel\Nova\Fields\MorphMany;
use Bolechen\NovaActivitylog\Resources\ActivityLog;
use Laravel\Nova\Fields\Select;
class Coupoun extends Resource
{
    /**
     * The model the resource corresponds to.
     *
     * @var class-string<\App\Models\Coupoun>
     */
    public static $model = \App\Models\Coupoun::class;

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
        'code',
        'type',
        'value',
        'status',
        'description',
        'client.name',
        'client.email',
        'client.username',
        'client.telegram_username',
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
            Text::make('Code')->sortable(),
            Select::make('Type')->options([
                'percentage' => 'Percentage',
                'fixed' => 'Fixed',
            ])->sortable(),
            Number::make('Value')->sortable(),
            Text::make('Status')->sortable(),
            Text::make('Description')->sortable(),
            BelongsTo::make('Client', 'client', Client::class)->displayUsing(function ($value) {
                return $value->name ?? 'No client';
            })->sortable()->rules('nullable'),
            MorphMany::make('Activities', 'activities', ActivityLog::class)->sortable(),
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
