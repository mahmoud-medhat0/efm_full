<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
class TaskRejectionCausePremissions extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Permission::create(['guard_name' => 'admin','group' => 'Task Rejection Causes', 'name' => 'createTaskRejectionCause']);
        Permission::create(['guard_name' => 'admin','group' => 'Task Rejection Causes', 'name' => 'updateTaskRejectionCause']);
        Permission::create(['guard_name' => 'admin','group' => 'Task Rejection Causes', 'name' => 'deleteTaskRejectionCause']);
        Permission::create(['guard_name' => 'admin','group' => 'Task Rejection Causes', 'name' => 'viewTaskRejectionCause']);
        Permission::create(['guard_name' => 'admin','group' => 'Task Rejection Causes', 'name' => 'viewAnyTaskRejectionCause']);
    }
}

