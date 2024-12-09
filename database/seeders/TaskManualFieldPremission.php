<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
class TaskManualFieldPremission extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $permissions = [
            'createTaskManualField',
            'updateTaskManualField',
            'deleteTaskManualField',
            'viewTaskManualField',
            'viewAnyTaskManualField',

        ];
        foreach ($permissions as $permission) {
            Permission::create(['group'=>'Task Manual Field','guard_name' => 'admin','name' => $permission]);
        }
    }
}
