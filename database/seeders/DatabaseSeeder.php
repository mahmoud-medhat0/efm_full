<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Database\Seeders\TransactionsApprovePermissions;
use Database\Seeders\AddPermissionviewAnyActivitylog;
class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            // RolesAndPermissionsSeeder::class,
            // TransactionsApprovePermissions::class,
            // AddPermissionviewAnyActivitylog::class,
            ManualFieldPermission::class,
        ]);
    }
}
