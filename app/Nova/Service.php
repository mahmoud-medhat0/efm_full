<?php

namespace App\Nova;

use Illuminate\Http\Request;
use Laravel\Nova\Fields\ID;
use Laravel\Nova\Http\Requests\NovaRequest;
use Spatie\NovaTranslatable\Translatable;
use Laravel\Nova\Fields\Text;
use Laravel\Nova\Fields\Image;
use Laravel\Nova\Fields\Select;
use Laravel\Nova\Fields\Number;
use Laravel\Nova\Fields\Currency;
use Laravel\Nova\Fields\Code;
use Laravel\Nova\Fields\MorphMany;
use Bolechen\NovaActivitylog\Resources\ActivityLog;
use Laravel\Nova\Fields\HasMany;
use Laravel\Nova\Fields\Boolean;
class Service extends Resource
{
    /**
     * The model the resource corresponds to.
     *
     * @var class-string<\App\Models\Service>
     */
    public static $model = \App\Models\Service::class;

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
            Translatable::make([
                Text::make('name')->sortable(),
            ]),
            Image::make('icon'),
            Boolean::make('is_category_required')->sortable(),
            Select::make('status')->options([
                'active' => 'Active',
                'inactive' => 'Inactive',
            ]),
            Number::make('reward_point')->sortable(),
            Number::make('price_per_one_point')->sortable(),
            Currency::make('price_per_one_balance')->step(0.01)->sortable(),
            Number::make('min_amount')->sortable(),
            Number::make('max_amount')->sortable(),
            Code::make('credentials')->sortable(),
            Code::make('calculation_formula')->sortable(),
            Code::make('fields'),
            HasMany::make('Tasks', 'tasks', Task::class)->onlyOnDetail()->sortable(),
            MorphMany::make('activityLogs','activityLogs', ActivityLog::class)->sortable(),
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
