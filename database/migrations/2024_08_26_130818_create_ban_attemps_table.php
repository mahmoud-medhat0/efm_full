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
        Schema::create('ban_attemps', function (Blueprint $table) {
            $table->id();
            $table->string('video_id')->nullable();
            $table->foreignId('task_id')->constrained('tasks')->nullable();
            $table->foreignId('client_id')->constrained('clients')->nullable();
            $table->string('cause');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ban_attemps');
    }
};
