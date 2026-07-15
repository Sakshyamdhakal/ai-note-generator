import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { router } from "@inertiajs/react";
export default function Favoritepage({
    notes = [],
    onSelectNote,
    onDeleteNote,
    onDownloadNote,
    activeNoteId,
}) {
    const [dbNotes, setDbNotes] = useState(notes);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [flag, setFlag] = useState();

    useEffect(() => {
        let isMounted = true;

        const loadNotes = async () => {
            setLoading(true);
            setError("");
            try {
                const res = await fetch(
                    "http://127.0.0.1:8000/api/notes?ts=" + Date.now(),
                    {
                        cache: "no-store",
                    },
                );
                const data = await res.json();

                if (!res.ok || !data.success) {
                    throw new Error(data?.message || "Failed to load notes");
                }

                if (isMounted) setDbNotes(data.notes || []);
            } catch (e) {
                if (isMounted) setError(e?.message || "Failed to load notes");
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        loadNotes();

        return () => {
            isMounted = false;
        };
    }, []);

    const refetchNotes = async () => {
        try {
            // Keep UI responsive; only show loading when initial load.
            setError("");
            const res = await fetch(
                "http://127.0.0.1:8000/api/notes?ts=" + Date.now(),
                {
                    cache: "no-store",
                },
            );
            const data = await res.json();

            if (!res.ok || !data.success) {
                throw new Error(data?.message || "Failed to load notes");
            }

            setDbNotes(data.notes || []);
        } catch (e) {
            setError(e?.message || "Failed to load notes");
        }
    };

    const effectiveNotes = dbNotes || [];

    // Helper to format string keys into human-readable filter names
    const formatFilterName = (name) => {
        return name
            ? name
                  .split("_")
                  .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                  .join(" ")
            : "AI Cleaned";
    };

    const downloadNote = (note) => {
        window.open(
            `http://127.0.0.1:8000/api/notes/${note.id}/download`,
            "_blank",
        );
    };

    const isFavorite = (id) => {
        // Inertia's router.patch does not always return a real Promise (so `.then()` can be undefined).
        // Refetch immediately after the PATCH request completes via onSuccess.
        router.patch(`/notes/${id}/favorite`, {
            onSuccess: () => {
                // Refetch instead of optimistic local update; favorite column is a string in DB.
                refetchNotes();
                setFlag(1);
            },
            onError: (e) => {
                console.error(e);
                setError(e?.message || "Failed to update favorite");
            },
        });
    };

    return (
        <div className="min-h-screen py-5 px-7 w-full border border-white/10 bg-[#0A0B0D] text-[#E7E5E0]">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-800/50">
                <h3 className="text-sm font-semibold tracking-wide uppercase text-slate-400">
                    Favorite Documents ({effectiveNotes.length})
                </h3>
            </div>

            {/* Scrollable Note Container */}
            <div className="flex-1 overflow-y-auto space-y-3 pr-1 custom-scrollbar">
                {loading ? (
                    <div className="flex flex-col items-center justify-center h-40 text-center border-2 border-dashed border-slate-800/40 rounded-xl p-4">
                        <p className="text-xs text-slate-500 italic">
                            Loading notes…
                        </p>
                    </div>
                ) : effectiveNotes.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-40 text-center border-2 border-dashed border-slate-800/40 rounded-xl p-4">
                        <p className="text-xs text-slate-500 italic">
                            No notes generated in this session yet.
                        </p>
                    </div>
                ) : (
                    effectiveNotes.map((note) => {
                        const isActive = activeNoteId === note.id;

                        // DB may return favorite as string ("1"/"0"), so normalize.
                        if (Number(note.favorite) !== 1) return null;

                        return (
                            <div
                                key={note.id}
                                // onClick={() => onSelectNote(note)}
                                className={`group relative flex flex-col gap-2 p-3 rounded-xl border transition-all duration-200 text-left
                                    ${
                                        isActive
                                            ? "bg-slate-800/40 border-indigo-500/40 shadow-lg shadow-indigo-500/5"
                                            : "bg-slate-900/40 border-slate-800/60 hover:bg-slate-850/30 hover:border-slate-700/60"
                                    }`}
                            >
                                {/* Header: Title & Layout Badge */}
                                <div className="flex items-start justify-between gap-2">
                                    <h4 className="text-sm font-medium text-slate-200 line-clamp-1 group-hover:text-white transition-colors">
                                        {note.title || `Untitled Document`}
                                    </h4>
                                    <div className="flex items-start justify-between gap-2">
                                        <span
                                            className={`text-[10px] px-2 py-0.5 rounded-full border font-mono tracking-wide shrink-0 bg-[#D9A15B] text-[#14161A] border-[#D9A15B]`}
                                        >
                                            {formatFilterName(note.filterUsed)}
                                        </span>
                                    </div>
                                </div>

                                {/* Footer Data & Hidden Fast Action Hover Controls */}
                                <div className="flex items-center justify-between mt-1 pt-1 border-t border-slate-800/30">
                                    <span className="text-[10px] text-slate-500 font-medium">
                                        {note.created_at
                                            ? new Date(
                                                  note.created_at,
                                              ).toLocaleTimeString([], {
                                                  hour: "2-digit",
                                                  minute: "2-digit",
                                              })
                                            : "--/--/----"}
                                    </span>

                                    {/* Action row visible instantly on hover */}
                                    <div className="flex items-center gap-2 opacity-100 group-hover:opacity-100 transition-opacity duration-150">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation(); // Stop click from altering standard panel selection
                                                downloadNote(note);
                                            }}
                                            className="cursor-pointer text-slate-400 hover:text-emerald-400 p-1 rounded hover:bg-slate-800 transition-colors"
                                            title="Download File"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke-width="1.5"
                                                stroke="currentColor"
                                                class="size-5"
                                            >
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}
