<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class TicketPermission extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $permissionsTicketCategory = [
            'createTicketCategory',
            'viewTicketCategory',
            'viewAnyTicketCategory',
            'updateTicketCategory',
            'deleteTicketCategory'
        ];
        foreach ($permissionsTicketCategory as $permission) {
            Permission::create(['group'=>'TicketCategory','guard_name' => 'admin','name' => $permission]);
        }
        $permissionsTicket = [
            'createTicket',
            'viewTicket',
            'viewAnyTicket',
            'updateTicket',
            'deleteTicket'
        ];
        foreach ($permissionsTicket as $permission) {
            Permission::create(['group'=>'Ticket','guard_name' => 'admin','name' => $permission]);
        }
    }
}
