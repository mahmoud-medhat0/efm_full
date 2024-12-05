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
        Schema::create('agent_recieve_requests', function (Blueprint $table) {
            $table->id();
            $table->foreignId('gateway_id')->constrained('gateways');
            $table->string('sender_name')->nullable();
            $table->string('sender_identifier');
            $table->decimal('amount', 10, 2);
            $table->foreignId('user_id')->nullable()->constrained('users');
            $table->foreignId('transaction_id')->nullable()->constrained('transactions');
            $table->string('status')->default('pending');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('agent_recieve_requests');
    }
};
