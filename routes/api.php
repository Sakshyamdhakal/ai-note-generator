<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

use App\Http\Controllers\AINoteController;

Route::post('/generate-note', [AINoteController::class, 'generateNote']);
Route::get('/notes', [AINoteController::class, 'listNotes']);
Route::get('/notes/{note}/download', [AINoteController::class, 'download']);
