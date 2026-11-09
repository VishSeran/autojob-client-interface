

export default function WorkflowSideBar() {

    return (
        <div className="relative w-full h-full overflow-hidden ">

            <div className="pointer-events-none absolute h-120 w-120 bg-blue-700/20 
            -left-20 top-10 blur-3xl rounded-full"/>

            <div className="pointer-events-none absolute h-120 w-120 bg-violet-700/20 blur-3xl 
            -right-40 top-90 rounded-full"/>


            <div className="relative flex flex-col h-full items-center">

                <h1 className="pt-10 text-slate-200 font-bold text-base md:text-2xl
                shadow-lg">WorkFlows</h1>
            </div>

        </div>
    )
}