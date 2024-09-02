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
        Schema::create('services', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('status')->default('active');
            $table->string('icon');
            $table->integer('reward_point');
            $table->integer('price_per_one_point');
            $table->double('price_per_one_balance');
            $table->integer('min_amount');
            $table->integer('max_amount');
            $table->json('credentials')->nullable();
            $table->json('calculation_formula')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('services');
    }
};
