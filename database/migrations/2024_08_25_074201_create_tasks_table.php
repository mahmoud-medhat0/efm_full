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
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained('orders');
            $table->string('status')->default('pending');
            $table->foreignId('client_id')->constrained('clients');
            $table->foreignId('service_id')->constrained('services');
            $table->boolean('paid')->default(false);
            $table->string('link');
            $table->string('ip')->nullable();
            $table->string('user_agent')->nullable();
            $table->string('country')->nullable();
            $table->boolean('removed')->default(false);
            $table->integer('points_reward')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};
