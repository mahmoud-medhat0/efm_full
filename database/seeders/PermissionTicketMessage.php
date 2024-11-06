<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
class PermissionTicketMessage extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $permissions = [
            'createTicketMessage',
            'viewTicketMessage',
            'viewAnyTicketMessage',
            'updateTicketMessage',
            'deleteTicketMessage',
        ];
        foreach($permissions as $permission){
            Permission::create(['group'=>'Ticket Message','guard_name' => 'admin','name' => $permission]);
        }
    }
}
