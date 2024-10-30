<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
class AddPermissionviewAnyActivitylog extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Permission::create(['group' => 'Activity Log', 'name' => 'viewAnyActivitylog', 'guard_name' => 'admin']);
        Permission::create(['group' => 'Activity Log', 'name' => 'viewActivitylog', 'guard_name' => 'admin']);
    }
}
