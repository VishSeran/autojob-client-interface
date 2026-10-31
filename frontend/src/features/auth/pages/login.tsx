import { ArrowRight, BrainCircuit, BriefcaseBusiness, CheckCircle, CircleDot, Eye, EyeOff, FileSearch, LoaderCircle, LockIcon, LockKeyhole, Mail, MailCheck, Sparkles } from "lucide-react";
import AutoJobLogoLight from "../../../assets/autojob_logo_light.svg";
import AutoJobLogoDark from "../../../assets/autojob_logo_dark.svg?react";
import { Link} from "react-router-dom";
import { useState, type SubmitEvent } from "react";
import { useNavigate } from "react-router-dom";
import {toast} from "sonner"

export default function LogIn() {

    const navigate = useNavigate()

    const[showPassword, setShowPassword] = useState(false)
    const[isLoading, setIsLoading] = useState(false)
    const[email, setEmail] = useState("")
    const[password, setPassword] = useState("")
    const[error, setError] = useState("") 


    const handleSubmit = async (
        event: SubmitEvent <HTMLFormElement>
    ) => {

        event.preventDefault();
        if (isLoading) return;

        setError("")
        setIsLoading(true)

        try{

            const response = await fetch(
                "http://127.0.0.1:8000/auth/login",

                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(
                            {
                            email,
                            password
                        }
                    )
                }
            );

            if (!response.ok) {
                toast.error("Login failed",
                    {
                        description:"Incorrect email or password. Please try again."
                    }
                )
                throw new Error("Login failed")
            }

            console.log("Login successful");
            setEmail("")
            setPassword("")
            navigate("/dashboard",{
                replace:true
            })

        }catch (error) {
            console.error("Login error:", error);
            setError("Unable to connect to the server.");
        }finally{
            setIsLoading(false)
        }
    }

    return (

        <div className="min-h-screen lg:grid lg:grid-cols-[55%_45%]">


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
                    <div className="flex mb-10 items-center gap-4">
                        <AutoJobLogoDark className="h-12 w-12 shadow-2xl"/>

                        <span className="text-5xl font-bold bg-linear-to-r from-blue-500 to-violet-400
                            bg-clip-text text-transparent"> AutoJob </span>
                    </div>

                    <div className="flex-col mb-8 gap-3 ">

                        <div className="flex">
                            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                                Welcome back
                            </h2>

                        </div>

                        <div className="flex gap-2">

                            <p className="text-xl font-medium tracking-tight text-slate-500">
                                Sign in to continue your 
                            </p>

                            <span className="text-xl font-medium tracking-tight block
                            bg-linear-to-r from-red-400 to-violet-400 bg-clip-text text-transparent"> AI-Powered job search</span>
                        </div>

                    </div>

                    <div className="relative mt-12 rounded-2xl border border-white/10 bg-white/10
                    shadow-2xl backdrop-blur-xl p-5">
                        
                        <form onSubmit={handleSubmit} className="flex flex-col mt-2 gap-3 w-full z-10 ">

                            <div className="flex flex-col gap-3">
                                <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-700">Email Address</label>

                                <div className="relative">
                                    <Mail size={19} className="pointer-events-none absolute top-1/2 left-6 -translate-y-1/2
                                    text-slate-400" />

                                    <input id="email" className="w-full h-12 rounded-xl border border-slate-200 bg-white pr-4 pl-12
                                    text-sm text-shadow-slate-900 outline-none transform-all placeholder:text-slate-400
                                    focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10" 
                                    name="email" type="email" placeholder="Email" value={email}
                                    onChange={(e) => setEmail(e.target.value)}/>

                                </div>
                            </div>

                            <div className="flex flex-col gap-3">

                                <div className="flex justify-between">
                                    <label htmlFor="password" className="mb-2 block text-sm font-medium text-slate-700">Password </label>
                                    
                                    <Link to= "/forgot-password"
                                        className="text-sm font-semibold text-blue-600  hover:text-blue-700"> 
                                        Forgot password?</Link>

                                </div>

                                <div className="relative">
                                    <LockKeyhole size={19} className="pointer-events-none absolute top-1/2 left-6 -translate-y-1/2
                                    text-slate-400" />

                                    

                                    <input className="w-full h-12 rounded-xl border border-slate-200 bg-white pr-4 pl-12
                                    text-sm text-shadow-slate-900 outline-none transform-all placeholder:text-slate-400
                                    focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10" 
                                    id="password"
                                    name="password" 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    type={showPassword? "text": "password"} 
                                    placeholder="Password"
                                    autoComplete="current-password"/>

                                    <button type="button"
                                    aria-label= {showPassword? "Hide password": "Show password"}
                                    aria-pressed={showPassword}
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute top-1/2 right-4 -translate-y-1/2 text-slate-400
                                    transition hover:text-slate-700">
                                            {
                                                showPassword? (
                                                    <EyeOff size={19}/>
                                                ) : (
                                                    <Eye size={19}/>
                                                )
                                            }
                                    </button>

                                </div>
                            </div>

                            <button type="submit" disabled={isLoading} 
                            className="flex mt-3 h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 text-sm font-semibold text-white shadow-lg shadow-blue-600/15 transition-all hover:bg-blue-700 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60">
                                {
                                    isLoading ? (
                                        <>
                                            <LoaderCircle size={18} className="animate-spin"/>
                                            Signing in...
                                        </>
                                    ): (
                                        <>
                                            Sign in to AutoJob
                                            <ArrowRight size={19}/>
                                        </>
                                    )
                                }
                            </button>

                        </form>

                        <p className="mt-8 text-center text-sm text-shadow-slate-900">
                            Don't have an account?{" "}

                            <Link to="/signup" className="font-semibold text-blue-600 hover:text-blue-700">
                                Create an account
                            </Link>
                        </p>
                    </div>

                    <p className="mt-12 text-center text-xs text-slate-400">
                        Your next opportunity starts here.
                    </p>
                    
                </div>
            </div>

        </div>
    )
}