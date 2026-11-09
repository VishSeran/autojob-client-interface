import { PlusCircle, PlusIcon, Workflow } from "lucide-react";


export default function WorkflowSideBar() {

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
                hover:bg-blue-900">
                    <button className=" px-8 py-1 rounded-xl">
                        <div className="flex items-center gap-1">
                            <Workflow className="text-slate-200 h-10 w-10 hidden md:flex"/>
                            <span className="text-slate-100 text-sm md:text-base">New Workflow</span>

                        </div>
                    </button>

                </div>
            </div>

        </div>
    )
}