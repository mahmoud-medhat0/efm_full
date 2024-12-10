<?php

namespace App\Nova;

use DateInterval;
use Laravel\Nova\Fields\ID;
use Illuminate\Http\Request;
use Laravel\Nova\Fields\URL;
use Laravel\Nova\Fields\Code;
use Laravel\Nova\Fields\Text;
use Laravel\Nova\Fields\Number;
use Laravel\Nova\Fields\Select;
use App\Jobs\GenerateOrderTasks;
use Laravel\Nova\Fields\HasMany;
use Laravel\Nova\Fields\Currency;
use Laravel\Nova\Fields\DateTime;
use Laravel\Nova\Fields\BelongsTo;
use Alaouy\Youtube\Facades\Youtube;
use App\Models\Client as ClientModel;
use Laravel\Nova\Fields\BelongsToMany;
use App\Models\Service as ServiceModel;
use Illuminate\Database\Eloquent\Model;
use App\Nova\Filters\Order\StatusFilter;
use Laravel\Nova\Http\Requests\NovaRequest;
use Murdercode\TinymceEditor\TinymceEditor;
use App\Nova\Filters\Order\ApprovedByFilter;
use App\Nova\Filters\Order\ServiceFilter;
use App\Models\Transaction as TransactionModel;
use App\Nova\Filters\Order\ProvidorClientFilter;
use App\Nova\Filters\Order\RejectionCauseFilter;
use Bolechen\NovaActivitylog\Resources\ActivityLog;
use App\Models\ReferralSetting as ReferralSettingModel;

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
        'status',
        'ApprovedBy.name',
        'provider.name',
        'service.name',
        'RejectionCause.name',
        'link',
        'order_type',
        'target_amount',
        'current_amount',
        'Price',
        'last_action',
        'LastActionBy.name',
        'data',
        'created_at',
        'categories.name'
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
            ])->sortable(),
            BelongsTo::make('ApprovedBy', 'ApprovedBy', User::class)->displayUsing(function ($approvedBy) {
                return $approvedBy->name;
            })->hideWhenCreating()->hideWhenUpdating(),
            BelongsTo::make('Provider Client', 'provider', Client::class)->displayUsing(function ($provider) {
                return $provider->name . ' - ' . $provider->email;
            })->sortable()->searchable(),
            BelongsTo::make('service')->displayUsing(function ($service) {
                return $service->name;
            })->sortable(),
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
            Select::make('order_type')->options([
                'full_time' => 'Full Time',
                'custom_time' => 'Custom Time',
            ])->sortable(),
            Number::make('time_start')->onlyOnForms()->dependsOn('order_type', function ($field, $request) {
                if ($request->order_type === 'custom_time') {
                    $field->show();
                } else {
                    $field->hide();
                }
            }),
            Number::make('time_end')->onlyOnForms()->dependsOn('order_type', function ($field, $request) {
                if ($request->order_type === 'custom_time') {
                    $field->show();
                } else {
                    $field->hide();
                }
            }),
            TinymceEditor::make('description')->dependsOn(['service'], function ($field, $request) {
                $service = ServiceModel::find($request->service);
                if ($service && $service->type === 'manual') {
                    $field->show();
                } else {
                    $field->hide();
                }
            }),
            TinymceEditor::make('instructions')->dependsOn('service', function ($field, $request) {
                $service = ServiceModel::find($request->service);
                if ($service && $service->type === 'manual') {
                    $field->show();
                } else {
                    $field->hide();
                }
            }),
            Number::make('Target Amount', 'target_amount')->sortable(),
            Number::make('Current Amount', 'current_amount')->readonly()->sortable(),
            Currency::make('Price')->displayUsing(function ($value, $resource, $attribute) {
                return number_format($resource->price, 2);
            })->sortable(),
            Text::make('Last Action', 'last_action')->hideWhenCreating()->readonly()->sortable(),
            DateTime::make('Last Action At', 'last_action_at',)->readonly()->onlyOnDetail()->sortable(),
            BelongsTo::make('Last Action By', 'LastActionBy', User::class)->displayUsing(function ($user) {
                return $user->name;
            })->readonly()->onlyOnDetail()->sortable(),
            Code::make('Data', 'data')->readonly()->onlyOnDetail()->sortable(),
            DateTime::make('created_at')->readonly()->onlyOnDetail()->sortable(),
            DateTime::make('updated_at')->readonly()->onlyOnDetail()->sortable(),
            BelongsToMany::make('Categories', 'categories', InterestCategory::class)->onlyOnDetail()->sortable(),
            HasMany::make('Activity Log', 'activityLogs', ActivityLog::class)->onlyOnDetail()->sortable(),
            HasMany::make('Tasks', 'tasks', Task::class)->onlyOnDetail()->sortable(),
        ];
    }
    protected static function afterUpdateValidation(NovaRequest $request, $validator)
    {
        $service = ServiceModel::find($request->service);
        $provider = ClientModel::find($request->provider);
        if ($provider->balance < $request->price) {
            throw new \Exception('Insufficient balance');
            return;
        }
        TransactionModel::create([
            'amount' => $request->price,
            'fee' => 0,
            'total' => $request->price,
            'description' => 'Order from ' . $service->name,
            'tnx_type' => 'sub',
            'tnx' => 'ORD' . time(),
            'client_id' => $provider->id,
            'type' => 'order',
        ]);
        $provider->decrement('balance', $request->price);
    }
    public static function afterUpdate(NovaRequest $request, Model $model)
    {
        // dd($request->all());
        $admin = auth(env('NOVA_GUARD'))->user();
        $model->last_action = $request->status;
        $model->last_action_at = now();
        $model->last_action_by = $admin->id;
        if ($request->status === 'rejected') {
            $model->rejection_cause_id = $request->rejectionCause;
        } elseif ($request->status === 'approved') {
            $service = ServiceModel::find($request->service);
            if ($service->service_code === 'yt_videos') {
                $videoId = Youtube::parseVidFromURL($request->link);
                $video = Youtube::getVideoInfo($videoId);
                $interval = new DateInterval($video->contentDetails->duration);
                $minutes = ($interval->d * 24 * 60) + ($interval->h * 60) + $interval->i + number_format($interval->s / 60, 2);
                $price = $request->amount * ($minutes * json_decode($model->service->calculation_formula, true)['minute_cost']);
                $user = auth()->user();
                $thumbnail = $video->snippet->thumbnails->standard->url;
                $title = $video->snippet->title;
                foreach (json_decode($model->service->fields, true) as $field => $value) {
                    $orderdata[$field] = isset(${$field}) ? ${$field} : null;
                }
                $model->data = json_encode($orderdata);
            }
            $model->approved_by = $admin->id;
            if ($model->tasks->isEmpty()) {
                GenerateOrderTasks::dispatch($model)->onQueue('default');
            }
            $client_of_order = $model->provider;
            $client_of_order->decrement('balance', $model->price);
            $parent_of_client_of_order = $client_of_order->parent;
            if ($parent_of_client_of_order) {
                $referral_setting = ReferralSettingModel::where('is_active', true)->where('code', 'order_referral')->first();
                if ($referral_setting) {
                    if ($referral_setting->type === 'percentage') {
                        $bonus = $model->price * $referral_setting->value / 100;
                    } else {
                        $bonus = $referral_setting->value;
                    }
                    TransactionModel::create([
                        'amount' => $bonus,
                        'fee' => 0,
                        'total' => $bonus,
                        'tnx_type' => 'add',
                        'tnx' => 'ORD' . time(),
                        'type' => 'referral',
                        'description' => 'Referral bonus from ' . $model->service->name,
                        'client_id' => $parent_of_client_of_order->id,
                    ]);
                    $parent_of_client_of_order->increment('balance', $bonus);
                }
            }
        } else {
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
        return [
            new ApprovedByFilter,
            new StatusFilter,
            new ProvidorClientFilter,
            new ServiceFilter,
            new RejectionCauseFilter,
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
