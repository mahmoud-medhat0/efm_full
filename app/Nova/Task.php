<?php

namespace App\Nova;

use Laravel\Nova\Fields\ID;
use Illuminate\Http\Request;
use Laravel\Nova\Fields\Text;
use Laravel\Nova\Fields\Number;
use Laravel\Nova\Fields\Select;
use Laravel\Nova\Fields\Boolean;
use Laravel\Nova\Fields\HasMany;
use Laravel\Nova\Fields\BelongsTo;
use Laravel\Nova\Fields\MorphMany;
use App\Nova\Filters\Task\PaidFilter;
use App\Nova\Filters\Task\OrderFilter;
use App\Nova\Filters\Task\ClientFilter;
use App\Nova\Filters\Task\StatusFilter;
use Illuminate\Support\Facades\Storage;
use App\Nova\Filters\Task\ServiceFilter;
use Laravel\Nova\Http\Requests\NovaRequest;
use Naif\ToggleSwitchField\ToggleSwitchField;
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
        'id','status','points_reward','link','ip','user_agent','country','order.order_id','client.name','service.name','banAttemps.cause'
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
                'under_review' => 'Under Review',
                'expired' => 'Expired',
            ])->sortable()->displayUsingLabels(),
            ToggleSwitchField::make('Paid', 'paid')->sortable(),
            Boolean::make('Removed', 'removed')->sortable(),
            Number::make('Points Reward', 'points_reward')->step(0.01)->default(0)->sortable(),
            Text::make('Link', 'link')->readonly()->sortable(),
            Text::make('IP', 'ip')->readonly()->sortable(),
            Text::make('User Agent', 'user_agent')->readonly()->sortable(),
            Text::make('Country', 'country')->readonly()->sortable(),
            Text::make('Data', 'data')
                ->displayUsing(function ($value) {
                    $output = '';
                    if ($value) {
                        $fields = json_decode($value, true);
                        foreach ($fields as $key => $field) {
                            if ($field['type'] === 'image') {
                                $output .= "<div><strong>{$key}:</strong> <img src='" . Storage::disk('public')->url($field['value']) . "' alt='{$key}' style='max-width: 100px;'></div>";
                            } else {
                                $output .= "<div><strong>{$key}:</strong> {$field['value']}</div>";
                            }
                        }
                    }
                    return $output;
                })
                ->asHtml()
                ->onlyOnDetail(),
            BelongsTo::make('Order', 'order', Order::class)->displayUsing(function ($order) {
                return $order->order_id;
            })->sortable(),
            BelongsTo::make('Client', 'client', Client::class)->displayUsing(function ($client) {
                return $client->name;
            })->sortable(),
            BelongsTo::make('Service', 'service', Service::class)->displayUsing(function ($service) {
                return $service->name;
            })->sortable(),
            HasMany::make('Ban Attemps', 'banAttemps', BanAttemp::class)->sortable(),
            MorphMany::make('Activity Logs', 'activityLogs', ActivityLog::class)->sortable(),
        ];
    }
    public static function afterUpdateValidation(NovaRequest $request, $model)
    {
        if($model->status == 'completed'){
        Transaction::create([
            'status' => 'success',
            'amount' => $model->points_reward,
            'fee' => 0,
            'total' => $model->points_reward,
            'tnx_type' => 'add',
            'tnx' => 'PTS' . time(),
                'type' => 'points',
                'description' => 'Points reward for task of Order ID: ' . $model->order->order_id,
                'client_id' => $model->client_id,
            ]);
            $model->paid = true;
            $model->points_reward = $model->points_reward;
            $model->save();
            $model->client->increment('balance', $model->points_reward);
        }
        elseif($model->status == 'failed'){
            $model->order->decrement('current_amount');
            $model->removed = true;
            $model->save();
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
            new StatusFilter,
            new PaidFilter,
            new OrderFilter,
            new ClientFilter,
            new ServiceFilter,
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
