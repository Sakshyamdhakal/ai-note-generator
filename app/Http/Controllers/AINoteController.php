<?php

namespace App\Http\Controllers;

use App\Models\Note;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;
use Barryvdh\DomPDF\Facade\Pdf;

class AINoteController extends Controller
{
    public function listNotes(Request $request)
    {
        $userId = Auth::id();

        if (!$userId) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthenticated.',
            ], 401);
        }

        $notes = Note::query()
            ->where('user_id', $userId)
            ->orderByDesc('id')
            ->get([
                'id',
                'notegenerated',
                'filter_used',
                'draft',
                'created_at',
                'favorite',
                'user_id',
            ]);

        $formatted = $notes->map(function ($note) {
            return [
                'id' => $note->id,
                'title' => $note->notegenerated
                    ? trim(strtok($note->notegenerated, "\n"))
                    : null,
                'author' => $note->user_id,
                'content' => $note->notegenerated,
                'filterUsed' => $note->filter_used,
                'created_at' => $note->created_at?->toISOString(),
                'favorite' => $note->favorite,
            ];
        });

        return response()->json([
            'success' => true,
            'notes' => $formatted,
        ]);
    }

    public function generateNote(Request $request)
    {
        $userId = Auth::id();

        if (!$userId) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthenticated.',
            ], 401);
        }

        $request->validate([
            'script' => 'required|string',
            'filter' => 'string|nullable',
        ]);

        $userScript = $request->input('script');
        $filter = $request->input('filter', 'default');

        $instructions = "
            You are a professional document generator.

            Transform the user's raw script or text into a cleanly formatted document.

            Do not include conversational filler like:
            'Sure, here is your text'.

            Output ONLY the final processed document text.

            Add tables when useful for comparison or listing.

            The generated script must be completely unique.

            Add a suitable title to the generated document.
        ";

        if ($filter === 'bullet_points') {
            $instructions .= "
                Format the output strictly as concise,
                high-impact bullet points.
            ";
        } elseif ($filter === 'summary') {
            $instructions .= "
                Format the output as a structured summary
                with a main overview paragraph and key takeaways.
            ";
        } elseif ($filter === 'academic') {
            $instructions .= "
                Format the output using formal,
                academic language with clear section headings.
            ";
        } elseif ($filter === 'q/a') {
            $instructions .= "
                Format the output as question and answer format,
                as if it is for some test .
            ";
        }

        $apiKey = env('GEMINI_API_KEY');

        $url =
            "https://generativelanguage.googleapis.com/v1beta/models/" .
            "gemini-2.5-flash:generateContent?key={$apiKey}";

        $response = Http::withHeaders([
            'Content-Type' => 'application/json',
        ])->post($url, [
            'contents' => [
                [
                    'parts' => [
                        [
                            'text' =>
                                $instructions .
                                "\n\nUser Script:\n" .
                                $userScript
                        ]
                    ]
                ]
            ]
        ]);

        if (!$response->successful()) {
            return response()->json([
                'success' => false,
                'message' => 'Gemini API Error',
                'http_status' => $response->status(),
                'gemini_response' => $response->body(),
                'api_key_missing' => empty($apiKey),
            ], 500);
        }

        $data = $response->json();

        $generatedText =
            $data['candidates'][0]['content']['parts'][0]['text']
            ?? 'Failed to parse AI response.';

        $note = Note::create([
            'user_id' => $userId,
            'draft' => $userScript,
            'notegenerated' => $generatedText,
            'filter_used' => $filter,
        ]);

        return response()->json([
            'success' => true,
            'document' => $generatedText,
            'note' => [
                'id' => $note->id,
                'title' => $note->notegenerated
                    ? trim(strtok($note->notegenerated, "\n"))
                    : null,
                'content' => $note->notegenerated,
                'filterUsed' => $note->filter_used,
                'favorite' => $note->favorite,
                'created_at' => $note->created_at,
                'author' => $note->user_id,
            ],
        ]);
    }

    public function download(Note $note)
    {
        if ($note->user_id !== Auth::id()) {
            abort(403, 'Unauthorized.');
        }

        $html = Str::markdown($note->notegenerated);

        $pdf = Pdf::loadView('pdf.note', [
            'content' => $html,
        ]);

        return $pdf->download("note-{$note->id}.pdf");
    }

    public function favorite(Note $note)
    {
        if ($note->user_id !== Auth::id()) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized.',
            ], 403);
        }

        $note->favorite = !$note->favorite;
        $note->save();

        return response()->json([
            'success' => true,
            'note' => $note,
        ]);
    }

    public function delete(Note $note)
    {
        if ($note->user_id !== Auth::id()) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized.',
            ], 403);
        }

        $note->delete();

        return response()->json([
            'success' => true,
            'message' => 'Note deleted successfully.',
        ]);
    }
}