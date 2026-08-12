import { useEffect, useState } from "react";
import Dashboardnavbar from "../components/dashboard-navbar";
import Sidebar from "../components/sidebar";
import Newnote from "./newnote";
import Noteslist from "./mynote";
import Favoritepage from "./favorite";

export default function Dashboard() {
    const [activeView, setActiveView] = useState("dashboard");

    useEffect(() => {
        const savedView = localStorage.getItem("app_active_view");

        if (savedView) {
            setActiveView(savedView);
        }
    }, []);

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
                return <Favoritepage />;

            default:
                return <Newnote />;
        }
    };

    return (
        <div className="h-screen flex flex-col bg-[#090D16] text-slate-100 font-sans selection:bg-indigo-500/30 selection:text-indigo-200 overflow-hidden relative">
            
            <Dashboardnavbar
                onViewChange={setActiveView}
                activeView={activeView}
            />

            <div className="flex flex-1 overflow-hidden">

                <Sidebar
                    className="w-[300px] shrink-0"
                    activeView={activeView}
                    onViewChange={setActiveView}
                />

                <main className="flex-1 overflow-y-auto p-6">
                    <div className="w-full">
                        {renderMainContent()}
                    </div>
                </main>

            </div>
        </div>
    );
}