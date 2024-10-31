<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
class ManualFieldPermission extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Permission::create(['group' => 'ManualField', 'name' => 'viewAnyManualField', 'guard_name' => 'admin']);
        Permission::create(['group' => 'ManualField', 'name' => 'viewManualField', 'guard_name' => 'admin']);
        Permission::create(['group' => 'ManualField', 'name' => 'updateManualField', 'guard_name' => 'admin']);
        Permission::create(['group' => 'ManualField', 'name' => 'createManualField', 'guard_name' => 'admin']);
        Permission::create(['group' => 'ManualField', 'name' => 'deleteManualField', 'guard_name' => 'admin']);
    }
}
