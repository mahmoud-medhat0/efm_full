<?php

namespace App\Nova;

use Carbon\Carbon;
use Laravel\Nova\Fields\ID;
use Illuminate\Http\Request;
use Laravel\Nova\Fields\Date;
use Laravel\Nova\Fields\Text;
use Laravel\Nova\Fields\HasOne;
use Laravel\Nova\Fields\Number;
use Laravel\Nova\Fields\Select;
use Laravel\Nova\Fields\Boolean;
use Laravel\Nova\Fields\HasMany;
use App\Models\Task as TaskModel;
use Laravel\Nova\Fields\DateTime;
use Laravel\Nova\Fields\BelongsTo;
use Laravel\Nova\Fields\MorphMany;
use App\Models\Order as OrderModel;
use App\Models\Client as ClientModel;
use App\Nova\Filters\Task\PaidFilter;
use App\Nova\Filters\Task\OrderFilter;
use App\Nova\Filters\Task\ClientFilter;
use App\Nova\Filters\Task\StatusFilter;
use Illuminate\Support\Facades\Storage;
use App\Nova\Actions\Tasks\ApproveTasks;
use App\Nova\Filters\Task\ServiceFilter;
use Laravel\Nova\Http\Requests\NovaRequest;
use Naif\ToggleSwitchField\ToggleSwitchField;
use App\Models\Transaction as TransactionModel;
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
                'cancelled' => 'Cancelled',
            ])->sortable()->displayUsingLabels(),
            Text::make('Under Review Date', 'under_review_date')->sortable()->displayUsing(function ($value) {
                return $value ? Carbon::parse($value)->format('Y-m-d h:i:s A') : '-';
            }),
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
            BelongsTo::make('Rejection Causes', 'rejectionCause', TaskRejectionCause::class)->displayUsing(function ($rejectionCause) {
                return $rejectionCause->name;
            })->sortable()->nullable(),
        ];
    }
    protected static function afterUpdateValidation(NovaRequest $request, $validator)
    {
        if($request->status == 'failed'){
            if (is_null($request->rejectionCause)) {
                throw new \Exception('Rejection cause is required when the status is failed');
            }
            else{
                OrderModel::find($request->order)->decrement('current_amount');
            }
        }
        if($request->status == 'completed'){
            $client = ClientModel::find($request->client);
            $task = TaskModel::find($request->resourceId);
            TransactionModel::create([
                'status' => 'success',
                'amount' => $task->reward(),
                'fee' => 0,
                'total' => $task->reward(),
                'tnx_type' => 'add',
                'tnx' => 'PTS' . time(),
                'type' => 'points',
                'description' => 'Points reward for task of Order ID: ' . $task->order->order_id,
                'client_id' => $client->id,
            ]);
            $task->update(['paid' => true, 'points_reward' => $task->reward()]);
            $client->increment('balance', $task->reward());
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
        $actions = [];
        if(auth()->user()->hasPermissionTo('Approve Tasks')){
            $actions[] = new ApproveTasks;
        }
        return $actions;
    }
}
