<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\SignupController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\ShopController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CheckoutController;



// Public routes
Route::post('/signup', [SignupController::class, 'store']);
Route::post('/login', [LoginController::class, 'login']);
Route::get('/shop', [ShopController::class,'index'])->name('shop.index');

// Test route with session middleware
Route::middleware('web')->group(function () {
    Route::get('/test', function (Request $request) {
        return response()->json([
            'message' => 'API is working!',
            'session_id' => $request->session()->getId(),
            'authenticated' => auth()->check(),
            'user_id' => auth()->check() ? auth()->id() : null
        ]);
    });
});

// Cart routes with session middleware
Route::middleware('web')->group(function () {
    Route::post('/cart/items', [CartController::class, 'store']);
    Route::get('/cart', [CartController::class, 'index']);
    Route::patch('/cart/items/{item}', [CartController::class, 'update']);
    Route::delete('/cart/items/{item}', [CartController::class, 'destroy']);
});

// Authenticated routes (require Sanctum)
Route::middleware('auth:sanctum')->group(function () {
    // Checkout
    Route::post('/checkout', [CheckoutController::class,'create']);

    // Orders
    Route::get('/orders', [OrderController::class, 'index']);
    Route::post('/orders', [OrderController::class, 'store']);
    Route::get('/orders/{order}', [OrderController::class,'show'])->name('orders.show');

    // Current user info
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
});
