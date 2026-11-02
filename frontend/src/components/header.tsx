import { NavLink } from "react-router-dom"
import AutoJobLogoLight from "../assets/autojob_logo_light.svg"
import ProfileDropdown from "./profiledropdown";
import { useUser } from "../contexts/UserContext";

export default function Header(){

    const {user, isLoading} = useUser();

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
            label:"Jobs", to:"/jobs"
        }
    ];

    return (

        <header className="flex items-center justify-between bg-slate-950 px-6 py-4 text-slate-200">
            
            <div className="sm:flex items-center hidden gap-3">
                <img src={AutoJobLogoLight} className="h-8 w-8"/>
                <span className="text-xl font-bold  tracking-tighter
                bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">AutoJob</span>
            </div>

            <nav className="flex items-center gap-2">
                {
                    links.map((link) => (

                        <NavLink 
                            key={link.to}
                            to={link.to}
                        className={({isActive})=>(
                            isActive
                            ? "font-medium text-blue-400"
                            : "text-slate-300 transition hover:text-white"
                        )}>
                            {link.label}
                        </NavLink>
                    ))
                }
            </nav>

            <ProfileDropdown/>

            <div>
            {isLoading ? (
            <p>Loading...</p>
            ) : user ? (
            <div>
                <p>{user.name}</p>
                <p className="text-sm text-slate-400">
                {user.email}
                </p>
            </div>
            ) : (
            <p>Guest</p>
            )}
        </div>
        </header>
    )
}