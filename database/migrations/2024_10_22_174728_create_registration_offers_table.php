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
        Schema::create('registration_offers', function (Blueprint $table) {
            $table->id();
            $table->boolean('is_active')->default(true);
            $table->integer('min_activator_count');
            $table->integer('max_activator_count');
            $table->enum('type', ['percentage', 'fixed']);
            $table->integer('value');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('registration_offers');
    }
};
