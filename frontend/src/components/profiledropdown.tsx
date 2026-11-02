import { useState } from "react"
import { useNavigate } from "react-router-dom"


export default function ProfileDropDown(){

    const[isOpen, setIsOpen] = useState(false)
    const navigate = useNavigate()

    return(

        <div className="relative">

            <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-haspopup="true"
            className="rounded-full bg-blue-600 px-4 py-1 text-white hover:bg-blue-700">
                Profile
            </button>


            {
                isOpen && (
                    <div className="absolute text-black mt-4 right-0 w-38 top-full border border-slate-200
                    bg-slate-white py-2 shadow-lg rounded-lg z-50">
                        
                        <button
                        type="button"
                        onClick={() =>{
                            setIsOpen(false);
                            navigate("/profile");
                        }}
                        className="block w-full px-4 py-2 text-left text-sm  text-slate-700
                        hover:bg-slate-100"
                        >
                            My Profile
                        </button>

                        <button
                        type="button"
                        onClick={() =>{
                            setIsOpen(false);
                            navigate("/profile/settings");
                        }}
                        className="block w-full px-4 py-2 text-left text-sm  text-slate-700
                        hover:bg-slate-100"
                        >
                            Settings
                        </button>

                        <button
                        type="button"
                        onClick={() =>{
                            setIsOpen(false);
                            {handleLogout};
                        }}
                        className="block w-full px-4 py-2 text-left text-sm  text-red-500
                        hover:bg-red-100"
                        >
                            Log out
                        </button>
                    </div>
                )
            }
        </div>

    )

}