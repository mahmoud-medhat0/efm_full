<?php

namespace App\Nova;

use Laravel\Nova\Fields\ID;
use Illuminate\Http\Request;
use Laravel\Nova\Fields\Text;
use Laravel\Nova\Fields\Select;
use Laravel\Nova\Fields\BelongsTo;
use Laravel\Nova\Http\Requests\NovaRequest;
use Efm\Ticketmessagecard\Ticketmessagecard;
use Bolechen\NovaActivitylog\Resources\ActivityLog;
use Laravel\Nova\Fields\MorphMany;
class Ticket extends Resource
{
    /**
     * The model the resource corresponds to.
     *
     * @var class-string<\App\Models\Ticket>
     */
    public static $model = \App\Models\Ticket::class;

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
        'id','ticket_id'
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
            Text::make('Ticket ID')->sortable(),
            Text::make('Title')->sortable(),
            Select::make('Status')->options([
                'open' => 'Open',
                'pending' => 'Pending',
                'closed' => 'Closed',
                'completed' => 'Completed',
            ])->sortable()->onlyOnForms(),
            Text::make('Status','status')->displayUsing(function($status){
                $statusColors = [
                    'open' => 'bg-green-500 text-white',
                    'pending' => 'bg-yellow-500 text-white',
                    'closed' => 'bg-red-500 text-white',
                    'completed' => 'bg-blue-500 text-white',
                ];
                $colorClass = $statusColors[$status] ?? 'bg-gray-500 text-white';
                return "<span class=\"{$colorClass} px-2 py-1 rounded\">" . ucfirst($status) . "</span>";
            })->asHtml()->hideWhenCreating()->hideWhenUpdating(),
            BelongsTo::make('Ticket Category')->sortable()->displayUsing(function($ticketCategory){
                return $ticketCategory->name;
            }),
            BelongsTo::make('Client')->sortable()->displayUsing(function($client){
                return $client->name;
            }),
            MorphMany::make('Activity Logs', 'activityLogs', ActivityLog::class)->sortable(),
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
        return [
            (new Ticketmessagecard)->withMeta(['client_resource_url' => '/resources/clients'])->onlyOnDetail(),
        ];
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
