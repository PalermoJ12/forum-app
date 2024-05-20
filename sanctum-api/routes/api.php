<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\CommentController;

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

Route::middleware('auth:sanctum')->group(function () {

    Route::get('/posts', [PostController::class, 'index']);
    Route::get('/mypost', [PostController::class, 'show']);
    Route::post('/postsCreate', [PostController::class, 'store']);
    Route::post('/postsUpdate/{id}', [PostController::class, 'update']);
    Route::post('/commentPost', [CommentController::class, 'store']);
});




