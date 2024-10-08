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
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->double('amount');
            $table->double('fee');
            $table->double('total');
            $table->string('tnx_type');
            $table->string('type');
            $table->string('tnx');
            $table->string('note')->nullable();
            $table->string('description');
            $table->string('status')->default('pending');
            $table->foreignId('gateway_id')->constrained('gateways')->nullable();
            $table->foreignId('client_id')->constrained('clients');
            $table->foreignId('admin_id')->constrained('users')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
