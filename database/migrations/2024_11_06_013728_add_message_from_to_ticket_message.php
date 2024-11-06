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
        Schema::table('ticket_messages', function (Blueprint $table) {
            $table->enum('message_from', ['user', 'admin'])->nullable()->after('ticket_id');
            $table->foreignId('client_id')->nullable()->constrained('clients')->onDelete('cascade')->after('message_from');
            $table->foreignId('user_id')->nullable()->constrained('users')->onDelete('cascade')->after('client_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('ticket_messages', function (Blueprint $table) {
            $table->dropForeign(['client_id']);
            $table->dropForeign(['user_id']);
            $table->dropColumn('message_from');
            $table->dropColumn('client_id');
            $table->dropColumn('user_id');
        });
    }
};
