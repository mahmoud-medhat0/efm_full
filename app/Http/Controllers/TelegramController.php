<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use GuzzleHttp\Client;
use Telegram\Bot\Laravel\Facades\Telegram;
use App\Models\TelegramUserViolation;

class TelegramController extends Controller
{
    private $client;
    public function __construct()
    {
        $this->client = new Client();
    }
    public function handleWebhook($token, Request $request)
    {
        // Log the entire request payload for debugging
        \Log::info('Received webhook request:', $request->all());

        // Verify the token to ensure that the request is authorized
        if ($token !== env('TELEGRAM_BOT_TOKEN')) {
            \Log::warning('Unauthorized attempt to access webhook with token: ' . $token);
            abort(403, 'Unauthorized access');
        }

        try {
            $message = $request->all();
            if (isset($message['message'])) {
                $this->handleCommand($message);
            } elseif (isset($message['callback_query'])) {
                $this->handleCallbackQuery($message['callback_query']);
            } elseif (isset($message['my_chat_member'])) {
                $this->handleGroupManagement($message['my_chat_member']);
            }
            return response()->json(['status' => 'success']);
        } catch (\Exception $e) {
            // Log detailed error if an exception is thrown during the process
            \Log::error("Telegram webhook error: " . $e->getMessage(), [
                'exception' => $e,
                'trace' => $e->getTraceAsString(), // Include stack trace for more detailed debugging
            ]);

            // Return a JSON response with the error message and a 500 status code
            return response()->json([
                'error' => 'Internal Server Error',
                'message' => $e->getMessage(),
            ], 500);
        }
    }
    public function handleCommand($message)
    {
        // \Log::info($message);
        if (isset($message['message']['chat'])) { // Check if 'chat' key exists
            $chatId = $message['message']['chat']['id'];
            $userId = $message['message']['from']['id'];
            $text = $message['message']['text'] ?? '';
            \Log::info($text);
            if (preg_match('/https?:\/\/[^\s]+/', $text)) {
                // Delete the message containing the link
                \Log::info($message['message']['message_id']);
                $this->deleteMessage($chatId, $message['message']['message_id']);
                // Handle user ban logic
                $this->handleUserViolation($chatId, $userId);
            }
        } else {
            \Log::warning('Message does not contain chat information:', $message);
        }
    }
    private function deleteMessage($chat_id, $message_id)
    {
        $endpoint = "https://api.telegram.org/bot" . env('TELEGRAM_BOT_TOKEN') . "/deleteMessage";
        $payload = [
            'chat_id' => $chat_id,
            'message_id' => $message_id,
        ];
        try {
            $response = $this->client->post($endpoint, [
                'json' => $payload,
            ]);
            return $response;
        } catch (\GuzzleHttp\Exception\GuzzleException $e) {
            \Log::error("Error deleting message: " . $e->getMessage());
            return null;
        }
    }
    private function sendMessage($chat_id, $text, $reply_to_message_id = null, $reply_markup = null)
    {
        $endpoint = "https://api.telegram.org/bot" . env('TELEGRAM_BOT_TOKEN') . "/sendMessage";

        $payload = [
            'chat_id' => $chat_id,
            'text' => $text,
            'parse_mode' => $reply_markup == null ? 'Markdown' : 'HTML',
        ];
        if ($reply_to_message_id !== null) {
            $payload['reply_to_message_id'] = $reply_to_message_id;
        }
        if ($reply_markup != null) {
            $payload['reply_markup'] = json_encode($reply_markup);
        }

        try {
            $response = $this->client->post($endpoint, [
                'json' => $payload,
            ]);

            return $response;
        } catch (\GuzzleHttp\Exception\GuzzleException $e) {
            \Log::error("Error sending message: " . $e->getMessage());
            return null;
        }
    }
    private function banUser($chatId, $userId, $banDuration)
    {
        // Restrict the user for the given duration
        Telegram::restrictChatMember([
            'chat_id' => $chatId,
            'user_id' => $userId,
            'until_date' => time() + $banDuration, // Ban for specified duration
        ]);

        // Optionally, send a message to the group notifying about the ban
        Telegram::sendMessage([
            'chat_id' => $chatId,
            'text' => "User <b>$userId</b> has been banned for " . ($banDuration / (24 * 60 * 60)) . " days due to sharing a link."
        ]);
    }
    function kickUser($chatId, $userId)
    {
        // Kick the user from the group
        Telegram::kickChatMember([
            'chat_id' => $chatId,
            'user_id' => $userId,
        ]);

        // Optionally, send a message to the group notifying about the permanent ban
        Telegram::sendMessage([
            'chat_id' => $chatId,
            'text' => "User has been permanently removed from the group due to repeated violations."
        ]);
    }
    private function handleGroupManagement($chatMemberUpdate)
    {
        $chat = $chatMemberUpdate['chat'];
        $newStatus = $chatMemberUpdate['new_chat_member']['status'];

        if ($newStatus === 'member') {
            \Log::info("Bot added to group: " . $chat['title']);
            // Handle bot being added to a group
        } elseif ($newStatus === 'left') {
            \Log::info("Bot removed from group: " . $chat['title']);
            // Handle bot being removed from a group
        }
    }
    function handleUserViolation($chatId, $userId)
    {
        // Find or create the violation record for this user
        $violation = TelegramUserViolation::firstOrCreate(
            ['user_id' => $userId, 'chat_id' => $chatId],
            ['violations' => 0]
        );

        // Increment the violation count
        $violation->violations += 1;
        $violation->save();

        // Ban duration based on violation count
        switch ($violation->violations) {
            case 1:
                // First violation: ban for 1 day
                $this->banUser($chatId, $userId, 1 * 24 * 60 * 60); // 1 day in seconds
                break;
            case 2:
                // Second violation: ban for 1 week
                $this->banUser($chatId, $userId, 7 * 24 * 60 * 60); // 1 week in seconds
                break;
            case 3:
                // Third violation: ban for 1 month
                $this->banUser($chatId, $userId, 30 * 24 * 60 * 60); // 1 month in seconds
                break;
            case 4:
                // Fourth violation: permanent ban (kick from group)
                $this->kickUser($chatId, $userId);
                break;
        }
    }
}
