<?php

namespace App\Nova\Dashboards;

use Laravel\Nova\Cards\Help;
use Laravel\Nova\Dashboards\Main as Dashboard;
use App\Nova\Metrics\ClientsEmailVerified;
use App\Nova\Metrics\ClientsTelegramVerified;
use App\Nova\Metrics\AllClients;
use Efm\Depositsandwithdrawals\Depositsandwithdrawals;
class Main extends Dashboard
{
    /**
     * Get the cards for the dashboard.
     *
     * @return array
     */
    public function cards()
    {
        return [
            new AllClients,
            new ClientsEmailVerified,
            (new ClientsTelegramVerified)->withMeta(['asHtml' => true]),
            new Depositsandwithdrawals,
        ];
    }
}
