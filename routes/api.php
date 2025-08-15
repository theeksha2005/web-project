<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\SignupController;
use App\Http\Controllers\LoginController;

Route::get('/test', function () {
    return response()->json(['message' => 'API is working!']);
});

Route::get('/orders', [OrderController::class, 'index']);
Route::post('/orders', [OrderController::class, 'store']);


Route::post('/signup', [SignupController::class, 'store']);

Route::post('/login', [LoginController::class, 'login']);


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
