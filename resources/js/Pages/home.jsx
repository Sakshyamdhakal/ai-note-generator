export default function Home() {
    const currentYear = new Date().getFullYear();

    return (
        <div className="min-h-screen bg-[#090D16] text-slate-100 font-sans selection:bg-indigo-500/30 selection:text-indigo-200 overflow-x-hidden relative">
            <div className="absolute top-0 left-3/6 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

            {/*** nav-bar section ***/}

            <header className="w-full fixed top-0 z-50 backdrop-blur-md bg-[#090D16]/70 border-b border-white/[0.05]">
                <div className="max-w-7xl mx-auto px-5 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-2 font-bold text-xl tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                        <span className="text-indigo-500">NoteForge</span>
                    </div>
                    <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
                        <a
                            href="#preview"
                            className="hover:text-white transition-colors"
                        >
                            Preview
                        </a>
                        <a
                            href="#features"
                            className="hover:text-white transition-colors"
                        >
                            Features
                        </a>
                        <a
                            href="#howtouse"
                            className="hover:text-white transition-colors"
                        >
                            How to use
                        </a>
                        <a
                            href="#pricing"
                            className="hover:text-white transition-colors"
                        >
                            Pricing
                        </a>
                        <a
                            href="#termsofservice"
                            className="hover:text-white transition-colors"
                        >
                            Terms of Service
                        </a>
                        <a
                            href="#contacts"
                            className="hover:text-white transition-colors"
                        >
                            Contacts
                        </a>
                    </nav>
                    <div className="hidden lg:flex items-center gap-3 text-sm font-medium text-slate-400">
                        <button className="px-5 py-2.5 rounded-xl bg-white text-sm font-semibold text-[#090D16] hover:bg-slate-200 transition-all shadow-lg shadow-white/5">
                            Launch App
                        </button>
                        <button className="px-5 py-2.5 rounded-xl bg-white text-sm font-semibold text-[#090D16] hover:bg-slate-200 transition-all shadow-lg shadow-white/5">
                            SignUp
                        </button>
                        <button className="px-5 py-2.5 rounded-xl bg-white text-sm font-semibold text-[#090D16] hover:bg-slate-200 transition-all shadow-lg shadow-white/5">
                            Login
                        </button>
                    </div>
                </div>
            </header>

                {/* Intro-part */}

            <section className="max-w-5xl mx-auto my-30 px-6 pt-24 pb-16 text-center relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-xs font-semibold text-indigo-400 mb-8">
                    Powered by Gemini AI
                </div>

                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.1] mb-6">
                    Your notes, structured by{" "}
                    <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                        AI.
                    </span>
                </h1>

                <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 font-normal leading-relaxed">
                    Write naturally, and let the AI engine summarize, extract
                    tasks, and format your notes automatically.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
                    <button className="w-full cursor-pointer sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 font-semibold text-white shadow-xl shadow-indigo-500/20 hover:opacity-95 transition-opacity">
                        Start Generating Free
                    </button>
                    <button className="w-full cursor-pointer sm:w-auto px-8 py-4 rounded-xl bg-white/[0.03] border border-white/[0.08] font-semibold text-slate-300 hover:bg-white/[0.06] hover:text-white transition-all">
                        Watch tutorial
                    </button>
                </div>
            </section>

            {/* App preview section */}

            <section id="preview" className="max-w-6xl mx-auto px-6 pb-32 scroll-mt-30">
                <img
                    src="https://designshack.net/wp-content/uploads/What-is-an-Adaptive-UI.jpg"
                    alt=""
                />
            </section>

            {/* Features section  */}

            <div className="flex justify-center items-center my-12">
                <span className="inline-flex items-center gap-x-1.5 rounded-full bg-indigo-500/10 px-4 py-1.5 text-lg font-semibold text-indigo-400 ring-1 ring-inset ring-indigo-500/20 backdrop-blur-md tracking-wide uppercase">
                    <span className="h-2 w-2 rounded-full bg-indigo-500 animate-pulse" />
                    Features
                </span>
            </div>
            <section
                id="features"
                className="max-w-7xl mx-auto px-20 pb-32 grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10 justify-items-center scroll-mt-50"
            >
                <div className="w-full max-w-md p-8 rounded-2xl border border-white/[0.04] bg-white/[0.01] hover:border-white/[0.08] transition-all">
                    <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-6 text-indigo-400">
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13 10V3L4 14h7v7l9-11h-7z"
                            />
                        </svg>
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-2">
                        Fast Processing
                    </h4>
                    <p className="text-sm text-slate-400 leading-relaxed">
                        Optimized endpoints deliver text adjustments and
                        summaries in real time.
                    </p>
                </div>

                <div className="w-full max-w-md p-8 rounded-2xl border border-white/[0.04] bg-white/[0.01] hover:border-white/[0.08] transition-all">
                    <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-6 text-cyan-400">
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                            />
                        </svg>
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-2">
                        Automatic Organization
                    </h4>
                    <p className="text-sm text-slate-400 leading-relaxed">
                        Notes are tagged and categorized automatically based on
                        their content.
                    </p>
                </div>

                <div className="w-full max-w-md p-8 rounded-2xl border border-white/[0.04] bg-white/[0.01] hover:border-white/[0.08] transition-all">
                    <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-6 text-purple-400">
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                            />
                        </svg>
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-2">
                        Secure by Default
                    </h4>
                    <p className="text-sm text-slate-400 leading-relaxed">
                        Your notes are safe in our cloud and is easily
                        accessible too.
                    </p>
                </div>

                <div className="w-full max-w-md p-8 rounded-2xl border border-white/[0.04] bg-white/[0.01] hover:border-white/[0.08] transition-all">
                    <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-6 text-purple-400">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="size-6"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                            />
                        </svg>
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-2">
                        Humanize Notes
                    </h4>
                    <p className="text-sm text-slate-400 leading-relaxed">
                        Rewrites notes to sound more natural and conversational.
                    </p>
                </div>

                <div className="w-full max-w-md p-8 rounded-2xl border border-white/[0.04] bg-white/[0.01] hover:border-white/[0.08] transition-all">
                    <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-6 text-indigo-400">
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13 10V3L4 14h7v7l9-11h-7z"
                            />
                        </svg>
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-2">
                        Easy Download
                    </h4>
                    <p className="text-sm text-slate-400 leading-relaxed">
                        Generated notes can be easily downloaded in any kind of
                        format.
                    </p>
                </div>
            </section>

            {/* How to use  */}

            <div className="flex justify-center items-center my-12">
                <span className="inline-flex items-center gap-x-1.5 rounded-full bg-indigo-500/10 px-4 py-1.5 text-lg font-semibold text-indigo-400 ring-1 ring-inset ring-indigo-500/20 backdrop-blur-md tracking-wide uppercase">
                    <span className="h-2 w-2 rounded-full bg-indigo-500 animate-pulse" />
                    How to use
                </span>
            </div>
            <section
                id="howtouse"
                className="max-w-7xl mx-auto px-6 sm:px-12 md:px-20 pb-24 grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10 scroll-mt-50"
            >
                <div className="flex flex-col justify-center space-y-4">
                    <div className="inline-flex items-center gap-2 rounded-full bg-indigo-500/10 px-4 py-1.5 text-xs font-semibold text-indigo-400 ring-1 ring-inset ring-indigo-500/20 w-fit uppercase tracking-wider">
                        <span>Workflow</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-4 h-4"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m16.49 12 3.75 3.75m0 0-3.75 3.75m3.75-3.75H3.74V4.499"
                            />
                        </svg>
                    </div>

                    <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                        Get started in just{" "}
                        <span className="text-indigo-500">
                            three simple steps
                        </span>
                    </h2>

                    <p className="text-base text-slate-500 dark:text-slate-400 max-w-md">
                        Our intuitive platform is built to get you up and
                        running instantly. Follow this quick guide to dive
                        straight into the new interface.
                    </p>
                </div>

                <div className="relative border-l border-slate-200 dark:border-slate-800 ml-4 md:ml-0 pl-6 space-y-10 py-2">
                    <div className="relative">
                        <span className="absolute -left-[39px] top-0 flex h-6 w-6 items-center justify-center rounded-full bg-indigo-500 text-[11px] font-bold text-white ring-8 ring-white dark:ring-slate-950">
                            1
                        </span>
                        <div className="space-y-1.5">
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                                Sign Up or Log In
                            </h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                                Create a secure account or authenticate with
                                your existing credentials to access your
                                personalized workspace.
                            </p>
                        </div>
                    </div>

                    <div className="relative">
                        <span className="absolute -left-[39px] top-0 flex h-6 w-6 items-center justify-center rounded-full bg-indigo-500 text-[11px] font-bold text-white ring-8 ring-white dark:ring-slate-950">
                            2
                        </span>
                        <div className="space-y-1.5">
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                                Launch the App
                            </h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                                Once inside, a prominent{" "}
                                <span className="font-semibold text-indigo-500 dark:text-indigo-400">
                                    "Launch App"
                                </span>{" "}
                                button will pop up dynamically on your home
                                page. Give it a click to initialize the
                                environment.
                            </p>
                        </div>
                    </div>

                    <div className="relative">
                        <span className="absolute -left-[39px] top-0 flex h-6 w-6 items-center justify-center rounded-full bg-indigo-500 text-[11px] font-bold text-white ring-8 ring-white dark:ring-slate-950">
                            3
                        </span>
                        <div className="space-y-1.5">
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                                Explore the New Interface
                            </h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                                A powerful, dedicated dashboard interface
                                unfolds right before you. From here, you can
                                seamlessly manage your projects, track
                                analytics, and optimize your workflows.
                            </p>
                        </div>
                    </div>
                </div>
            </section>


            {/* price listing  */}

            <div className="flex justify-center items-center my-12">
                <span className="inline-flex items-center gap-x-1.5 rounded-full bg-indigo-500/10 px-4 py-1.5 text-lg font-semibold text-indigo-400 ring-1 ring-inset ring-indigo-500/20 backdrop-blur-md tracking-wide uppercase">
                    <span className="h-2 w-2 rounded-full bg-indigo-500 animate-pulse" />
                    Price Listing
                </span>
            </div>
            <section
                id="pricing"
                className="max-w-7xl mx-auto px-20 pb-24 grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10 scroll-mt-50"
            >
                {/* Free Plan */}
                <div className="w-full h-120 rounded-2xl border border-slate-200 dark:border-white/[0.04] bg-white dark:bg-white/[0.05] hover:border-indigo-500/50 dark:hover:border-white/[0.08] transition-all px-7 py-8 flex flex-col justify-between">
                    <div>
                        <div className="flex flex-col text-slate-900 dark:text-white gap-4">
                            <label className="text-2xl font-bold tracking-tight">
                                Free
                            </label>
                            <div className="flex items-baseline">
                                <span className="text-slate-400 dark:text-white/50 text-xl font-medium">
                                    $
                                </span>
                                <span className="text-5xl font-black tracking-tight mx-1">
                                    0
                                </span>
                                <span className="text-slate-400 dark:text-white/50 text-sm font-medium">
                                    USD/month
                                </span>
                            </div>
                        </div>

                        <ul className="flex flex-col gap-3 mt-8 text-sm text-slate-600 dark:text-white/80">
                            <li className="flex items-center gap-2.5">
                                <svg
                                    className="w-4 h-4 text-indigo-500 shrink-0"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="2"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4.5 12.75l6 6 9-13.5"
                                    />
                                </svg>
                                Core model access
                            </li>
                            <li className="flex items-center gap-2.5">
                                <svg
                                    className="w-4 h-4 text-indigo-500 shrink-0"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="2"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4.5 12.75l6 6 9-13.5"
                                    />
                                </svg>
                                Limited messages & uploads
                            </li>
                            <li className="flex items-center gap-2.5">
                                <svg
                                    className="w-4 h-4 text-indigo-500 shrink-0"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="2"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4.5 12.75l6 6 9-13.5"
                                    />
                                </svg>
                                Limited note creation
                            </li>
                            <li className="flex items-center gap-2.5">
                                <svg
                                    className="w-4 h-4 text-indigo-500 shrink-0"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="2"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4.5 12.75l6 6 9-13.5"
                                    />
                                </svg>
                                Limited memory
                            </li>
                        </ul>
                    </div>

                    <button className="w-full py-3 bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/15 border border-slate-200 dark:border-white/10 rounded-xl text-slate-900 dark:text-white text-sm font-semibold tracking-wide transition-colors cursor-pointer">
                        Get Started
                    </button>
                </div>

                {/* Pro Plan (Highlighted) */}
                <div className="w-full h-120 rounded-2xl border-2 border-indigo-500 bg-white dark:bg-white/[0.07] shadow-xl shadow-indigo-500/5 px-7 py-8 flex flex-col justify-between relative">
                    <span className="absolute -top-3 right-6 bg-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                        Popular
                    </span>
                    <div>
                        <div className="flex flex-col text-slate-900 dark:text-white gap-4">
                            <label className="text-2xl font-bold tracking-tight">
                                Pro
                            </label>
                            <div className="flex items-baseline">
                                <span className="text-slate-400 dark:text-white/50 text-xl font-medium">
                                    $
                                </span>
                                <span className="text-5xl font-black tracking-tight mx-1">
                                    20
                                </span>
                                <span className="text-slate-400 dark:text-white/50 text-sm font-medium">
                                    USD/month
                                </span>
                            </div>
                        </div>

                        <ul className="flex flex-col gap-3 mt-8 text-sm text-slate-600 dark:text-white/80">
                            <li className="flex items-center gap-2.5">
                                <svg
                                    className="w-4 h-4 text-indigo-500 shrink-0"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="2"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4.5 12.75l6 6 9-13.5"
                                    />
                                </svg>
                                Advanced computing models
                            </li>
                            <li className="flex items-center gap-2.5">
                                <svg
                                    className="w-4 h-4 text-indigo-500 shrink-0"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="2"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4.5 12.75l6 6 9-13.5"
                                    />
                                </svg>
                                Unlimited message allocations
                            </li>
                            <li className="flex items-center gap-2.5">
                                <svg
                                    className="w-4 h-4 text-indigo-500 shrink-0"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="2"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4.5 12.75l6 6 9-13.5"
                                    />
                                </svg>
                                Rich media notes studio
                            </li>
                            <li className="flex items-center gap-2.5">
                                <svg
                                    className="w-4 h-4 text-indigo-500 shrink-0"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="2"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4.5 12.75l6 6 9-13.5"
                                    />
                                </svg>
                                Extended contextual memory
                            </li>
                        </ul>
                    </div>

                    <button className="w-full py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl text-sm font-semibold tracking-wide transition-colors shadow-lg shadow-indigo-500/20 cursor-pointer">
                        Upgrade to Pro
                    </button>
                </div>

                {/* Team Plan */}
                <div className="w-full h-120 rounded-2xl border border-slate-200 dark:border-white/[0.04] bg-white dark:bg-white/[0.05] hover:border-indigo-500/50 dark:hover:border-white/[0.08] transition-all px-7 py-8 flex flex-col justify-between">
                    <div>
                        <div className="flex flex-col text-slate-900 dark:text-white gap-4">
                            <label className="text-2xl font-bold tracking-tight">
                                Team
                            </label>
                            <div className="flex items-baseline">
                                <span className="text-slate-400 dark:text-white/50 text-xl font-medium">
                                    $
                                </span>
                                <span className="text-5xl font-black tracking-tight mx-1">
                                    50
                                </span>
                                <span className="text-slate-400 dark:text-white/50 text-sm font-medium">
                                    USD/month
                                </span>
                            </div>
                        </div>

                        <ul className="flex flex-col gap-3 mt-8 text-sm text-slate-600 dark:text-white/80">
                            <li className="flex items-center gap-2.5">
                                <svg
                                    className="w-4 h-4 text-indigo-500 shrink-0"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="2"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4.5 12.75l6 6 9-13.5"
                                    />
                                </svg>
                                Everything in Pro plan
                            </li>
                            <li className="flex items-center gap-2.5">
                                <svg
                                    className="w-4 h-4 text-indigo-500 shrink-0"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="2"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4.5 12.75l6 6 9-13.5"
                                    />
                                </svg>
                                Shared workspace & tooling
                            </li>
                            <li className="flex items-center gap-2.5">
                                <svg
                                    className="w-4 h-4 text-indigo-500 shrink-0"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="2"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4.5 12.75l6 6 9-13.5"
                                    />
                                </svg>
                                Centralized administrative panel
                            </li>
                            <li className="flex items-center gap-2.5">
                                <svg
                                    className="w-4 h-4 text-indigo-500 shrink-0"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="2"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4.5 12.75l6 6 9-13.5"
                                    />
                                </svg>
                                Priority support channels
                            </li>
                        </ul>
                    </div>

                    <button className="w-full py-3 bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/15 border border-slate-200 dark:border-white/10 rounded-xl text-slate-900 dark:text-white text-sm font-semibold tracking-wide transition-colors cursor-pointer">
                        Contact Sales
                    </button>
                </div>
            </section>

            {/* termsofservice */}

            <div className="flex justify-center items-center my-12">
                <span className="inline-flex items-center gap-x-1.5 rounded-full bg-indigo-500/10 px-4 py-1.5 text-lg font-semibold text-indigo-400 ring-1 ring-inset ring-indigo-500/20 backdrop-blur-md tracking-wide uppercase">
                    <span className="h-2 w-2 rounded-full bg-indigo-500 animate-pulse" />
                    Terms of service
                </span>
            </div>
            <section
                id="termsofservice"
                className="scroll-mt-100 max-w-7xl mx-auto px-6 sm:px-12 md:px-20 pb-24 grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10 items-center"
            >
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white mb-3">
                        Terms of Service
                    </h2>
                    <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                        By accessing our platform and launching the app, you
                        agree to abide by our standard usage guidelines, account
                        security protocols, and system policies. Please ensure
                        you review our full legal framework to understand your
                        rights and responsibilities as a user.
                    </p>
                </div>

                <div className="flex md:justify-end items-center">
                    <a
                        href="/terms"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors group"
                    >
                        Read Full Terms of Service
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            className="w-4 h-4 transform group-hover:translate-x-2 transition-transform"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                            />
                        </svg>
                    </a>
                </div>
            </section>

            {/* Contact section */}

            <div className="flex justify-center items-center my-12">
                <span className="inline-flex items-center gap-x-1.5 rounded-full bg-indigo-500/10 px-4 py-1.5 text-lg font-semibold text-indigo-400 ring-1 ring-inset ring-indigo-500/20 backdrop-blur-md tracking-wide uppercase">
                    <span className="h-2 w-2 rounded-full bg-indigo-500 animate-pulse" />
                        Get in touch
                </span>
            </div>
            <section
                id="contacts"
                className="max-w-7xl mx-auto px-20 pb-24 grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10"
            >
                <div className="flex flex-col justify-center space-y-4">

                    <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                        Let's start a{" "}
                        <span className="text-indigo-500">conversation</span>
                    </h2>

                    <p className="text-base text-slate-500 dark:text-slate-400 max-w-md leading-relaxed">
                        Have questions about our plans, features, or platform
                        capabilities? Drop us a message and our support
                        engineering team will reach out shortly.
                    </p>

                    <div className="pt-4 space-y-3 text-sm text-slate-600 dark:text-slate-400">
                        <div className="flex items-center gap-3">
                            <svg
                                className="w-5 h-5 text-indigo-500 shrink-0"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="2"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0l-7.5-4.615a2.25 2.25 0 01-1.07-1.916V6.75"
                                />
                            </svg>
                            <span>codeslashsupport@gmail.com</span>
                        </div>
                    </div>
                </div>

                <div className="w-full rounded-2xl border border-slate-200 dark:border-white/[0.04] bg-white dark:bg-white/[0.05] px-8 py-8 shadow-xl shadow-slate-100 dark:shadow-none">
                    <form
                        className="flex flex-col gap-5"
                        onSubmit={(e) => e.preventDefault()}
                    >
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                                Full Name
                            </label>
                            <input
                                type="text"
                                placeholder="John Doe"
                                className="w-full px-4 py-3 text-sm rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-white/30 focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-500 transition-colors"
                            />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                                Email Address
                            </label>
                            <input
                                type="email"
                                placeholder="john@example.com"
                                className="w-full px-4 py-3 text-sm rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-white/30 focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-500 transition-colors"
                            />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                                Message
                            </label>
                            <textarea
                                rows="4"
                                placeholder="How can we help your team?"
                                className="w-full px-4 py-3 text-sm rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-white/30 focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-500 transition-colors resize-none"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 mt-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl text-sm font-semibold tracking-wide transition-colors shadow-lg shadow-indigo-500/20 cursor-pointer"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </section>

            <footer className="border-t border-white/[0.05] py-8 text-center text-xs text-slate-600">
                &copy; {currentYear} {"NoteForge AI. Powered by CodeSlash </>"}
            </footer>
        </div>
    );
}
