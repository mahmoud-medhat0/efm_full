<?php

namespace App\Nova;

use Laravel\Nova\Fields\ID;
use Illuminate\Http\Request;
use Laravel\Nova\Fields\MorphMany;
use Spatie\NovaTranslatable\Translatable;
use Laravel\Nova\Http\Requests\NovaRequest;
use Murdercode\TinymceEditor\TinymceEditor;
use Bolechen\NovaActivitylog\Resources\ActivityLog;

class Term extends Resource
{
    /**
     * The model the resource corresponds to.
     *
     * @var class-string<\App\Models\Term>
     */
    public static $model = \App\Models\Term::class;

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
                TinymceEditor::make('terms'),
            ]),
            MorphMany::make('activityLogs','activityLogs', ActivityLog::class),
        ];
    }
    public static function authorizedToCreate(Request $request)
    {
        return false;
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
