<?php

namespace App\Nova;

use Carbon\Carbon;
use Laravel\Nova\Fields\ID;
use Illuminate\Http\Request;
use Laravel\Nova\Fields\Text;
use Laravel\Nova\Fields\Image;
use Laravel\Nova\Fields\Select;
use Laravel\Nova\Fields\Currency;
use Laravel\Nova\Fields\DateTime;
use Laravel\Nova\Fields\BelongsTo;
use Laravel\Nova\Fields\MorphMany;
use App\Nova\Actions\SetStatusSuccess;
use Illuminate\Support\Facades\Storage;
use App\Nova\Actions\SetStatusCancelled;
use Laravel\Nova\Http\Requests\NovaRequest;
use App\Nova\Filters\Transaction\TypeFilter;
use App\Nova\Filters\Transaction\ClientFilter;
use App\Nova\Filters\Transaction\StatusFilter;
use App\Nova\Filters\Transaction\GatewayFilter;
use App\Nova\Filters\Transaction\TxnTypeFilter;
use Bolechen\NovaActivitylog\Resources\ActivityLog;
use App\Nova\Filters\Transaction\CreatedAtEndFilter;
use App\Nova\Filters\Transaction\CreatedAtStartFilter;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Resource
{
    /**
     * The model the resource corresponds to.
     *
     * @var class-string<\App\Models\Transaction>
     */
    public static $model = \App\Models\Transaction::class;

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
        'id','type','status','tnx_type','tnx','note','description','amount','fee','total','created_at','gateway.name','client.name','client.email','admin.name'
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
            Select::make('Type')->options([
                'deposit' => 'Deposit',
                'withdrawal' => 'Withdrawal',
                'transfer' => 'Transfer',
                'refund' => 'Refund',
                'fee' => 'Fee',
                'subtract' => 'Subtract',
                'referral' => 'Referral',
            ])->sortable(),
            Select::make('Status')->options([
                'pending' => 'Pending',
                'success' => 'Success',
                'failed' => 'Failed',
                'cancelled' => 'Cancelled',
            ])->onlyOnForms(),
            Text::make('Status', function () {
                $colors = [
                    'pending' => 'orange',
                    'success' => 'green',
                    'failed' => 'red',
                    'cancelled' => 'gray',
                ];
                $color = $colors[$this->status] ?? 'black';
                return "<span style='background-color: {$color}; color: white; padding: 2px 5px; border-radius: 3px;'>{$this->status}</span>";
            })->asHtml()->hideWhenCreating()->hideWhenUpdating()->sortable(),
            Select::make('tnx_type')->options([
                'add' => 'Add',
                'subtract' => 'Subtract',
            ])->onlyOnForms(),
            Text::make('Tnx Type', function () {
                $colors = [
                    'add' => 'green',
                    'subtract' => 'red',
                ];
                $color = $colors[$this->tnx_type] ?? 'red';
                $text = $this->tnx_type == 'add' ? 'Add' : 'Subtract';
                return "<span style='background-color: {$color}; color: white; padding: 2px 5px; border-radius: 3px;'>{$text}</span>";
            })->asHtml()->hideWhenCreating()->hideWhenUpdating()->sortable(),
            Text::make('Tnx')->readonly()->sortable(),
            Text::make('Note')->sortable(),
            Text::make('Invoice ID')->sortable(),
            Text::make('Invoice Key')->sortable(),
            Text::make('Payment Method')->sortable(),
            Text::make('Reference Number')->sortable(),
            Text::make('Description')->sortable(),
            Currency::make('Amount')->displayUsing(function ($amount) {
                return $amount . ' ' . 'EGP';
            })->sortable(),
            Currency::make('Fee')->displayUsing(function ($fee) {
                return $fee . ' ' . 'EGP';
            })->sortable(),
            Currency::make('Total')->displayUsing(function ($total) {
                return $total . ' ' . 'EGP';
            })->sortable(),
            Image::make('Attachment')->disk('public')->path('attachments')->displayUsing(function ($attachment) {
                return $attachment ? Storage::disk('public')->url('attachments/' . $attachment) : 'No Attachment';
            })->sortable(),
            Text::make('Manual Fields', 'manual_fields')
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
            DateTime::make('Created At')->sortable(),
            Text::make('Time Ago', function ($transaction) {
                return Carbon::parse($transaction->created_at)->diffForhumans();
            })->sortable(),
            BelongsTo::make('Gateway', 'gateway', Gateways::class)->displayUsing(function ($gateway) {
                return $gateway->name;
            })->sortable()->rules('nullable'),
            BelongsTo::make('Client', 'client', Client::class)->displayUsing(function ($client) {
                return $client->name;
            })->sortable(),
            BelongsTo::make('Admin', 'admin', User::class)->displayUsing(function ($admin) {
                return $admin->name;
            })->sortable()->rules('nullable'),
            MorphMany::make('Activity', 'activityLogs', ActivityLog::class)->sortable(),
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
        return [
            new StatusFilter,
            new ClientFilter,
            new TypeFilter,
            new TxnTypeFilter,
            new CreatedAtStartFilter,
            new CreatedAtEndFilter,
            new GatewayFilter,
        ];
    }

    public static function afterCreate(NovaRequest $request, Model $model)
    {
        if($model->status=='success'){
            if($model->tnx_type=='add'){
                $model->client->update(['balance' => $model->client->balance + $model->amount]);
            }else{
                $model->client->update(['balance' => $model->client->balance - $model->amount]);
            }
        }
    }
    public static function afterUpdate(NovaRequest $request, Model $model)
    {
        if($model->status=='success'){
            if($model->tnx_type=='add'){
                $model->client->update(['balance' => $model->client->balance + $model->amount]);
            }else{
                $model->client->update(['balance' => $model->client->balance - $model->amount]);
            }
        }elseif($model->status=='failed' || $model->status=='cancelled'){
            if($model->agentRequest!=null){
                $model->agentRequest->update(['status' => 'rejected']);
            }
        }
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
        return [
            (new SetStatusSuccess)->canSee(function ($request) {
                return auth('admin')->user()->can('ApproveTransaction');
            }),
            (new SetStatusCancelled)->canSee(function ($request) {
                return auth('admin')->user()->can('RejectTransaction');
            }),
        ];
    }
}
