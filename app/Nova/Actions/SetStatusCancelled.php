<?php

namespace App\Nova\Actions;

use App\Models\TransactionRejectionCause;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Collection;
use Laravel\Nova\Actions\Action;
use Laravel\Nova\Fields\ActionFields;
use Laravel\Nova\Http\Requests\NovaRequest;
use Laravel\Nova\Fields\Select;
class SetStatusCancelled extends Action
{
    use InteractsWithQueue, Queueable;

    /**
     * Perform the action on the given models.
     *
     * @param  \Laravel\Nova\Fields\ActionFields  $fields
     * @param  \Illuminate\Support\Collection  $models
     * @return mixed
     */
    public function handle(ActionFields $fields, Collection $models)
    {
        $reason = TransactionRejectionCause::find($fields->reason);
        foreach ($models as $model) {
            if($model->status != 'cancelled'){
                $model->update(['status' => 'cancelled', 'rejection_cause_id' => $reason->id]);
            }
            if($model->tnx_type == 'sub' && $model->status == 'cancelled'){
                $model->client->update(['balance' => $model->client->balance + $model->amount]);
            }
            if($model->agentRequest){
                $model->agentRequest->update(['status' => 'cancelled']);
            }
        }
        return Action::message('Status Updated to Cancelled.');
    }

    /**
     * Get the fields available on the action.
     *
     * @param  \Laravel\Nova\Http\Requests\NovaRequest  $request
     * @return array
     */
    public function fields(NovaRequest $request)
    {
        return [
            Select::make('Reason', 'reason')
                ->options(TransactionRejectionCause::all()->pluck('name', 'id')),
        ];
    }
}
