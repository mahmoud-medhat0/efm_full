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
        Schema::table('orders', function (Blueprint $table) {
            $table->enum('order_type', ['full_time', 'custom_time'])->nullable();
            $table->integer('time_start')->nullable();
            $table->integer('time_end')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->dropColumn('order_type');
            $table->dropColumn('time_start');
            $table->dropColumn('time_end');
        });
    }
};
