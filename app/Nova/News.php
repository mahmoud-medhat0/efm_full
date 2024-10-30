<?php

namespace App\Nova;

use Laravel\Nova\Fields\ID;
use Illuminate\Http\Request;
use Laravel\Nova\Fields\Text;
use Laravel\Nova\Fields\DateTime;
use Spatie\NovaTranslatable\Translatable;
use Laravel\Nova\Http\Requests\NovaRequest;
use Murdercode\TinymceEditor\TinymceEditor;
use Laravel\Nova\Fields\MorphMany;
use Bolechen\NovaActivitylog\Resources\ActivityLog;

class News extends Resource
{
    /**
     * The model the resource corresponds to.
     *
     * @var class-string<\App\Models\News>
     */
    public static $model = \App\Models\News::class;

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
        'id','title','description','published_at'
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
                Text::make('title')->sortable(),
                TinymceEditor::make('description')->options(['init' => ['language' => app()->getLocale()]])->sortable(),
            ]),
            DateTime::make('published_at')->default(now())->sortable(),
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
