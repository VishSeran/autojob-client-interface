import { BotMessageSquareIcon, Check, Rocket, WorkflowIcon } from "lucide-react";
import Header from "../../../components/header";
import { useEffect, useState } from "react";
import { useResumes } from "../../../contexts/ResumeContext";
import { toast } from "sonner";
import api from "../../auth/api/axiosInstance";
import { useWorkflows } from "../../../contexts/WorkflowContext";
import type { InitialWorkflowResult } from "../../../types/workflow";

export default function Workflow() {

    const[newWorkflow, setNewWorkflow] = useState(false);
    const[query, setQuery] = useState("");
    const[loading, setLoading] = useState(false);
    const[result, setResult] = useState<InitialWorkflowResult | null>(null);
    const[currentWorkflow, setCurrentWorkflow] = useState("")
    const [visibleMessages, setVisibleMessages] = useState<typeof result.messages>([]);

    const {resumes} = useResumes();
    const {workflows, isLoading, setWorkflows, refreshWorkflows} = useWorkflows();

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
            await refreshWorkflows();
            setCurrentWorkflow(data.workflow_id)
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

    useEffect(() => {
        if (!result?.messages) return;

        setVisibleMessages([]);

        result.messages.forEach((message, index) => {
            setTimeout(() => {
                setVisibleMessages((prev) => [
                    ...prev,
                    message
                ]);
            }, index * 1500);
        });

    }, [result]);

    const resume_workflow = async(workflow_id:string) => {
        
        if (!workflow_id) {
            console.error("Workflow not continue due to internal server error");
            toast.error("Workflow not selected",
                {
                    description:"Workflow not continue due to internal server error"
                }
            );

            return;
        }

        try{

        }catch(error){
            console.error("Unable to create a new workflow", error)
            toast.error("Unable to create a new workflow", {
                description: `${error}`
            })
        }

    }

    return (

        <div className="grid h-screen overflow-hidden grid-rows-[auto_1fr]">

            <div>
                <Header />
            </div>

            <div className="grid grid-cols-[280px_1fr] min-h-0 overflow-hidden">
                <div className=" bg-slate-950 shadow-3xl min-h-0 overflow-hidden">
                    <div className="relative w-full h-full overflow-hidden ">

                        <div className="pointer-events-none absolute h-120 w-120 bg-blue-700/20 
                        -left-20 top-10 blur-3xl rounded-full"/>

                        <div className="pointer-events-none absolute h-120 w-120 bg-violet-700/20 blur-3xl 
                        -right-40 top-90 rounded-full"/>


                        <div className="relative flex flex-col h-full gap-3">

                            <h1 className="pt-10 text-slate-200 font-bold text-center text-base md:text-2xl
                            shadow-lg">WorkFlows</h1>

                            <div className="mt-5 pl-1  flex gap-3 justify-start transition-all duration-300 active:scale-95  
                            hover:bg-gray-400/30">
                                <button
                                onClick={() => setNewWorkflow(true)} 
                                className=" px-8 py-1 rounded-xl group">
                                    <div className="flex items-center gap-1 ">
                                        <WorkflowIcon className="text-slate-200 h-10 w-10 hidden md:flex"/>
                                        <span className="text-slate-100 text-sm md:text-base group-hover:font-semibold">New Workflow</span>

                                    </div>
                                </button>

                            </div>

                            <div className="relative min-h-0 flex-1 mt-5 flex flex-col">

                                <h1 className="shirnk-0 p-2 text-base font-semibold text-slate-500 tracking-widest">Recent workflows</h1>

                                <div className="modern-scrollbar min-h-0 flex-1 mt-5 mb-3 flex flex-col gap-3 text-start overflow-y-auto overflow-x-hidden items-start justify-start">

                                    {
                                        workflows?.map((workflow)=> (

                                            <button key={workflow.id}
                                            title={workflow.query}
                                            className= {
                                                workflow.id == currentWorkflow 
                                                ? "shrink-0 text-sm md:text-base w-full text-start text-slate-300 shadow-sm px-2 py-2 bg-slate-200/20 hover:bg-slate-400/30 hover:text-white rounded-lg"
                                                : "shrink-0 text-sm md:text-base text-slate-300 shadow-sm px-2 py-2 hover:bg-slate-200/20 hover:text-white rounded-lg"
                                            }>
                                                {
                                                    workflow.query.length > 30
                                                        ? `${workflow.query.slice(0,30)}...`
                                                        : workflow.query
                                                }
                                            </button>
                                        ))
                                    }

                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="relative flex items-center justify-center h-full min-h-0 max-h-2xl">


                    <div className="flex flex-col h-full min-h-0 overflow-hidden
                items-start m-2 pt-3 pb-3">

    {result && (
        <div className="modern-scrollbar flex flex-col
                        min-h-0 flex-1
                        overflow-x-hidden overflow-y-auto
                        mb-10 px-4">

            {visibleMessages.map((message, index) => (
                <div
                    key={message.id}
                    className="flex gap-4"
                >

                    
                    <div className="flex flex-col items-center">

                        
                        <div className="
                            z-10
                            flex h-8 w-8
                            shrink-0
                            items-center justify-center
                            rounded-full
                            bg-green-500
                            shadow-lg
                        ">
                            <Check
                                className="h-5 w-5 text-white"
                            />
                        </div>

                        
                        {index < visibleMessages.length - 1 && (
                            <div className="
                                w-[2px]
                                flex-1
                                bg-green-400/60
                            " />
                        )}

                    </div>

                    
                    <div className="pb-8 pt-1">
                        <p className="
                            text-base
                            font-medium
                            text-slate-800
                        ">
                            {message.content}
                        </p>
                    </div>

                </div>
            ))}

        </div>
    )}

</div>

                    {
                        newWorkflow && (
                            <div className="absolute bottom-2 flex justify-center items-center
                            text-black text-base border border-slate-300 bg-slate-100
                                w-full max-w-3xl rounded-2xl px-4 py-1 shadow-xl outline-none
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
                            className="group shadow-lg bg-slate-100 rounded-full p-2 active:scale-80 transition-all duration-300">

                                <BotMessageSquareIcon className="text-violet-600 group-hover:hidden"/>
                                <Rocket
                                    className="text-pink-600 hidden group-hover:block"
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