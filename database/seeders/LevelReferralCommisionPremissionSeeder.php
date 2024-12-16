<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class LevelReferralCommisionPremissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $permissions = [
            ['name' => 'viewAnyLevelReferralCommision'],
            ['name' => 'viewLevelReferralCommision'],
            ['name' => 'createLevelReferralCommision'],
            ['name' => 'updateLevelReferralCommision'],
            ['name' => 'deleteLevelReferralCommision'],
        ];
        foreach($permissions as $permission){
            Permission::create(['name' => $permission['name'], 'guard_name' => 'admin','group' => 'Level Referral Commision']);
        }
    }
}
