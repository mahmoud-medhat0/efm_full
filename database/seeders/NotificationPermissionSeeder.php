<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
class NotificationPermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Permission::create(['group' => 'Notifications','guard_name' => 'admin','name' => 'Membership Notifications']);
        Permission::create(['group' => 'Notifications','guard_name' => 'admin','name' => 'Deposit Notifications']);
        Permission::create(['group' => 'Notifications','guard_name' => 'admin','name' => 'Withdrawal Notifications']);
    }
}
