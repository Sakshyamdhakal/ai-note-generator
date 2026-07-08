<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('home');
});

// Route::middleware('auth')->group(
//     function(){
        Route::get('/dashboard', function(){
            return Inertia::render('dashboard');
        });
//     }
// );
