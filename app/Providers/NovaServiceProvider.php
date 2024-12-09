<?php

namespace App\Providers;

use App\Nova\News;
use App\Nova\Task;
use App\Nova\Term;
use App\Nova\User;
use App\Nova\Order;
use App\Nova\Client;
use App\Nova\Ticket;
use App\Nova\Service;
use App\Nova\Currency;
use App\Nova\Feedback;
use App\Nova\Gateways;
use Laravel\Nova\Nova;
use App\Nova\BanAttemp;
use App\Nova\Membershib;
use App\Nova\FaqQuestion;
use App\Nova\ManualField;
use App\Nova\Transaction;
use App\Nova\Aboutsection;
use App\Nova\AgentRequest;
use App\Nova\LoginAttempt;
use App\Nova\TicketMessage;
use App\Nova\RejectionCause;
use App\Nova\TicketCategory;
use App\Nova\ReferralSection;
use App\Nova\ReferralSetting;
use App\Nova\RoiSubscription;
use App\Nova\TaskManualField;
use App\Nova\TicketCategrory;
use App\Nova\WithdrawAccount;
use App\Nova\AdvertiseSection;
use App\Nova\InterestCategory;
use App\Nova\MembershipSection;
use App\Nova\RegistrationOffer;
use Laravel\Nova\Menu\MenuItem;
use Laravel\Nova\Menu\MenuList;
use App\Nova\AgentRecieveRequest;
use App\Nova\WithdrawAccountField;
use Laravel\Nova\Menu\MenuSection;
use App\Nova\SubscriptionMembership;
use Illuminate\Support\Facades\Gate;
use App\Nova\TransactionRejectionCause;
use Laravel\Nova\NovaApplicationServiceProvider;

class NovaServiceProvider extends NovaApplicationServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        parent::boot();
        Nova::showUnreadCountInNotificationCenter();
        Nova::mainMenu(function () {
            return [
                MenuSection::make('Website Resources Sections', [
                        MenuItem::resource(Aboutsection::class),
                        MenuItem::resource(AdvertiseSection::class),
                        MenuItem::resource(MembershipSection::class),
                        MenuItem::resource(ReferralSection::class),
                ])->icon('document-text')->collapsible(),
                MenuSection::make('Website Other Resources', [
                    MenuItem::resource(FaqQuestion::class),
                    MenuItem::resource(Feedback::class),
                    MenuItem::resource(News::class),
                    MenuItem::resource(Term::class),
                ])->icon('collection')->collapsible(),
                MenuSection::make('Users Resources', [
                    MenuItem::resource(User::class)->name('Admin Users'),
                    MenuItem::resource(Client::class),
                    MenuItem::resource(BanAttemp::class),
                    MenuItem::resource(InterestCategory::class),
                    MenuItem::resource(LoginAttempt::class),
                    MenuItem::resource(WithdrawAccount::class),
                ])->icon('users')->collapsible(),
                MenuSection::make('Ticket Resources', [
                    MenuItem::resource(TicketCategory::class),
                    MenuItem::resource(Ticket::class),
                    MenuItem::resource(TicketMessage::class),
                ])->icon('ticket')->collapsible(),
                MenuSection::make('Financial Resources', [
                    MenuItem::resource(ManualField::class),
                    MenuItem::resource(Gateways::class),
                    MenuItem::resource(Transaction::class),
                    MenuItem::resource(TransactionRejectionCause::class),
                    MenuItem::resource(AgentRecieveRequest::class),
                    MenuItem::resource(AgentRequest::class),
                    MenuItem::resource(Membershib::class),
                    MenuItem::resource(SubscriptionMembership::class)->name('Subscriptions'),
                    MenuItem::resource(RoiSubscription::class)->name('Roi Subscriptions'),
                    MenuItem::resource(ReferralSetting::class),
                    MenuItem::resource(RegistrationOffer::class),
                    MenuItem::resource(WithdrawAccountField::class),
                    MenuItem::resource(Currency::class),
                ])->icon('currency-dollar')->collapsible(),
                MenuSection::make('Orders Resources', [
                    MenuItem::resource(Service::class),
                    MenuItem::resource(TaskManualField::class),
                    MenuItem::resource(Order::class),
                    MenuItem::resource(Task::class),
                    MenuItem::resource(RejectionCause::class),
                ])->icon('shopping-cart')->collapsible(),
                MenuSection::make('Roles & Permissions', [
                    MenuItem::make('Roles')
                    ->path('resources/roles'),
                    MenuItem::make('Permissions')
                    ->path('resources/permissions'),
                ])->icon('shield-check')->collapsible(),
            ];
        });
        Nova::serving(function () {
            Nova::script('nova-filters', asset('js/nova-filters.js'));
        });
    }

    /**
     * Register the Nova routes.
     *
     * @return void
     */
    protected function routes()
    {
        Nova::routes()
                ->withAuthenticationRoutes()
                ->withPasswordResetRoutes()
                ->register();
    }

    /**
     * Register the Nova gate.
     *
     * This gate determines who can access Nova in non-local environments.
     *
     * @return void
     */
    protected function gate()
    {
        Gate::define('viewNova', function ($user) {
            return in_array($user->email, [
                //
            ]);
        });
    }

    /**
     * Get the dashboards that should be listed in the Nova sidebar.
     *
     * @return array
     */
    protected function dashboards()
    {
        return [
            new \App\Nova\Dashboards\Main,
        ];
    }

    /**
     * Get the tools that should be listed in the Nova sidebar.
     *
     * @return array
     */
    public function tools()
    {
        $tools = [
            new \Bolechen\NovaActivitylog\NovaActivitylog(),
            new \Badinansoft\LanguageSwitch\LanguageSwitch(),
        ];

        $user = auth('admin')->user();

        if ($user && $user->can('viewAnyRole') && $user->can('viewAnyPermission')) {
            $tools[] = new \Sereny\NovaPermissions\NovaPermissions();
        }

        return $tools;
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        \Spatie\NovaTranslatable\Translatable::defaultLocales(['en', 'ar']);
    }
}
