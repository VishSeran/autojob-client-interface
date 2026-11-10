import { BotMessageSquareIcon, Rocket, WorkflowIcon } from "lucide-react";
import Header from "../../../components/header";
import { useState } from "react";
import { useResumes } from "../../../contexts/ResumeContext";
import { toast } from "sonner";
import api from "../../auth/api/axiosInstance";

export default function Workflow() {

    const[newWorkflow, setNewWorkflow] = useState(false);
    const[query, setQuery] = useState("");
    const[loading, setLoading] = useState(false);
    const[result, setResult] = useState();

    const {resumes} = useResumes();

    const defaultResume = resumes?.find(
        (resume) => resume.is_default
    );

    const workflowRequest = {
        query: query,
        resume_path: defaultResume?.id
    };

    const submitQuery = async() => {

        if (!query.trim()) {
            console.error("Query not found");
            toast.error("Query not found");
            return;
        }

        if (!defaultResume) {
            console.error("Default resume not found");
            toast.error("Default resume not found");
            return;
        }

        try{

            setLoading(true);

            const response = await api.post(
                "workflow/create",
                workflowRequest
            );
            
            const data = response.data;

            setResult(data.response);
            console.log(data.message);
            console.log("Workflow created:", data.workflow_id);

            toast.success(data.message, {
                description:"Let's find you a proper job"
            });

            console.log(data.response);
            setLoading(false);

        
        }catch(error){
            console.error("Unable to create a new workflow", error)
            toast.error("Unable to create a new workflow", {
                description: `${error}`
            })
        }
    }

    return (

        <div className="grid h-screen grid-rows-[auto_1fr]">

            <div>
                <Header />
            </div>

            <div className="grid grid-cols-[280px_1fr]">
                <div className=" bg-slate-950 shadow-3xl">
                    <div className="relative w-full h-full overflow-hidden ">

                        <div className="pointer-events-none absolute h-120 w-120 bg-blue-700/20 
                        -left-20 top-10 blur-3xl rounded-full"/>

                        <div className="pointer-events-none absolute h-120 w-120 bg-violet-700/20 blur-3xl 
                        -right-40 top-90 rounded-full"/>


                        <div className="relative flex flex-col h-full gap-3">

                            <h1 className="pt-10 text-slate-200 font-bold text-center text-base md:text-2xl
                            shadow-lg">WorkFlows</h1>

                            <div className="mt-5 pl-1  flex gap-3 justify-start transition-all duration-300 active:scale-95  
                            hover:bg-gray-400">
                                <button
                                onClick={() => setNewWorkflow(true)} 
                                className=" px-8 py-1 rounded-xl group">
                                    <div className="flex items-center gap-1 ">
                                        <WorkflowIcon className="text-slate-200 h-10 w-10 hidden md:flex"/>
                                        <span className="text-slate-100 text-sm md:text-base group-hover:font-semibold">New Workflow</span>

                                    </div>
                                </button>

                            </div>

                            <div className="mt-5 flex">
                                <h1 className="p-2 text-base font-semibold text-slate-500 tracking-widest">Recent workflows</h1>

                                <div>

                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="relative flex items-center justify-center">
                    {
                        newWorkflow && (
                            <div className="absolute bottom-10 flex justify-center items-center
                            text-black text-base border border-slate-300 bg-slate-100
                                w-full max-w-3xl rounded-2xl px-4 py-1 shadow-lg outline-none
                                focus:border-blue-500 focus:ring-2 focus:ring-blue-900/20">
                                
                                <textarea 
                                placeholder="Type your job requirement here"
                                value={query}
                                onChange={(e) => {
                                    setQuery(e.target.value);
                                    e.target.style.height = "auto";
                                    e.target.style.height = `${e.target.scrollHeight}px`
                                }}
                                
                                rows={1}
                                className="text-base bg-slate-100 text-slate-900
                                w-full max-w-3xl py-2 outline-none resize-none overflow-y-auto"
                                />

                        
                            <button 
                            onClick={submitQuery}
                            className="group shadow-lg bg-slate-100 rounded-full p-2 active:scale-90 transition-all duration-300">

                                <BotMessageSquareIcon className="text-violet-600 group-hover:hidden"/>
                                <Rocket
                                    className="text-violet-600 hidden group-hover:block"
                                />
                            </button>
                                

                            </div>

                        )
                    }
                </div>
            </div>

        </div>
    )
}