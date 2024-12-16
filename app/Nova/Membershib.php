<?php

namespace App\Nova;

use Laravel\Nova\Fields\ID;
use Illuminate\Http\Request;
use Laravel\Nova\Fields\Text;
use Laravel\Nova\Fields\Number;
use Laravel\Nova\Fields\Boolean;
use Laravel\Nova\Fields\Currency;
use Laravel\Nova\Http\Requests\NovaRequest;
use Laravel\Nova\Fields\Select;
use Outl1ne\MultiselectField\Multiselect;
use App\Models\LevelReferralCommision as LevelReferralCommisionModel;
class Membershib extends Resource
{
    /**
     * The model the resource corresponds to.
     *
     * @var class-string<\App\Models\Membershib>
     */
    public static $model = \App\Models\Membershib::class;

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
        'id','name','price','period_type','period_count','referral_same'
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
            Boolean::make('Is Active')->sortable(),
            Text::make('Name')->sortable(),
            Select::make('Is Lifetime')->options([
                '1' => 'Yes',
                '0' => 'No',
            ])->sortable()->displayUsingLabels(),
            Number::make('Days')->dependsOn('is_lifetime', function (Number $field, NovaRequest $request) {
                if ($request->is_lifetime === 1) {
                    $field->hide();
                } else {
                    $field->show();
                }
            })->sortable(),
            Currency::make('Price')->sortable(),
            Select::make('Period Type')->options([
                'day' => 'Day',
                'week' => 'Week',
                'month' => 'Month',
                'year' => 'Year',
            ])->sortable()->dependsOn('is_lifetime', function (Select $field, NovaRequest $request) {
                if ($request->is_lifetime==1) {
                    $field->hide();
                } else {
                    $field->show();
                }
            }),
            Number::make('Period Count')->dependsOn('period_type', function (Number $field, NovaRequest $request) {
                if ($request->period_type) {
                    $field->show();
                } else {
                    $field->hide();
                }
            })->sortable()->dependsOn('period_type', function (Number $field, NovaRequest $request) {
                if ($request->period_type) {
                    $field->show();
                } else {
                    $field->hide();
                }
            }),
            Multiselect::make('Level Referral Commision','level_referral_commission')->dependsOn('is_lifetime', function (Multiselect $field, NovaRequest $request) {
                if ($request->is_lifetime==0) {
                    $field->show();
                } else {
                    $field->hide();
                }
            })->options(LevelReferralCommisionModel::all()->pluck('name', 'id'))->sortable(),
            Boolean::make('Referral Same')->sortable(),
        ];
    }
    public static function afterCreateValidation(NovaRequest $request, $model)
    {
        if ($request->is_lifetime === 1) {
            $model->period_type = null;
            $model->period_count = null;
            // $model->is_lifetime = 1;
        } else {
            $model->period_type = $request->period_type;
            $model->period_count = $request->period_count;
            switch ($request->period_type) {
                case 'day':
                    $days = $request->period_count;
                    break;
                case 'week':
                    $days = $request->period_count * 7;
                    break;
                case 'month':
                    $days = $request->period_count * 30;
                    break;
                case 'year':
                    $days = $request->period_count * 365;
                    break;
                default:
                    $days = 0;
                    break;
            }
            $model->days = $days;
        }
        $model->save();
    }
    public static function afterUpdateValidation(NovaRequest $request, $model)
    {
        if ($request->is_lifetime === 1) {
            $model->period_type = null;
            $model->period_count = null;
            // $model->is_lifetime = 1;
        } else {
            $model->period_type = $request->period_type;
            $model->period_count = $request->period_count;
            switch ($request->period_type) {
                case 'day':
                    $days = $request->period_count;
                    break;
                case 'week':
                    $days = $request->period_count * 7;
                    break;
                case 'month':
                    $days = $request->period_count * 30;
                    break;
                case 'year':
                    $days = $request->period_count * 365;
                    break;
            }
            $request->merge(['days' => $days]);
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
