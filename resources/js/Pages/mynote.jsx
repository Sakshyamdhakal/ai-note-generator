export default function Noteslist({ 
    notes = [], 
    onSelectNote, 
    onDeleteNote, 
    onDownloadNote,
    activeNoteId 
}) {
    
    // Helper function to dynamically color code the filter badges
    const getBadgeStyle = (filter) => {
        switch(filter) {
            case 'bullet_points': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
            case 'summary': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
            case 'meeting_minutes': return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
            default: return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
        }
    };

    // Helper to format string keys into human-readable filter names
    const formatFilterName = (name) => {
        return name ? name.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') : 'AI Cleaned';
    };

    return (
        <div className="min-h-screen py-5 px-7 w-full border border-white/10 bg-[#0A0B0D] text-[#E7E5E0]">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-800/50">
                <h3 className="text-sm font-semibold tracking-wide uppercase text-slate-400">
                    Saved Documents ({notes.length})
                </h3>
            </div>

            {/* Scrollable Note Container */}
            <div className="flex-1 overflow-y-auto space-y-3 pr-1 custom-scrollbar">
                {notes.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-40 text-center border-2 border-dashed border-slate-800/40 rounded-xl p-4">
                        <p className="text-xs text-slate-500 italic">No notes generated in this session yet.</p>
                    </div>
                ) : (
                    notes.map((note) => {
                        const isActive = activeNoteId === note.id;
                        return (
                            <div 
                                key={note.id} 
                                onClick={() => onSelectNote(note)}
                                className={`group relative flex flex-col gap-2 p-3 rounded-xl border transition-all duration-200 cursor-pointer text-left
                                    ${isActive 
                                        ? 'bg-slate-800/40 border-indigo-500/40 shadow-lg shadow-indigo-500/5' 
                                        : 'bg-slate-900/40 border-slate-800/60 hover:bg-slate-850/30 hover:border-slate-700/60'
                                    }`}
                            >
                                {/* Header: Title & Layout Badge */}
                                <div className="flex items-start justify-between gap-2">
                                    <h4 className="text-sm font-medium text-slate-200 line-clamp-1 group-hover:text-white transition-colors">
                                        {note.title || `Untitled Document`}
                                    </h4>
                                    <span className={`text-[10px] px-2 py-0.5 rounded-full border font-mono tracking-wide shrink-0 ${getBadgeStyle(note.filterUsed)}`}>
                                        {formatFilterName(note.filterUsed)}
                                    </span>
                                </div>

                                {/* Sneak Peek Text Content Snippet */}
                                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                                    {note.content}
                                </p>

                                {/* Footer Data & Hidden Fast Action Hover Controls */}
                                <div className="flex items-center justify-between mt-1 pt-1 border-t border-slate-800/30">
                                    <span className="text-[10px] text-slate-500 font-medium">
                                        {new Date(note.id).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                    
                                    {/* Action row visible instantly on hover */}
                                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                                        <button 
                                            onClick={(e) => {
                                                e.stopPropagation(); // Stop click from altering standard panel selection
                                                onDownloadNote(note);
                                            }}
                                            className="text-slate-400 hover:text-emerald-400 p-1 rounded hover:bg-slate-800 transition-colors"
                                            title="Download File"
                                        >
                                            💾
                                        </button>
                                        <button 
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onDeleteNote(note.id);
                                            }}
                                            className="text-slate-400 hover:text-rose-400 p-1 rounded hover:bg-slate-800 transition-colors"
                                            title="Delete Note"
                                        >
                                            🗑️
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