export default function Dashboardnavbar({onViewChange}) {
    
    return (
        <header className="w-full sticky top-0 z-10 backdrop-blur-md bg-[#090D16]/100 border-b border-white/[0.1]">
            <div className="max-w-7xl mx-auto px-5 h-30 flex items-center justify-between">
                <div  className="cursor-pointer flex items-center gap-2 font-bold text-xl tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                    <span className="text-indigo-500 text-3xl">
                        <a href="/">NoteForge</a>
                    </span>
                </div>

                <div className="hidden lg:flex items-center gap-3 text-sm font-medium text-slate-400">
                    <button className="cursor-pointer px-2 py-1.5 rounded-md bg-white/10 text-sm font-semibold text-white hover:bg-white/20 transition-all shadow-lg shadow-white/5">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="size-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                            />
                        </svg>
                    </button>
                    <button onClick={() => onViewChange("new-note")} className="cursor-pointer px-6 py-1.5 rounded-md bg-gradient-to-r from-indigo-500 to-indigo-600 font-semibold text-white hover:bg-none border border-white/[0.3] hover:border-white/[0.2] text-sm font-semibold transition-all shadow-lg shadow-white/5 transition-all">
                        + New note
                    </button>
                </div>
            </div>
        </header>
    );
}
