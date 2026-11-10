import { PlusCircle, PlusIcon, Workflow } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import api from "../../auth/api/axiosInstance";


export default function WorkflowSideBar() {


    const[newWorkflow, setNewWorkflow] = useState(false);


    const newWorkflowHandler = async() => {

        try{

            

            


        }catch(error){
            console.error("Unable to create a new workflow")
            toast.error("Unable to create a new workflow", {
                description:"Internal server error"
            })
        }
    }

    return (
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
                            <Workflow className="text-slate-200 h-10 w-10 hidden md:flex"/>
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
    )
}