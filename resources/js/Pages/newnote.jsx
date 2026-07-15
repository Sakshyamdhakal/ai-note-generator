import React, { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const FILTERS = [
    { id: "bullet_points", label: "Bullets" },
    { id: "summary", label: "Summary" },
    { id: "academic", label: "Academic" },
];

export default function Newnote() {
    const [script, setScript] = useState("");
    const [filter, setFilter] = useState("bullet_points");
    const [generatedDoc, setGeneratedDoc] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleGenerate = async () => {
        if (!script.trim()) {
            setError("Add some text to the draft pane first.");
            return;
        }
        setError("");
        setLoading(true);
        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/api/generate-note",
                {
                    script,
                    filter,
                },
            );
            if (response.data.success) {
                setGeneratedDoc(response.data.document);
            }
        } catch (err) {
            const apiMessage = err?.response?.data?.message;
            const details = [];
            const httpStatus = err?.response?.data?.http_status;
            const apiKeyMissing = err?.response?.data?.api_key_missing;
            if (httpStatus) details.push(`HTTP ${httpStatus}`);
            if (apiKeyMissing) details.push("GEMINI_API_KEY is missing");
            const geminiBody = err?.response?.data?.gemini_response;
            if (geminiBody)
                details.push(`Gemini: ${String(geminiBody).slice(0, 400)}`);
            const suffix = details.length ? ` (${details.join(" | ")})` : "";
            setError(
                apiMessage
                    ? `${apiMessage}${suffix}`
                    : `Something went wrong generating the note.${suffix}`,
            );
        } finally {
            setLoading(false);
        }
    };

    const saveToLocalFile = () => {
        if (!generatedDoc) return;
        const blob = new Blob([generatedDoc], {
            type: "text/plain;charset=utf-8",
        });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `ai-note-${Date.now()}.txt`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const wordCount = script.trim() ? script.trim().split(/\s+/).length : 0;

    return (
        <div className="min-h-screen py-20 w-full border border-white/10 bg-[#0A0B0D] text-[#E7E5E0] flex justify-center">
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600&family=JetBrains+Mono:wght@400;500&family=Lora:ital,wght@0,400;0,500;1,400&display=swap');

        @keyframes scanline {
          0% { transform: translateY(-100%); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(100%); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .scanline { animation: none !important; }
        }
        .draft-lines {
          background-image: repeating-linear-gradient(
            to bottom,
            transparent,
            transparent 27px,
            #ffffff0a 28px
          );
        }
        .font-display { font-family: 'Space Grotesk', sans-serif; }
        .font-mono-note { font-family: 'JetBrains Mono', monospace; }
        .font-serif-note { font-family: 'Lora', serif; }
      `}</style>

            <div className="w-full px-20">
                {/* Mark */}
                <div className="flex items-baseline justify-between mb-8">
                    <div>
                        <h1 className="font-display text-2xl tracking-tight text-[#E7E5E0]">
                            NoteForge.AI
                        </h1>
                        <p className="font-mono-note text-[11px] uppercase tracking-[0.2em] text-[#9A9DA6] mt-1">
                            raw draft → structured note
                        </p>
                    </div>
                    <div className="font-mono-note text-[11px] text-[#9A9DA6] hidden sm:block">
                        {wordCount} words in draft
                    </div>
                </div>

                {/* Workbench */}
                <div className="relative grid grid-cols-1 md:grid-cols-2 gap-0 rounded-lg border border-[#262A31] overflow-hidden bg-[#0D0F12]">
                    {/* Draft pane */}
                    <div className="bg-[#14161A] p-8 flex flex-col">
                        <div className="flex items-center justify-between mb-4">
                            <span className="font-mono-note text-[11px] uppercase tracking-[0.2em] text-[#D9A15B]">
                                Draft
                            </span>
                            <span className="font-mono-note text-[10px] text-[#5c5f66]">
                                .txt
                            </span>
                        </div>
                        <textarea
                            value={script}
                            onChange={(e) => setScript(e.target.value)}
                            placeholder="Paste your raw script, transcript, or messy notes here..."
                            rows={12}
                            className="border border-white/10 draft-lines px-2 flex-1 w-full resize-none bg-transparent font-mono-note text-[13px] leading-[28px] text-[#E7E5E0] placeholder-[#5c5f66] outline-none focus-visible:ring-1 focus-visible:ring-[#D9A15B] rounded"
                        />

                        <div className="mt-5 flex flex-wrap gap-2">
                            {FILTERS.map((f) => (
                                <button
                                    key={f.id}
                                    onClick={() => setFilter(f.id)}
                                    className={`px-3 py-1.5 rounded-full font-mono-note text-[11px] uppercase tracking-wider border transition-colors focus-visible:ring-1 focus-visible:ring-[#D9A15B] ${
                                        filter === f.id
                                            ? "bg-[#D9A15B] text-[#14161A] border-[#D9A15B]"
                                            : "bg-transparent text-[#9A9DA6] border-[#262A31] hover:border-[#D9A15B]/60 hover:text-[#E7E5E0]"
                                    }`}
                                >
                                    {f.label}
                                </button>
                            ))}
                        </div>

                        {error && (
                            <p className="mt-3 font-mono-note text-[11px] text-[#E08585]">
                                {error}
                            </p>
                        )}
                    </div>

                    {/* Seam (desktop only) */}
                    <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-[#262A31] -translate-x-1/2 overflow-hidden pointer-events-none">
                        {loading && (
                            <div
                                className="scanline absolute left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-[#D9A15B] to-transparent"
                                style={{
                                    animation: "scanline 1.4s linear infinite",
                                }}
                            />
                        )}
                    </div>

                    <button
                        onClick={handleGenerate}
                        disabled={loading}
                        className="cursor-pointer hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 h-14 w-14 items-center justify-center rounded-full border border-[#262A31] bg-[#0D0F12] text-[#D9A15B] hover:border-[#D9A15B] transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus-visible:ring-1 focus-visible:ring-[#D9A15B]"
                        aria-label="Transmute draft into note"
                    >
                        {loading ? (
                            <span className="h-2 w-2 rounded-full bg-[#D9A15B] animate-pulse" />
                        ) : (
                            <svg
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path
                                    d="M5 12h14M13 6l6 6-6 6"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        )}
                    </button>

                    {/* Note pane */}
                    <div className="bg-[#151719] p-6 flex flex-col border-t md:border-t-0 border-[#262A31]">
                        <div className="flex items-center justify-between mb-4">
                            <span className="font-mono-note text-[11px] uppercase tracking-[0.2em] text-[#6FA8A0]">
                                Note
                            </span>
                            {generatedDoc && (
                                <button
                                    onClick={saveToLocalFile}
                                    className="cursor-pointer font-mono-note text-[10px] uppercase tracking-wider text-[#9A9DA6] hover:text-[#6FA8A0] transition-colors flex items-center gap-1 focus-visible:ring-1 focus-visible:ring-[#6FA8A0] rounded"
                                >
                                    <svg
                                        width="12"
                                        height="12"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path
                                            d="M12 3v12m0 0l-4-4m4 4l4-4M4 21h16"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                    Save .pdf
                                </button>
                            )}
                        </div>

                        <div className="flex-1 overflow-y-auto min-h-[280px] font-serif-note text-[15px] leading-[1.8] text-[#E7E5E0] prose prose-invert">
                            {generatedDoc ? (
                                <ReactMarkdown
                                    remarkPlugins={[remarkGfm]}
                                    components={{
                                        table: ({ children }) => (
                                            <table className="w-full border-collapse border border-[#262A31] my-4">
                                                {children}
                                            </table>
                                        ),
                                        thead: ({ children }) => (
                                            <thead className="bg-[#1A1C20] text-[#E7E5E0]">
                                                {children}
                                            </thead>
                                        ),
                                        tbody: ({ children }) => (
                                            <tbody className="text-[#E7E5E0]">
                                                {children}
                                            </tbody>
                                        ),
                                        tr: ({ children }) => (
                                            <tr className="border-b border-[#262A31]">
                                                {children}
                                            </tr>
                                        ),
                                        th: ({ children }) => (
                                            <th className="border border-[#262A31] px-4 py-2 text-left text-[#E7E5E0]">
                                                {children}
                                            </th>
                                        ),
                                        td: ({ children }) => (
                                            <td className="border border-[#262A31] px-4 py-2 text-[#E7E5E0]">
                                                {children}
                                            </td>
                                        ),
                                    }}
                                >
                                    {generatedDoc}
                                </ReactMarkdown>
                            ) : (
                                <p className="font-mono-note text-[12px] text-[#5c5f66] leading-relaxed">
                                    Your structured note appears here once
                                    transmuted. Nothing to show yet.
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Mobile transmute button */}
                    <button
                        onClick={handleGenerate}
                        disabled={loading}
                        className="md:hidden w-full py-3 bg-[#D9A15B] text-[#14161A] font-mono-note text-[12px] uppercase tracking-[0.2em] disabled:opacity-50"
                    >
                        {loading ? "Transmuting…" : "Transmute →"}
                    </button>
                </div>
            </div>
        </div>
    );
}
