<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
class TransactionsApprovePermissions extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Permission::create(['group' => 'Transaction', 'name' => 'ApproveTransaction', 'guard_name' => 'admin']);
        Permission::create(['group' => 'Transaction', 'name' => 'RejectTransaction', 'guard_name' => 'admin']);
    }
}
