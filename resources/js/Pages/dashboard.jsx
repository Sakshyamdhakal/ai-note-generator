import { useState } from "react";
import Dashboardnavbar from "../components/dashboard-navbar";
import Sidebar from "../components/sidebar";
import Newnote from "./newnote";

function NewNoteView() {
    return <div className="p-6">📝 New Note Interface goes here</div>;
}

function HistoryView() {
    return <div className="p-6">⏳ History View goes here</div>;
}

function FavoritesView() {
    return <div className="p-6">⭐ Favorites View goes here</div>;
}

function TrashView() {
    return <div className="p-6">⭐ Trash View goes here</div>;
}

function DefaultDashboardHome() {
    return <div className="p-6">🏠 Welcome to your Dashboard Home</div>;
}

export default function dashboard() {
    const [activeView, setActiveView] = useState("home");
    const renderMainContent = () => {
        switch (activeView) {
            case "new-note":
                return <Newnote />;
            case "history":
                return <HistoryView />;
            case "favorites":
                return <FavoritesView />;
            case "trash":
                return <TrashView />;
            default:
                return <DefaultDashboardHome />;
        }
    };
    return (
        <>
            <div className="h-screen flex flex-col bg-[#090D16] text-slate-100 font-sans selection:bg-indigo-500/30 selection:text-indigo-200 overflow-x-hidden relative">
                <Dashboardnavbar onViewChange={setActiveView}/>
                <div className="flex flex-1 overflow-hidden">
                    <Sidebar classname={"w-100"} onViewChange={setActiveView}/>
                    <main>
                        <div>{renderMainContent()}</div>
                    </main>
                </div>
            </div>
        </>
    );
}
