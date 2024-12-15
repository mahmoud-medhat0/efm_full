<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
class NewPremissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $permissions = [
            ['name' => 'Approve Tasks','guard_name' => 'admin','group' => 'Tasks'],
            ['name' => 'Bulk Transaction','guard_name' => 'admin','group' => 'Transaction'],
        ];
        foreach ($permissions as $permission) {
            Permission::create($permission);
        }
    }
}
