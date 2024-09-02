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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('order_id')->unique();
            $table->string('status')->default('pending');
            $table->foreignId('provider_id')->constrained('clients');
            $table->foreignId('service_id')->constrained('services');
            $table->foreignId('rejection_cause_id')->nullable()->constrained('rejection_causes');
            $table->string('link');
            $table->integer('target_amount');
            $table->integer('current_amount')->default(0);
            $table->double('price');
            $table->string('last_action')->nullable();
            $table->timestamp('last_action_at')->nullable();
            $table->foreignId('last_action_by')->nullable()->constrained('users');
            $table->foreignId('approved_by')->nullable()->constrained('users');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
