import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { router } from "@inertiajs/react";
export default function Noteslist({ notes = [], activeNoteId }) {
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

    const isFavorite = async (id) => {
        // Optimistic UI: flip favorite immediately.
        setDbNotes((prev) =>
            (prev || []).map((n) =>
                n.id === id
                    ? {
                          ...n,
                          favorite: Number(n.favorite) === 1 ? 0 : 1,
                      }
                    : n,
            ),
        );

        try {
            const res = await fetch(`/notes/${id}/favorite`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "X-Requested-With": "XMLHttpRequest",
                    "X-CSRF-TOKEN": document
                        .querySelector("meta[name='csrf-token']")
                        ?.getAttribute("content"),
                },
                body: JSON.stringify({}),
            });

            const data = await res.json().catch(() => ({}));
            if (!res.ok || !data.success) {
                throw new Error(data?.message || "Failed to update favorite");
            }

            // Sync with server value.
            setDbNotes((prev) =>
                (prev || []).map((n) =>
                    n.id === id
                        ? {
                              ...n,
                              favorite:
                                  Number(data.note?.favorite) === 1 ? 1 : 0,
                          }
                        : n,
                ),
            );
        } catch (e) {
            console.error(e);
            setError(e?.message || "Failed to update favorite");
            // Revert by refetching.
            refetchNotes();
        }
    };

    const onDeleteNote = async (id) => {
        const csrf = document
            .querySelector('meta[name="csrf-token"]')
            ?.getAttribute("content");

        const res = await fetch(`/notes/${id}/delete`, {
            method: "DELETE",
            headers: {
                ...(csrf ? { "X-CSRF-TOKEN": csrf } : {}),
            },
        });

        // Some Laravel deletes return 204 with an empty body
        if (!res.ok) {
            let data = {};
            try {
                data = await res.json();
            } catch {}
            throw new Error(data?.message || "Failed to delete note");
        }

        // Optimistically remove from UI
        setDbNotes((prev) => (prev || []).filter((n) => n.id !== id));

        // Optional: you can refetch for consistency
        // await refetchNotes();
    };

        const [expanded, setExpanded] = useState(false);


    return (
        <div className="min-h-screen py-5 px-7 w-full border border-white/10 bg-[#0A0B0D] text-[#E7E5E0]">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-800/50">
                <h3 className="text-sm font-semibold tracking-wide uppercase text-slate-400">
                    Generated Documents ({effectiveNotes.length})
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
                        return (
                            <div
                                onClick={() =>
                                    setExpanded(
                                        expanded === note.id ? null : note.id,
                                    )
                                }
                                key={note.id}
                                // onClick={() => onSelectNote(note)}
                                className={`group relative flex flex-col gap-2 p-3 rounded-xl border transition-all duration-200 text-left
                                    ${
                                        isActive
                                            ? "bg-slate-800/40 border-indigo-500/40 shadow-lg shadow-indigo-500/5 "
                                            : "cursor-pointer bg-slate-900/40 border-slate-800/60 hover:bg-slate-850/30 hover:border-slate-700/60  h-30 focus:h-300   transition-all duration-500 ease-in-out"
                                    }
                                    ${expanded === note.id ? "h-170" : "h-30"}
                                    `}
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

                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                isFavorite(note.id);
                                            }}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill={
                                                    Number(note.favorite) === 1
                                                        ? "#FFD700"
                                                        : "none"
                                                }
                                                viewBox="0 0 24 24"
                                                strokeWidth="2"
                                                stroke="currentColor"
                                                className="size-5 cursor-pointer text-white/50 hover:text-[#FFD700]"
                                            >
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                                {/* Sneak Peek Text Content Snippet */}
                                <div className="text-xs text-slate-400 overflow-y-auto scroll leading-relaxed">
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
                                        {note.content || ""}
                                    </ReactMarkdown>
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
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onDeleteNote(note.id);
                                            }}
                                            className="cursor-pointer text-slate-400 hover:text-rose-400 p-1 rounded hover:bg-slate-800 transition-colors"
                                            title="Delete Note"
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
                                                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
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
