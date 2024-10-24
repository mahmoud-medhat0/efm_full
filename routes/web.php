<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TelegramController;
use Telegram\Bot\Laravel\Facades\Telegram;
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
Route::get('/set-webhook', function () {
    $response = Telegram::setWebhook([
        'url' => env('APP_URL').'/telegram/webhook', // Replace with your public URL
    ]);

    return $response ? 'Webhook set successfully' : 'Failed to set webhook';
});
Route::post('/webhook/telegram/{token}', [TelegramController::class, 'handleWebhook'])->withoutMiddleware('verifyCsrfToken');

require __DIR__ . '/client.php';
require __DIR__ . '/auth.php';
