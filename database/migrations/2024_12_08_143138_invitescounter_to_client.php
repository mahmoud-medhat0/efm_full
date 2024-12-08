<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('clients', function (Blueprint $table) {
            $table->integer('invites_free')->default(0)->after('activator_count');
            $table->integer('invites_free_period')->default(0)->after('invites_free');
            $table->integer('invites_premium')->default(0)->after('invites_free_period');
            $table->integer('invites_premium_period')->default(0)->after('invites_premium');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('clients', function (Blueprint $table) {
            $table->dropColumn('invites_free');
            $table->dropColumn('invites_free_period');
            $table->dropColumn('invites_premium');
            $table->dropColumn('invites_premium_period');
        });
    }
};
