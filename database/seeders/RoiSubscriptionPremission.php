<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class RoiSubscriptionPremission extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $permissions = [
            'createRoiSubscription',
            'viewRoiSubscription',
            'viewAnyRoiSubscription',
            'updateRoiSubscription',
            'deleteRoiSubscription',
        ];
        foreach($permissions as $permission){
            Permission::create(['group'=>'Roi Subscription','guard_name' => 'admin','name' => $permission]);
        }
    }
}
