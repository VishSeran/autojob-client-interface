import { BrainCircuit, BriefcaseBusiness, CheckCircle, CircleDot, FileSearch, MailCheck, Sparkles } from "lucide-react";
import LogInForm from "../components/login_form";
import AutoJobLogoLight from "../../../assets/autojob_logo_light.svg";
import AutoJobLogoDark from "../../../assets/autojob_logo_dark.svg?react";


export default function LogIn() {

    return (

        <div className="min-h-screen bg-white lg:grid lg:grid-cols-[55%_45%]">


            <div className="relative hidden min-h-screen overflow-hidden bg-slate-950 p-10 xl:p-16 text-white flex-col lg:flex">


                {/*Background Effect*/}

                <div className="pointer-events-none absolute -left-32 top-32 h-80 w-80 bg-blue-600/20 blur-3xl rounded-full"/>
                <div className="pointer-events-none absolute -right-32 bottom-20 h-96 w-96 bg-violet-600/20 blur-3xl rounded-full"/>

                {/*Logo*/}

                <div className="realtive flex z-10 gap-3 items-center">
                    
                    <div className="rounded-xl bg-blue-600/ p-2.5">
                        <img src={AutoJobLogoLight} className="h-12 w-12" alt="AutoJob logo" />
                    </div>

                    <span className="text-3xl font-bold shadow-2xl tracking-tight">
                        AutoJob
                    </span>
                </div>

                {/*Main Content*/}
                <div className="relative z-10  mx-auto w-full max-w-lg">

                    <div className="inline-flex gap-2 mb-8 items-center rounded-full
                    border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-lg text-blue-300">
                        <Sparkles className="h-6 w-6 text-blue-500"/>

                        <span>Your AI career assistant</span>
                        
                    </div>

                    <h1 className="text-4xl leading-tight font-bold tracking-tight xl:text-5xl">
                        Your next opportunity

                        <span className="mt-2 block bg-linear-to-r from-blue-400 to-violet-400
                                        bg-clip-text text-transparent xl:text-4xl text-3xl">
                        Powered by AI.
                    </span>
                    </h1>

                    <p className="mt-3 text-base max-w-md leading-7 text-slate-700">
                        Discover relevant jobs, analyze opportunities,
                        and prepare personalized applications through
                        intelligent AI workflows.
                    </p>

                </div>


                {/* Workflow visualization */}
                <div className="relative mt-12 rounded-2xl border border-white/10 bg-white/5
                shadow-2xl backdrop-blur-xl p-5">

                    <div className="mb-6 flex items-center justify-between">
                        <div className="flex gap-2 items-center">
                            <CircleDot className="h-4 w-4 text-green-400 shadow-2xl"/>
                            <span className="text-sm font-medium">
                                AI Workflow
                            </span>

                        </div>

                        <span className="rounded-full bg-green-500/10 px-3 py-2 text-sm text-green-400">
                            Active 
                        </span>

                    </div>

                    {/*Node 1*/}

                    <div className="flex items-center gap-4 rounded-xl border
                    border-white/10 bg-slate-900/90 p-4">

                        <div className="rounded-lg bg-blue-500/15 p-3">
                            <FileSearch  className="h-5 w-5 text-blue-400"/>
                        </div>

                        <div className="flex-1">

                            <p className="font-semibold text-sm">
                                Job Discovery
                            </p>

                            <p className="text-xs text-slate-400">
                                Finding matching opportunities
                            </p>

                        </div>

                        <CheckCircle className="h-5 w-5 text-green-400"/>

                    </div>

                    {/*connector*/}
                    <div className="ml-9 h-6 w-px bg-linear-to-b from-blue-400 to-violet-400"/>


                    {/*node 2*/}

                    <div className="flex items-center gap-4 rounded-xl border
                    border-white/10 bg-slate-900/90 p-4">

                        <div className="rounded-lg bg-blue-500/15 p-3">
                            <BrainCircuit  className="h-5 w-5 text-purple-400"/>
                        </div>

                        <div className="flex-1">

                            <p className="font-semibold text-sm">
                                AI Relevance Analysis
                            </p>

                            <p className="text-xs text-slate-400">
                                Matching your skills to jobs
                            </p>

                        </div>

                        <p className="rounded-lg bg-violet-500/15 text-violet-300 px-2 py-1 text-sm">AI</p>

                    </div>

                    {/*connector*/}
                    <div className="ml-9 h-6 w-px bg-linear-to-b from-blue-400 to-violet-400"/>


                    {/*node 3*/}

                    <div className="flex items-center gap-4 rounded-xl border
                    border-white/10 bg-slate-900/90 p-4">

                        <div className="rounded-lg bg-blue-500/15 p-3">
                            <MailCheck  className="h-5 w-5 text-blue-400"/>
                        </div>

                        <div className="flex-1">

                            <p className="font-semibold text-sm">
                                Application Review
                            </p>

                            <p className="text-xs text-slate-400">
                                Review and approve before sending
                            </p>

                        </div>

                        <p className="rounded-lg bg-amber-500/10 text-amber-300 px-2 py-1 text-sm">Approve</p>

                    </div>
                </div>

                {/* Floating detail */}
                <div className="flex gap-3 mt-5 items-center text-sm text-slate-400">

                    <BriefcaseBusiness className="h-4 w-4 text-blue-400"/>
                    Intelligent job search and application automation

                </div>

                {/* Footer */}

                <div className="relative z-10 text-sm text-slate-400">
                    © {new Date().getFullYear()} AutoJob.
                    Built for your next career move.
                </div>
                
            </div>

            {/* login form */}
            <div className="flex min-h-screen bg-white items-center justify-center px-6 py-12 
            sm:px-10 lg:px-16">

                <div className="w-full max-w-md">

                    {/*logo*/}
                    <div className="flex mb-10 items-center gap-3 ">
                        <AutoJobLogoDark className="h-12 w-12 shadow-2xl"/>

                        <span className="text-2xl font-bold text-slate-900"> AutoJob </span>
                    </div>
                    
                </div>
                <LogInForm/>
                
            </div>
        </div>
    )
}