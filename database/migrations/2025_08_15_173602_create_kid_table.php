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
        Schema::create('kid', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('parent_id');
            $table->string('full_name');
            $table->string('nickname')->nullable();
            $table->integer('age')->nullable();
            $table->string('birth_month')->nullable();
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('user_log')->onDelete('cascade');
            $table->foreign('parent_id')->references('id')->on('parent')->onDelete('cascade');
    
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kid');
    }
};
