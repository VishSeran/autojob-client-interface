import { LoaderCircle, Sparkles } from "lucide-react";
import AutoJobLogoLight from "../assets/autojob_logo_light.svg";

export default function DashboardLoading() {

    return (

        
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50">

            
            <div className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />

            <div className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-violet-500/10 blur-3xl" />

            
            <div className="relative z-10 flex flex-col items-center">

                
                <div className="relative mb-8">

                    
                    <div className="absolute inset-0 rounded-2xl bg-blue-500/20 blur-xl" />

                    <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-slate-200 bg-slate-950 shadow-xl">
                        <img src={AutoJobLogoLight} alt="Autojob logo" className="h-12 w-12" />
                    </div>

                    
                    <div className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-blue-600 shadow-lg">
                        <Sparkles className="h-3.5 w-3.5 text-white" />
                    </div>
                </div>

                
                <h1 className="bg-linear-to-r from-blue-600 to-violet-500 bg-clip-text text-2xl font-bold text-transparent">
                    AutoJob
                </h1>

                
                <div className="mt-8">
                    <LoaderCircle className="h-7 w-7 animate-spin text-blue-600" />
                </div>

               
                <div className="mt-5 text-center">

                    <h2 className="text-base font-semibold text-slate-800">
                        Preparing your dashboard
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Loading your profile and preferences
                    </p>

                </div>

                
                <div className="mt-5 flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-500" />
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-500 [animation-delay:200ms]" />
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-500 [animation-delay:400ms]" />
                </div>

            </div>

            
            <div className="absolute bottom-8 left-0 right-0 text-center">
                <p className="text-xs text-slate-400">
                    Your AI-powered career assistant
                </p>
            </div>

        </div>
    );
}