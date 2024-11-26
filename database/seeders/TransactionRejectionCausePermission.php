<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class TransactionRejectionCausePermission extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $permissions = [
            'createTransactionRejectionCause',
            'viewTransactionRejectionCause',
            'viewAnyTransactionRejectionCause',
            'updateTransactionRejectionCause',
            'deleteTransactionRejectionCause'
        ];
        foreach ($permissions as $permission) {
            Permission::create(['group'=>'TransactionRejectionCause','guard_name' => 'admin','name' => $permission]);
        }
    }
}
