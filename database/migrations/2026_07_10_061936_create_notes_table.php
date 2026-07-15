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
        Schema::create('notes', function (Blueprint $table) {
            $table->id();

            $table->foreignId('user_id')->constrained()->cascadeOnDelete();

            $table->longText('draft')->nullable();
            $table->longText('notegenerated')->nullable();
            $table->string('filter_used')->nullable();
            $table->string('favorite')->default(0);

            $table->timestamps();

            // helpful for lookups
            $table->index(['user_id', 'filter_used']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('notes');
    }
};
