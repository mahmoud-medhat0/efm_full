<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
class AgentRequestPermission extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Permission::create(['guard_name' => 'admin','group' => 'agent-request','name' => 'viewAnyAgentRequest']);
        Permission::create(['guard_name' => 'admin','group' => 'agent-request','name' => 'viewAgentRequest']);
        Permission::create(['guard_name' => 'admin','group' => 'agent-request','name' => 'createAgentRequest']);
        Permission::create(['guard_name' => 'admin','group' => 'agent-request','name' => 'updateAgentRequest']);
        Permission::create(['guard_name' => 'admin','group' => 'agent-request','name' => 'deleteAgentRequest']);
    }
}
