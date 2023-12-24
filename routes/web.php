<?php

use App\Http\Controllers\CardController;
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

Route::prefix('project')->group(function () {

    Route::get('/testing', [ProjectController::class, 'testing'])->name('project.testing');

    Route::get('/myProject', [ProjectController::class, 'myProject'])->name('project.myProject');

    Route::get('/detailProject/{id}', [ProjectController::class, 'detailProject'])->name('project.detail');

    Route::post('/project', [ProjectController::class, 'createProject'])->name('project.createProject');

    Route::delete('/delete/{id}', [ProjectController::class, 'deleteProject'])->name('project.deleteProject');

    Route::prefix('member')->group(function () {
        Route::post('/addMember', [ProjectController::class, 'addMember'])->name('project.member.addMember');

        Route::post('/deleteMember', [ProjectController::class, 'deleteMember'])->name('project.member.delete');
    });

    Route::prefix('Card')->group(function () {

        Route::post('/store', [CardController::class, 'createCard'])->name('project.card.createCard');
        Route::delete('/delete/{id}', [CardController::class, 'deleteCard'])->name('project.card.delete');

        Route::post('/decrypt', [CardController::class, 'decrypt'])->name('project.card.decrypt');
    });
});

require __DIR__ . '/auth.php';
