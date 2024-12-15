<?php

namespace App\Nova\Actions\Tasks;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Collection;
use Laravel\Nova\Actions\Action;
use Laravel\Nova\Fields\ActionFields;
use Laravel\Nova\Http\Requests\NovaRequest;
use App\Models\Transaction as TransactionModel;
class ApproveTasks extends Action
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
        foreach ($models as $model) {
            $model->update(['status' => 'completed','paid' => true,'points_reward' => $model->reward()]);
            $model->client->increment('balance', $model->reward());
            TransactionModel::create([
                'status' => 'success',
                'amount' => $model->reward(),
                'fee' => 0,
                'total' => $model->reward(),
                'tnx_type' => 'add',
                'tnx' => 'PTS' . time(),
                'type' => 'points',
                'description' => 'Points reward for task of Order ID: ' . $model->order->order_id,
                'client_id' => $model->client->id,
            ]);
        }
    }

    /**
     * Get the fields available on the action.
     *
     * @param  \Laravel\Nova\Http\Requests\NovaRequest  $request
     * @return array
     */
    public function fields(NovaRequest $request)
    {
        return [];
    }
}
