<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class WithdrawAccountFieldPermission extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $permissions = [
            'viewAnyWithdrawAccountField',
            'createWithdrawAccountField',
            'updateWithdrawAccountField',
            'deleteWithdrawAccountField',
        ];

        foreach ($permissions as $permission) {
            Permission::create(['guard_name' => 'admin', 'group' => 'Withdraw Account Field', 'name' => $permission]);
        }
    }
}
