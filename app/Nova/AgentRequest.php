<?php

namespace App\Nova;

use Laravel\Nova\Nova;
use App\Models\AgentField;
use App\Models\ManualField;
use Laravel\Nova\Fields\ID;
use Illuminate\Http\Request;
use Laravel\Nova\Fields\Text;
use Laravel\Nova\Fields\Image;
use Laravel\Nova\Fields\Number;
use Laravel\Nova\Fields\Select;
use Laravel\Nova\Fields\HasOne;
use Laravel\Nova\Fields\BelongsTo;
use Laravel\Nova\Fields\MorphMany;
use Illuminate\Support\Facades\Storage;
use App\Models\Gateways as GatewaysModel;
use Laravel\Nova\Http\Requests\NovaRequest;
use App\Nova\Filters\AgentRequest\ClientFilter;
use App\Models\AgentRequest as AgentRequestModel;
use Bolechen\NovaActivitylog\Resources\ActivityLog;

class AgentRequest extends Resource
{
    /**
     * The model the resource corresponds to.
     *
     * @var class-string<\App\Models\AgentRequest>
     */
    public static $model = \App\Models\AgentRequest::class;

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
        'id','transaction_id','status','gateway_id','client_id','created_at','gateway.name','client.name','client.email'
    ];
    public $resouceid='';
    /**
     * Get the fields displayed by the resource.
     *
     * @param  \Laravel\Nova\Http\Requests\NovaRequest  $request
     * @return array
     */
     public static function indexQuery(NovaRequest $request, $query)
     {
        return $query->whereIn('gateway_id', json_decode(auth('admin')->user()->gateways, true));
     }
     public function fields(NovaRequest $request)
    {
        $model = $this->resource; // Access the model instance
        $gateway = GatewaysModel::find($model->gateway_id);
        if ($gateway && $gateway->agend_fields) {
            $agentFields = json_decode($gateway->agend_fields, true);
        } else {
            $agentFields = [];
        }
        
        $fieldsdata = [];
        $data = json_decode($this->resource->agent_fields, true);
        if ($data && $data != null) {
            foreach ($data as $key => $field) {
                $fieldsdata[$key] = $field['value'];
            }
        }
        
        $layouts = collect($agentFields)->map(function ($field) use ($fieldsdata) {
            $field = ManualField::find($field);
            $rules = $field->required ? 'required' : 'nullable'; // Define rules

            $fieldName = str_replace(' ', '_', $field->NameEn);
            $defaultValue = $fieldsdata[$fieldName] ?? '';

            return match ($field->type) {
                'text' => Text::make($field->NameEn, $fieldName)
                              ->rules($rules) // Apply rules
                              ->onlyOnForms()
                              ->resolveUsing(fn() => $defaultValue), // Use resolveUsing for edit
                'number' => Number::make($field->NameEn, $fieldName)
                                ->rules($rules) // Apply rules
                                ->onlyOnForms()
                                ->resolveUsing(fn() => $defaultValue), // Use resolveUsing for edit
                'image' => Image::make($field->NameEn, $fieldName)
                                ->disk('public')
                                ->rules($rules) // Apply rules
                                ->onlyOnForms()
                                ->default($defaultValue), // Set default value
            };
        });

        return array_merge([
            ID::make()->sortable(),
            BelongsTo::make('Transaction', 'transaction', Transaction::class)
                     ->display(fn($transaction) => $transaction->tnx)
                     ->readonly(),
            BelongsTo::make('Gateway', 'gateway', Gateways::class)
                     ->display(fn($gateway) => $gateway->name)
                     ->readonly(),
            BelongsTo::make('Client', 'client', Client::class)
                     ->display(fn($client) => $client->name)
                     ->readonly(),
            Select::make('Status', 'status')->options([
                'pending' => 'Pending',
                'approved' => 'Approved',
                'rejected' => 'Rejected',
            ])->onlyOnForms(),
            Text::make('Status', function () {
                $colors = [
                    'pending' => 'orange',
                    'approved' => 'green',
                    'rejected' => 'red',
                ];
                $color = $colors[$this->status] ?? 'black';
                return "<span style='background-color: {$color}; color: white; padding: 2px 5px; border-radius: 3px;'>{$this->status}</span>";
            })->asHtml()->hideWhenCreating()->hideWhenUpdating()->sortable(),
            MorphMany::make('Activity', 'activityLogs', ActivityLog::class)->sortable(),
            HasOne::make('Transaction', 'transaction', Transaction::class)->onlyOnDetail(),
            Text::make('Agent Fields', 'agent_fields')
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
            ...$layouts->toArray()
        ]);
    }
    public static function fillForUpdate (NovaRequest $request, $model)
    {
        $modelNew = AgentRequestModel::find($model->id);
        if (!$modelNew) {
            throw new \Exception("Model not found");
        }
        $data = $request->all();
        $gateway = GatewaysModel::find($data['gateway']);
        if (!$gateway) {
            throw new \Exception("Gateway not found");
        }

        if ($gateway->agend_fields) {
            $agentFields = json_decode($gateway->agend_fields, true);
            $agentFields = array_map(function($field) {
                $manualField = ManualField::find($field);
                if (!$manualField) {
                    throw new \Exception("Manual field not found");
                }
                return [
                    'name' => str_replace(' ', '_', $manualField->nameEn),
                    'type' => $manualField->type
                ];
            }, $agentFields);
        } else {
            $agentFields = [];
        }
        
        $agentFieldsData = [];
        foreach ($agentFields as $field) {
            $fieldName = $field['name'];
            if ($field['type'] == 'image' && $request->hasFile($fieldName)) {
                // Store the image and save the path in the JSON
                $agentFieldsData[$fieldName] = Storage::disk('public')->putFileAs(
                    'attachments/private/agentrequests', 
                    $request->file($fieldName), 
                    $request->file($fieldName)->getClientOriginalName()
                );
                unset($request[$fieldName]);
                unset($model->{$fieldName});
            } else {
                $agentFieldsData[$fieldName] = [
                    'type' => $field['type'],
                    'value' => $request->{$fieldName}
                ];
                unset($request[$fieldName]);
            }
        }
        if($request->status=='approved'){
            $model->transaction->update(['status' => 'success']);
            $model->client->update(['balance' => $model->client->balance + $model->transaction->amount]);
        }elseif($request->status=='rejected'){
            $model->transaction->update(['status' => 'failed']);
        }
        $modelNew->status = $request->status;
        $modelNew->agent_fields = json_encode($agentFieldsData);
        $modelNew->save();
        return [$modelNew, []];
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
            new ClientFilter
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
    public static function authorizedToCreate(Request $request)
    {
        return false;
    }
}
