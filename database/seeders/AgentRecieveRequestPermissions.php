<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
class AgentRecieveRequestPermissions extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Permission::create(['guard_name' => 'admin','group' => 'agent-recieve-request','name' => 'viewAnyAgentRecieveRequest']);
        Permission::create(['guard_name' => 'admin','group' => 'agent-recieve-request','name' => 'viewAgentRecieveRequest']);
        Permission::create(['guard_name' => 'admin','group' => 'agent-recieve-request','name' => 'createAgentRecieveRequest']);
        Permission::create(['guard_name' => 'admin','group' => 'agent-recieve-request','name' => 'updateAgentRecieveRequest']);
        Permission::create(['guard_name' => 'admin','group' => 'agent-recieve-request','name' => 'deleteAgentRecieveRequest']);
    }
}
