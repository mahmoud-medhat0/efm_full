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
        Schema::table('gateways', function (Blueprint $table) {
            $table->enum('vat_deposit_type', ['fixed', 'percentage'])->nullable()->after('charge_deposit');
            $table->string('vat_deposit')->nullable()->after('vat_deposit_type');
            $table->enum('vat_withdraw_type', ['fixed', 'percentage'])->nullable()->after('charge_withdraw');
            $table->string('vat_withdraw')->nullable()->after('vat_withdraw_type');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('gateways', function (Blueprint $table) {
            $table->dropColumn('vat_deposit_type');
            $table->dropColumn('vat_deposit');
            $table->dropColumn('vat_withdraw_type');
            $table->dropColumn('vat_withdraw');
        });
    }
};
