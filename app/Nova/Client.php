<?php

namespace App\Nova;

use Naif\Toggle\Toggle;
use Laravel\Nova\Fields\ID;
use Illuminate\Http\Request;
use Laravel\Nova\Fields\URL;
use Laravel\Nova\Fields\Text;
use App\Nova\InterestCategory;
use Laravel\Nova\Fields\Email;
use Laravel\Nova\Fields\Number;
use Laravel\Nova\Fields\Select;
use Illuminate\Validation\Rules;
use Laravel\Nova\Fields\HasMany;
use Laravel\Nova\Fields\DateTime;
use Laravel\Nova\Fields\Password;
use Laravel\Nova\Fields\BelongsToMany;
use Outl1ne\MultiselectField\Multiselect;
use Laravel\Nova\Http\Requests\NovaRequest;
use Naif\ToggleSwitchField\ToggleSwitchField;
use App\Models\InterestCategory as InterestCategoryModel;
use Laravel\Nova\Fields\MorphMany;
use Bolechen\NovaActivitylog\Resources\ActivityLog;
use Laravel\Nova\Fields\Currency;
class Client extends Resource
{
    /**
     * The model the resource corresponds to.
     *
     * @var class-string<\App\Models\Client>
     */
    public static $model = \App\Models\Client::class;

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
            Text::make('Name', 'name'),
            Email::make('Email', 'email'),
            Currency::make('Balance', 'balance')->currency('USD')->onlyOnDetail()->displayUsing(function ($value, $resource, $attribute) {
                return number_format($resource->balance, 2);
            }),
            Number::make('Points', 'points')->onlyOnDetail(),
            DateTime::make('Email Verified At', 'email_verified_at')->readonly()->onlyOnDetail()->onlyOnPreview(),
            ToggleSwitchField::make('Email Verified', 'email_verified')->color('#3AB95A'),
            ToggleSwitchField::make('Active', 'is_active')->color('#3AB95A'),
            Text::make('Phone', 'phone'),
            Text::make('Username', 'username'),
            Select::make('Gender', 'gender')->options([
                'male' => 'Male',
                'female' => 'Female',
            ]),
            Text::make('Personal Number', 'personal_number'),
            Number::make('Telegram ID', 'telegram_id'),
            Text::make('Telegram Username', 'telegram_username'),
            ToggleSwitchField::make('Telegram Verified', 'telegram_verified')->color('#3AB95A'),
            DateTime::make('Telegram Verified At', 'telegram_verified_at')->readonly()->onlyOnDetail()->onlyOnPreview(),
            Password::make('Password')
                ->onlyOnForms()
                ->creationRules('required', Rules\Password::defaults())
                ->updateRules('nullable', Rules\Password::defaults()),
            Text::make('Session ID', 'session_kyc_id')->readonly(),
            Text::make('Session Status', 'session_kyc_status')->readonly(),
            URL::make('Session URL', 'kyc_url')->readonly(),
            ToggleSwitchField::make('KYC Verified', 'kyc_verified')->color('#3AB95A'),
            DateTime::make('KYC Verified At', 'kyc_verified_at')->readonly()->onlyOnDetail()->onlyOnPreview(),
            ToggleSwitchField::make('2FA Status', 'is_2a')->color('#3AB95A'),
            Multiselect::make('Interests')->fillUsing(function ($request, $model, $attribute) {
                $interests = $request->input($attribute);
                $model->interests()->sync($interests);
            })
                ->options(InterestCategoryModel::all()->pluck('name', 'id'))
                ->saveAsJSON(false) // Ensures it saves as a relationship
                ->placeholder('Select interests')->showOnCreating()->showOnUpdating()->hideFromDetail(),
            HasMany::make('Interests', 'interests', InterestCategory::class),
            MorphMany::make('Login Attempts', 'loginAttempts', LoginAttempt::class),
            HasMany::make('Withdraw Accounts', 'withdrawAccounts', WithdrawAccount::class),
            HasMany::make('Transactions', 'transactions', Transaction::class),
            HasMany::make('Tasks', 'tasks', Task::class),
            HasMany::make('Ban Attemps', 'banAttemps', BanAttemp::class),
            MorphMany::make('Activities', 'activities', ActivityLog::class),
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