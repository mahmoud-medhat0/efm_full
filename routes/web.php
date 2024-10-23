<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TelegramController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/
Route::post('/webhook/telegram/{token}', [TelegramController::class, 'handleWebhook']);

require __DIR__ . '/client.php';
require __DIR__ . '/auth.php';
