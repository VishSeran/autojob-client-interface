import Header from "../../../components/header";
import WorkflowSideBar from "../components/workflowsidebar";

export default function Workflow() {

    return (

        <div className="grid h-screen grid-rows-[auto_1fr]">

            <div>
                <Header />
            </div>

            <div className="grid grid-cols-[280px_1fr]">
                <div className=" bg-slate-950 shadow-3xl">
                    <WorkflowSideBar />
                </div>

                <div>
                    Grid 2
                </div>
            </div>

        </div>
    )
}