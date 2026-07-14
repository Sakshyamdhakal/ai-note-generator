<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class AINoteController extends Controller
{
    public function generateNote(Request $request)
    {
        // 1. Validate the incoming request from React
        $request->validate([
            'script' => 'required|string',
            'filter' => 'string|nullable', // e.g., 'bullet_points', 'summary', 'detailed'
        ]);



        $userScript = $request->input('script');
        $filter = $request->input('filter', 'default');

        // 2. Define your custom filters / instructions (Hidden from the user)
        $instructions = "You are a professional document generator. Transform the user's raw script or text into a cleanly formatted document. Do not include conversational filler like 'Sure, here is your text' or introductory remarks. Output ONLY the final processed document text. Then also add table for like comparision or listing .";

        if ($filter === 'bullet_points') {
            $instructions .= " Format the output strictly as concise, high-impact bullet points. If you get prompt as short then ignore else generate numerous bullet points";
        } elseif ($filter === 'summary') {
            $instructions .= " Format the output as a structured summary with a main overview paragraph and key takeaways.";
        } elseif ($filter === 'academic') {
            $instructions .= " Format the output using formal, academic language with clear section headings.";
        }

        // 3. Call the Gemini API (using the standard v1beta endpoint)
        $apiKey = env('GEMINI_API_KEY');

        // NOTE: gemini-pro is not available in the v1beta endpoint for generateContent.
        // Use gemini-1.5-flash (fast) as a default.
        $url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={$apiKey}";


        $response = Http::withHeaders([
            'Content-Type' => 'application/json',
        ])->post("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={$apiKey}", [
            'contents' => [
                [
                    'parts' => [
                        ['text' => $instructions . "\n\nUser Script:\n" . $userScript]
                    ]
                ]
            ]
        ]);

        if ($response->successful()) {
            $data = $response->json();

            // Extract the text content from Gemini's nested response structure
            $generatedText = $data['candidates'][0]['content']['parts'][0]['text'] ?? 'Failed to parse AI response.';

            return response()->json([
                'success' => true,
                'document' => $generatedText,
            ]);
        }

        // Return more actionable error details to the frontend (don't leak the API key)
        return response()->json([
            'success' => false,
            'message' => 'Gemini API Error',
            'http_status' => $response->status(),
            'gemini_response' => $response->body(),
            'api_key_missing' => empty($apiKey),
        ], 500);
    }
}
