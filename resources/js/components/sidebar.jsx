import { Link, router, usePage } from "@inertiajs/react";

export default function Sidebar({ className, onViewChange, activeView }) {
    const { auth } = usePage().props;

    const logout = () => {
        router.post(route("logout"));
    };

    return (
        <aside className={`${className || ""} shrink-0`}>

            <div className="border-r border-white/10 h-full flex flex-col justify-between">

                {/* Workspace */}
                <div className="flex flex-col mx-10 my-10 gap-6">

                    <span className="text-lg text-white/50 uppercase">
                        Workspace
                    </span>

                    <div className="w-full flex flex-col gap-2">

                        {/* My Notes */}
                        <button
                            type="button"
                            onClick={() => onViewChange("my-note")}
                            className={`flex items-center gap-2 py-2 px-3 rounded-xl cursor-pointer transition-all
                                ${
                                    activeView === "my-note"
                                        ? "bg-indigo-600 font-semibold text-white"
                                        : "text-white/60 hover:text-white hover:bg-white/10"
                                }`}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="size-5"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 1 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
                                />
                            </svg>

                            My Notes
                        </button>

                        {/* Favorites */}
                        <button
                            type="button"
                            onClick={() => onViewChange("favorites")}
                            className={`flex items-center gap-2 py-2 px-3 rounded-xl cursor-pointer transition-all
                                ${
                                    activeView === "favorites"
                                        ? "bg-indigo-600 font-semibold text-white"
                                        : "text-white/60 hover:text-white hover:bg-white/10"
                                }`}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="size-5"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.563.563 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                                />
                            </svg>

                            Favourites
                        </button>

                    </div>
                </div>

                {/* Bottom section */}
                <div className="flex flex-col mx-10 gap-3 mb-6">

                    {/* Settings */}
                    <button
                        type="button"
                        className="flex items-center gap-2 text-white/60 hover:text-white hover:bg-white/10 py-2 px-3 rounded-xl cursor-pointer transition-all"
                    >
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
                                d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.165-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.25-.806.108-1.204-.165-.398-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z"
                            />

                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                            />
                        </svg>

                        Settings
                    </button>

                    {/* Profile */}
                    {auth?.user && (
                        <button
                            type="button"
                            className="flex items-center gap-2 text-white/60 hover:text-white hover:bg-white/10 py-2 px-3 rounded-xl cursor-pointer transition-all"
                        >
                            <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-semibold">
                                {auth.user.name?.charAt(0).toUpperCase()}
                            </div>

                            <span className="truncate">
                                {auth.user.name.toUpperCase()}
                            </span>
                        </button>
                    )}

                </div>
            </div>
        </aside>
    );
}