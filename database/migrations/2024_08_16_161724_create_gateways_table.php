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
        Schema::create('gateways', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('logo');
            $table->boolean('is_active')->default(true);
            $table->boolean('auto')->default(false);
            $table->boolean('attachment')->default(false);
            $table->boolean('deposit')->default(false);
            $table->boolean('withdraw')->default(false);
            $table->double('min_deposit')->nullable();
            $table->double('max_deposit')->nullable();
            $table->double('min_withdraw')->nullable();
            $table->double('max_withdraw')->nullable();
            $table->string('charge_type_deposit')->nullable();
            $table->double('charge_deposit')->nullable();
            $table->string('charge_type_withdraw')->nullable();
            $table->double('charge_withdraw')->nullable();
            $table->json('credentials')->nullable();
            $table->json('fields')->nullable();
            $table->longText('description_deposit')->nullable();
            $table->longText('description_withdraw')->nullable();
            $table->string('class_name')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('gateways');
    }
};
