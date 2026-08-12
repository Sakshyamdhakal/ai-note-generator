<?php

use App\Http\Controllers\AINoteController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('home');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/api/notes', [AINoteController::class, 'listNotes']);
    Route::post('/api/generate-note', [AINoteController::class, 'generateNote']);
    Route::get('/api/notes/{note}/download', [AINoteController::class, 'download']);
    Route::patch('/notes/{note}/favorite', [AINoteController::class, 'favorite']);
    Route::delete('/notes/{note}/delete', [AINoteController::class, 'delete']);
});

require __DIR__.'/auth.php';
