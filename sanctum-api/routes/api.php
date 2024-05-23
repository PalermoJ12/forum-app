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
    Route::put('/postsUpdate/{id}', [PostController::class, 'update']);
    Route::delete('/postDelete/{id}', [PostController::class, 'destroy']);

    Route::put('/comment/{id}', [CommentController::class, 'update']);
    Route::post('/commentPost', [CommentController::class, 'store']);
    Route::delete('/commentDelete/{id}', [CommentController::class, 'destroy']);


    Route::delete('/logout', [AuthController::class, 'logout']);
});




