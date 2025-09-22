<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\CartController;


//Route::get('/', function () {
    //return Inertia::render('Welcome');
//});
Route::get('/site1', function () {
   return Inertia::render('Site1');
})->name('site1');

Route::get('/site2', function () {
    return Inertia::render('Site2');
})->name('site2');

Route::get('/signup', function () {
    return Inertia::render('Signup');
})->name('signup');

Route::get('/game1', function () {
    return Inertia::render('Game1');
})->name('game1');

Route::get('/game2', function () {
    return Inertia::render('Game2');
})->name('game2');

Route::get('/game3', function () {
    return Inertia::render('Game3');
})->name('game3');

Route::get('/shop', function () {
    return Inertia::render('Shop');
})->name('shop');

Route::get('/checkoutform', function () {
    return Inertia::render('CheckoutForm');
})->name('checkoutform');

Route::get('/learn', function () {
    return Inertia::render('Learn');
})->name('learn');

Route::get('/progressrep', function () {
    return Inertia::render('ProgressRep');
})->name('progressrep');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard'); // Matches Dashboard.tsx in resources/js/Pages/
})->name('dashboard');

Route::get('/order', [OrderController::class, 'showOrderForm'])->name('order.form');
Route::post('/orders', [OrderController::class, 'store'])->name('order.store');

Route::post('/cart/store', [CartController::class, 'store'])->name('cart.store');
Route::get('/cart', [CartController::class, 'index'])->name('cart.index');

// Protected routes (require authentication)
Route::middleware('auth')->group(function () {
    Route::put('/cart/items/{item}', [CartController::class, 'update'])->name('cart.update');
    Route::delete('/cart/items/{item}', [CartController::class, 'destroy'])->name('cart.destroy');
});

require __DIR__.'/auth.php';
require __DIR__.'/settings.php';

