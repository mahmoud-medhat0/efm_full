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
        Schema::table('transactions', function (Blueprint $table) {
            $table->string('invoice_id')->nullable();
            $table->string('invoice_key')->nullable();
            $table->string('payment_method')->nullable();
            $table->string('reference_number')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('transactions', function (Blueprint $table) {
            $table->dropColumn('invoice_id');
            $table->dropColumn('invoice_key');
            $table->dropColumn('payment_method');
            $table->dropColumn('reference_number');
        });
    }
};
