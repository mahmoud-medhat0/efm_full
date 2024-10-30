<?php

namespace App\Nova;

use Laravel\Nova\Fields\ID;
use Illuminate\Http\Request;
use Laravel\Nova\Fields\Text;
use Laravel\Nova\Fields\Image;
use Laravel\Nova\Fields\Select;
use Laravel\Nova\Fields\Boolean;
use Laravel\Nova\Fields\HasMany;
use Laravel\Nova\Fields\Currency;
use Laravel\Nova\Fields\MorphMany;
use Spatie\NovaTranslatable\Translatable;
use Laravel\Nova\Http\Requests\NovaRequest;
use Murdercode\TinymceEditor\TinymceEditor;
use Naif\ToggleSwitchField\ToggleSwitchField;
use Bolechen\NovaActivitylog\Resources\ActivityLog;

class Gateways extends Resource
{
    /**
     * The model the resource corresponds to.
     *
     * @var class-string<\App\Models\Gateways>
     */
    public static $model = \App\Models\Gateways::class;

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
        'id','name','min_deposit','max_deposit','min_withdraw','max_withdraw','charge_type_deposit','charge_deposit','charge_type_withdraw','charge_withdraw','target_deposit','description_withdraw','class_name'
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
            Translatable::make([
                Text::make('Name')->sortable(),
            ]),
            Image::make('Logo')->sortable(),
            ToggleSwitchField::make('Is Active', 'is_active')->sortable(),
            ToggleSwitchField::make('Attachment', 'attachment')->default(false)->sortable(),
            Boolean::make('Auto', 'auto')->default(false)->sortable(),
            Boolean::make('Deposit', 'deposit')->default(false)->sortable(),
            Boolean::make('Withdraw', 'withdraw')->default(false)->sortable(),
            Currency::make('Minimum Deposit', 'min_deposit')->dependsOn('deposit', function (Currency $field, NovaRequest $request) {
                if ($request->deposit) {
                    $field->show();
                } else {
                    $field->hide();
                }
            })->sortable(),
            Currency::make('Maximum Deposit', 'max_deposit')->dependsOn('deposit', function (Currency $field, NovaRequest $request) {
                if ($request->deposit) {
                    $field->show();
                } else {
                    $field->hide();
                }
            })->sortable(),
            Currency::make('Minimum Withdraw', 'min_withdraw')->dependsOn('withdraw', function (Currency $field, NovaRequest $request) {
                if ($request->withdraw) {
                    $field->show();
                } else {
                    $field->hide();
                }
            })->sortable(),
            Currency::make('Maximum Withdraw', 'max_withdraw')->dependsOn('withdraw', function (Currency $field, NovaRequest $request) {
                if ($request->withdraw) {
                    $field->show();
                } else {
                    $field->hide();
                }
            })->sortable(),
            Select::make('Charge Type Deposit', 'charge_type_deposit')->dependsOn('deposit', function (Select $field, NovaRequest $request) {
                if ($request->deposit) {
                    $field->show();
                } else {
                    $field->hide();
                }
            })->options([
                'percentage' => 'Percentage',
                'fixed' => 'Fixed',
            ]),
            Currency::make('Charge Deposit', 'charge_deposit')->dependsOn('deposit', function (Currency $field, NovaRequest $request) {
                if ($request->deposit) {
                    $field->show();
                } else {
                    $field->hide();
                }
            })->sortable(),
            Select::make('Charge Type Withdraw', 'charge_type_withdraw')->dependsOn('withdraw', function (Select $field, NovaRequest $request) {
                if ($request->withdraw) {
                    $field->show();
                } else {
                    $field->hide();
                }
            })->options([
                'percentage' => 'Percentage',
                'fixed' => 'Fixed',
            ]),
            Currency::make('Charge Withdraw', 'charge_withdraw')->dependsOn('withdraw', function (Currency $field, NovaRequest $request) {
                if ($request->withdraw) {
                    $field->show();
                } else {
                    $field->hide();
                }
            })->sortable(),
            Text::make('Target Deposit', 'target_deposit')->sortable(),
            Translatable::make([
                TinymceEditor::make('Description Deposit', 'description_deposit')->options(['init' => ['language' => app()->getLocale()]])->dependsOn('deposit', function (TinymceEditor $field, NovaRequest $request) {
                    if ($request->deposit) {
                        $field->show();
                    } else {
                        $field->hide();
                    }
                }),
            ]),
            Translatable::make([
                TinymceEditor::make('Description Withdraw', 'description_withdraw')->options(['init' => ['language' => app()->getLocale()]])->dependsOn('withdraw', function (TinymceEditor $field, NovaRequest $request) {
                    if ($request->withdraw) {
                        $field->show();
                } else {
                    $field->hide();
                    }
                }),
            ]),
            Text::make('Class Name', 'class_name')->dependsOn('auto', function (Text $field, NovaRequest $request) {
                if ($request->auto) {
                    $field->show();
                } else {
                    $field->hide();
                }
            })->sortable(),
            HasMany::make('Withdraw Accounts', 'withdrawAccounts', WithdrawAccount::class)->sortable(),
            HasMany::make('Transactions', 'transactions', Transaction::class)->sortable(),
            MorphMany::make('Activity Log', 'activityLogs', ActivityLog::class)->sortable(),
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
