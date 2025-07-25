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
        $table->id();                             // Primary Key
        $table->unsignedBigInteger('parent_id');    // Foreign Key to user
        $table->string('item_name');              // Ordered item
        $table->integer('quantity');
        $table->decimal('total_price', 10, 2);    // Compatible with PostgreSQL
        
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
