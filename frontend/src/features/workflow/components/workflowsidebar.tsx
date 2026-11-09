

export default function WorkflowSideBar() {

    return (
        <div className="relative flex flex-col itmes-center justify-center   
        w-full max-h-screen overflow-hidden">
            <div className="pointer-events-none absolute h-80 w-80 bg-blue-700/20 
            -left-20 top-0 blur-3xl rounded-full"/>

            <div className="pointer-events-none absolute h-80 w-80 bg-blue-700/20 
            -right-20 top-90  rounded-full"/>
            <div className="flex flex-col items-center justify-center">

                <h1 className="pt-10 text-slate-200 font-bold text-base md:text-2xl">Workflows</h1>
            </div>

        </div>
    )
}