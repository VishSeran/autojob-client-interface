import { NavLink } from "react-router-dom"
import AutoJobLogoLight from "../assets/autojob_logo_light.svg"

export default function Header(){

    const links = [
        {
            label:"Dashboard", to:"/dashboard"
        },

        {
            label:"Workflows", to:"/workflows"
        },

        {
            label:"Resumes", to:"/resumes"
        },

        {
            label:
        }
    ]

    return (

        <header className="flex items-center justify-between bg-slate-950 px-6 py-4 text-slate-200">
            
            <div className="sm:flex items-center hidden gap-3">
                <img src={AutoJobLogoLight} className="h-8 w-8"/>
                <span className="text-xl font-bold  tracking-tighter
                bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">AutoJob</span>
            </div>

            <div className="flex gap-2 items-center justify-between">

                <div>

                </div>

            </div>
        </header>
    )
}