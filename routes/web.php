<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TestingController;
use App\Models\Project;
use App\Models\User;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/testing', [TestingController::class, 'index']);

Route::prefix('project')->group(function(){

    Route::get('/testing', [ProjectController::class, 'testing'])->name('project.testing');

    Route::get('/myProject', [ProjectController::class, 'myProject'])->name('project.myProject');

    Route::get('/detailProject/{id}', [ProjectController::class, 'detailProject'])->name('project.detail');

    Route::post('/project', [ProjectController::class, 'createProject'])->name('project.createProject');

});

require __DIR__.'/auth.php';
