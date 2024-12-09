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
use Outl1ne\MultiselectField\Multiselect;
use App\Models\TaskManualField as TaskManualFieldModel;
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
            Boolean::make('is category required')->sortable(),
            Select::make('status')->options([
                'active' => 'Active',
                'inactive' => 'Inactive',
            ]),
            Select::make('type')->options([
                'auto' => 'Auto',
                'manual' => 'Manual',
            ])->displayUsingLabels()->sortable(),
            Boolean::make('requires description')->sortable()->dependsOn('type', function ($field, $request) {
                if ($request->type === 'manual') {
                    $field->show();
                } else {
                    $field->hide();
                }
            }),
            Boolean::make('requires instructions')->sortable()->dependsOn('type', function ($field, $request) {
                if ($request->type === 'manual') {
                    $field->show();
                } else {
                    $field->hide();
                }
            }), 
            Number::make('seconds to complete')->sortable()->dependsOn('type', function ($field, $request) {
                if ($request->type === 'manual') {
                    $field->show();
                } else {
                    $field->hide();
                }
            }),
            Multiselect::make('manual fields')->options(TaskManualFieldModel::all()->pluck('name', 'id'))->sortable()->dependsOn('type', function ($field, $request) {
                if ($request->type === 'manual') {
                    $field->show();
                } else {
                    $field->hide();
                }
            }),
            Number::make('reward point')->sortable(),
            Number::make('price per one point')->sortable(),
            Currency::make('price per one balance')->step(0.01)->sortable(),
            Number::make('min amount')->sortable(),
            Number::make('max amount')->sortable(),
            Code::make('credentials')->sortable(),
            Code::make('calculation_formula')->sortable(),
            Code::make('fields'),
            Text::make('service code')->sortable(),
            Currency::make('cost per unit')->step(0.01)->sortable(),
            HasMany::make('Tasks', 'tasks', Task::class)->onlyOnDetail()->sortable(),
            MorphMany::make('activity logs','activityLogs', ActivityLog::class)->sortable(),
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
