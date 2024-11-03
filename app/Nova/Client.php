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
use Laravel\Nova\Fields\Currency;
use Laravel\Nova\Fields\DateTime;
use Laravel\Nova\Fields\Password;
use Laravel\Nova\Fields\BelongsTo;
use Laravel\Nova\Fields\MorphMany;
use App\Nova\Actions\ImpersonateClient;
use App\Nova\Filters\Client\ParentFilter;
use Outl1ne\MultiselectField\Multiselect;
use Laravel\Nova\Http\Requests\NovaRequest;
use Naif\ToggleSwitchField\ToggleSwitchField;
use Bolechen\NovaActivitylog\Resources\ActivityLog;
use App\Models\InterestCategory as InterestCategoryModel;

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
        'id', 'name', 'email', 'phone', 'username', 'telegram_id', 'telegram_username', 'personal_number', 'parent.name'
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
            Text::make('Name', 'name')->sortable(),
            Email::make('Email', 'email')->sortable(),
            Currency::make('Balance', 'balance')->displayUsing(function ($value, $resource, $attribute) {
                return number_format($resource->balance, 2);
            })->readonly(),
            Number::make('Points', 'points')->onlyOnDetail()->sortable(),
            DateTime::make('Email Verified At', 'email_verified_at')->readonly()->onlyOnDetail()->onlyOnPreview(),
            Password::make('Password', 'password')
                ->onlyOnForms()
                ->creationRules('required', Rules\Password::defaults())
                ->updateRules('nullable', Rules\Password::defaults()),
            ToggleSwitchField::make('Email Verified', 'email_verified')->color('#3AB95A'),
            ToggleSwitchField::make('Active', 'is_active')->color('#3AB95A'),
            Text::make('Phone', 'phone')->sortable(),
            Text::make('Username', 'username')->sortable(),
            Select::make('Gender', 'gender')->options([
                'male' => 'Male',
                'female' => 'Female',
            ]),
            Text::make('Personal Number', 'personal_number'),
            Number::make('Telegram ID', 'telegram_id')->sortable(),
            Text::make('Telegram Username', 'telegram_username')->sortable(),
            ToggleSwitchField::make('Telegram Verified', 'telegram_verified')->color('#3AB95A')->sortable(),
            DateTime::make('Telegram Verified At', 'telegram_verified_at')->readonly()->onlyOnDetail()->onlyOnPreview()->sortable(),
            Password::make('Password')
                ->onlyOnForms()
                ->creationRules('required', Rules\Password::defaults())
                ->updateRules('nullable', Rules\Password::defaults()),
            Text::make('Session ID', 'session_kyc_id')->readonly(),
            Text::make('Session Status', 'session_kyc_status')->readonly(),
            URL::make('Session URL', 'kyc_url')->readonly()->sortable(),
            ToggleSwitchField::make('KYC Verified', 'kyc_verified')->color('#3AB95A')->sortable(),
            DateTime::make('KYC Verified At', 'kyc_verified_at')->readonly()->onlyOnDetail()->onlyOnPreview()->sortable(),
            ToggleSwitchField::make('2FA Status', 'is_2a')->color('#3AB95A')->sortable(),
            Multiselect::make('Interests')->fillUsing(function ($request, $model, $attribute) {
                $interests = $request->input($attribute);
                $model->interests()->sync($interests);
            })
                ->options(InterestCategoryModel::all()->pluck('name', 'id'))
                ->saveAsJSON(false) // Ensures it saves as a relationship
                ->placeholder('Select interests')->showOnCreating()->showOnUpdating()->hideFromDetail()->sortable(),
            BelongsTo::make('Parent', 'parent', Client::class)->displayUsing(function ($value) {
                return $value->name ?? 'No parent';
            })->sortable()->readonly(),
            HasMany::make('Subscriptions', 'subscriptionMemberships', SubscriptionMembership::class)->sortable(),
            HasMany::make('Referrals', 'referrals', Client::class)->sortable(),
            HasMany::make('Interests', 'interests', InterestCategory::class)->sortable(),
            MorphMany::make('Login Attempts', 'loginAttempts', LoginAttempt::class)->sortable(),
            HasMany::make('Withdraw Accounts', 'withdrawAccounts', WithdrawAccount::class)->sortable(),
            HasMany::make('Transactions', 'transactions', Transaction::class)->sortable(),
            HasMany::make('Tasks', 'tasks', Task::class)->sortable(),
            HasMany::make('Ban Attemps', 'banAttemps', BanAttemp::class)->sortable(),
            MorphMany::make('Activities', 'activities', ActivityLog::class)->sortable(),
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
            new ParentFilter,
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
        return [
            (new ImpersonateClient)->canSee(function ($request) {
                return auth('admin')->user()->can('impersonate-client');
            }),
        ];
    }
}