import { useEffect, useState } from "react";
import Dashboardnavbar from "../components/dashboard-navbar";
import Sidebar from "../components/sidebar";
import Newnote from "./newnote";
import NotesHistoryList from "./mynote";
import Noteslist from "./mynote";
import TrashView from "./trash";

function FavoritesView() { return <div className="p-6">⭐ Favorites View goes here</div>; }
function DefaultDashboardHome() { return <div className="p-6">🏠 Welcome to your Dashboard Home</div>; }

export default function Dashboard() {
    const [activeView, setActiveView] = useState(() => {
        return localStorage.getItem("app_active_view") || "dashboard";
    });

    useEffect(() => {
        localStorage.setItem("app_active_view", activeView);
    }, [activeView]);

    const renderMainContent = () => {
        switch (activeView) {
            case "new-note":
                return <Newnote />;
            case "my-note":
                return <Noteslist />;
            case "favorites":
                return <FavoritesView />;
            case "trash":
                return <TrashView />;
            default:
                return <DefaultDashboardHome />;
        }
    };

    return (
        <div className="h-screen flex flex-col bg-[#090D16] text-slate-100 font-sans selection:bg-indigo-500/30 selection:text-indigo-200 overflow-hidden relative">
            <Dashboardnavbar onViewChange={setActiveView} activeView={activeView}/>
            
            <div className="flex flex-1 overflow-hidden">
                {/* FIXED: We now cleanly pass the activeView string variable state parameter down */}
                <Sidebar className="w-[280px] shrink-0" activeView={activeView} onViewChange={setActiveView}/>
                
                <main className="flex-1 overflow-y-auto p-6">
                    <div className="w-full">
                        {renderMainContent()}
                    </div>
                </main>
            </div>
        </div>
    );
}