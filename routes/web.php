<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/', function () {
    return Inertia::render('Welcome');
});
Route::get('/site1', function () {
   return Inertia::render('Site1');
})->name('site1');

Route::get('/site2', function () {
    return Inertia::render('Site2');
})->name('site2');

Route::get('/game1', function () {
    return Inertia::render('Game1');
})->name('game1');

Route::get('/shop', function () {
    return Inertia::render('Shop');
})->name('shop');

//Route::get('/login', [AuthenticatedSessionController::class, 'create'])->name('login');

Route::middleware(['auth', 'verified'])->group(function () {
    
});

require __DIR__.'/auth.php';
require __DIR__.'/settings.php';

