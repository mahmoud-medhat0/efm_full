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
        Schema::table('membershibs', function (Blueprint $table) {
            $table->string('period_type');
            $table->integer('period_count')->nullable();
            $table->boolean('referral_same')->default(false);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('membershibs', function (Blueprint $table) {
            $table->dropColumn('period_type');
            $table->dropColumn('period_count');
            $table->dropColumn('referral_same');
        });
    }
};
