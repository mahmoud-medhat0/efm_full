<?php

namespace App\Nova;

use Illuminate\Http\Request;
use Laravel\Nova\Fields\ID;
use Laravel\Nova\Http\Requests\NovaRequest;
use Laravel\Nova\Fields\Select;
use Laravel\Nova\Fields\BelongsTo;
use Laravel\Nova\Fields\URL;
use Laravel\Nova\Fields\Number;
use Laravel\Nova\Fields\Currency;
use Laravel\Nova\Fields\Text;
use Laravel\Nova\Fields\DateTime;
use Laravel\Nova\Fields\HasMany;
use Bolechen\NovaActivitylog\Resources\ActivityLog;
use Illuminate\Database\Eloquent\Model;
use App\Jobs\GenerateOrderTasks;
use Laravel\Nova\Fields\BelongsToMany;
use Laravel\Nova\Fields\Code;
class Order extends Resource
{
    /**
     * The model the resource corresponds to.
     *
     * @var class-string<\App\Models\Order>
     */
    public static $model = \App\Models\Order::class;

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
            Select::make('status')->options([
                'pending' => 'Pending',
                'approved' => 'Approved',
                'rejected' => 'Rejected',
                'completed' => 'Completed',
                'in_progress' => 'In Progress',
            ]),
            BelongsTo::make('ApprovedBy', 'ApprovedBy', User::class)->displayUsing(function ($approvedBy) {
                return $approvedBy->name;
            })->hideWhenCreating()->hideWhenUpdating(),
            BelongsTo::make('Provider Client', 'provider', Client::class)->displayUsing(function ($provider) {
                return $provider->name;
            }),
            BelongsTo::make('service')->displayUsing(function ($service) {
                return $service->name;
            }),
            BelongsTo::make('RejectionCause')->displayUsing(function ($rejectionCause) {
                return $rejectionCause->name;
            })->dependsOn('status', function ($field, $request) {
                if ($request->status === 'rejected') {
                    $field->show();
                    $field->creationRules('required');
                    $field->updateRules('required');
                } else {
                    $field->hide();
                    $field->creationRules('nullable');
                    $field->updateRules('nullable');
                }
            })->fillUsing(function ($request, $model) {
                if ($request->status === 'rejected') {
                    $model->rejection_cause_id = $request->rejectionCause;
                }
            })->nullable(), 
            URL::make('link'),
            Number::make('Target Amount','target_amount'),
            Number::make('Current Amount','current_amount')->readonly(),
            Currency::make('Price'),
            Text::make('Last Action','last_action')->hideWhenCreating()->readonly(),
            DateTime::make('Last Action At','last_action_at',)->readonly()->onlyOnDetail(),
            BelongsTo::make('Last Action By', 'LastActionBy', User::class)->displayUsing(function ($user) {
                return $user->name;
            })->readonly()->onlyOnDetail(),
            Code::make('Data','data')->readonly()->onlyOnDetail(),
            DateTime::make('created_at')->readonly()->onlyOnDetail(),
            DateTime::make('updated_at')->readonly()->onlyOnDetail(),
            BelongsToMany::make('Categories', 'categories', InterestCategory::class)->onlyOnDetail(),
            HasMany::make('Activity Log', 'activityLogs', ActivityLog::class)->onlyOnDetail(),
            HasMany::make('Tasks', 'tasks', Task::class)->onlyOnDetail(),
        ];
    }
    public static function afterUpdate(NovaRequest $request, Model $model)
    {
        $admin = auth(env('NOVA_GUARD'))->user();
        $model->last_action = $request->status;
        $model->last_action_at = now();
        $model->last_action_by = $admin->id;
        if ($request->status === 'rejected') {
            $model->rejection_cause_id = $request->rejectionCause;
        }elseif($request->status === 'approved'){
            $model->approved_by = $admin->id;
            if($model->tasks->isEmpty()){
                GenerateOrderTasks::dispatch($model)->onQueue('default');
            }
        }else{
            $model->rejection_cause_id = null;
        }
        $model->save();
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
