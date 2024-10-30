<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolesAndPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        $collection = collect([
            'Aboutsection',
            'AdvertiseSection',
            'BanAttemp',
            'Client',
            'FaqQuestion',
            'Feedback',
            'Gateways',
            'InterestCategory',
            'LoginAttempt',
            'Membershib',
            'MembershipSection',
            'News',
            'Order',
            'ReferralSection',
            'ReferralSetting',
            'RegistrationOffer',
            'RejectionCause',
            'Service',
            'SubscriptionMembership',
            'Task',
            'Term',
            'Transaction',
            'User',
            'WithdrawAccount',
            'Role',
            'Permission'
            // ... // List all your Models you want to have Permissions for.
        ]);

        $collection->each(function ($item, $key) {
            // create permissions for each collection item
            Permission::create(['group' => $item, 'name' => 'viewAny' . $item, 'guard_name' => 'admin']);
            Permission::create(['group' => $item, 'name' => 'view' . $item, 'guard_name' => 'admin']);
            Permission::create(['group' => $item, 'name' => 'update' . $item, 'guard_name' => 'admin']);
            Permission::create(['group' => $item, 'name' => 'create' . $item, 'guard_name' => 'admin']);
            Permission::create(['group' => $item, 'name' => 'delete' . $item, 'guard_name' => 'admin']);
            // Permission::create(['group' => $item, 'name' => 'destroy' . $item, 'guard_name' => 'admin']);
        });

        // Create a Super-Admin Role and assign all Permissions
        $role = Role::create(['name' => 'super-admin', 'guard_name' => 'admin']);
        $role->givePermissionTo(Permission::all());

        // Give User Super-Admin Role
        $user = \App\Models\User::first(); // Change this to your email.
        $user->assignRole('super-admin');
    }
}
