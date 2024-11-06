<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
class CurrencySeederPermission extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $permissions = [
            'viewAnyCurrency',
            'createCurrency',
            'updateCurrency',
            'deleteCurrency',
            'viewCurrency',
        ];
        foreach ($permissions as $permission) {
            Permission::create(['group'=>'currency','guard_name' => 'admin','name' => $permission]);
        }
    }
}
