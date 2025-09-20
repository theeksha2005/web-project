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
        Schema::table('cart_items', function (Blueprint $table) {
            $table->integer('stock')->default(0)->after('price_cents');
        });
        // ✅ Make selected_size nullable in cart_items
        Schema::table('cart_items', function (Blueprint $table) {
            $table->string('selected_size')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('cart_items', function (Blueprint $table) {
              $table->dropColumn('stock');
        });

        Schema::table('cart_items', function (Blueprint $table) {
            $table->string('selected_size')->nullable(false)->change();
        });
    }
};
