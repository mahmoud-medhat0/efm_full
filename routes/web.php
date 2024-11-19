<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FileController;
use Telegram\Bot\Laravel\Facades\Telegram;
use App\Http\Controllers\TelegramController;
use App\Http\Controllers\FawaterakController;
use App\Models\Client;
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
    Telegram::removeWebhook();
    $response = Telegram::setWebhook([
        'url' => env('APP_URL').'webhook/telegram/'.env('TELEGRAM_BOT_TOKEN'), // Replace with your public URL
    ]);
    dd($response);
    return $response ? 'Webhook set successfully' : 'Failed to set webhook';
});
Route::get('/test', function () {
    $clients = Client::whereHas('subscriptionMemberships', function ($query) {
        // $query->where('status', 'active');
    })->whereNull('activator_count')->count();
    dd($clients);
});
Route::post('/webhook/telegram/{token}', [TelegramController::class, 'handleWebhook'])->withoutMiddleware('verifyCsrfToken');
Route::post('/webhook/fawaterk/success',[FawaterakController::class,'successhook'])->withoutMiddleware('verifyCsrfToken');
Route::get('/storage/attachments/private/{filename}', [FileController::class, 'showPrivateFile'])->name('private.files');
require __DIR__ . '/client.php';
require __DIR__ . '/auth.php';
