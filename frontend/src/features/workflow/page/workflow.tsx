import Header from "../../../components/header";

export default function Workflow() {

    return (

        <div className="grid grid-rows-2">

            <div>
                <Header />
            </div>

            <div className="grid grid-cols-[280px_1fr]">
                <div>
                    Grid 1
                </div>

                <div>
                    Grid 2
                </div>
            </div>

        </div>
    )
}