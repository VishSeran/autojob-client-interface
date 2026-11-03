import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import api from "../features/auth/api/axiosInstance"
import { useUser } from "../contexts/UserContext"
import UserAvatar from "./UserAvatar"


export default function ProfileDropDown(){

    const[isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const {user} = useUser();

    type LogOutResponse = {
        message: string
    }

     const handleLogout = async() =>{

        try{

            const response = await api.post<LogOutResponse>(
                "auth/logout",
            )
    
            const data = response.data
    
            if (response.status != 200){
                throw new Error("Logout failed")
            }
    
            toast.success(data.message);
            navigate("/login");
        
        }catch(error){
            console.error("Logout error:", error);
            toast.error(
                error instanceof Error? error.message: "Logout failed"
            );
        }
        
    };

    return(

        <div className="relative">

            <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-haspopup="true"
            className="text-xl"
            >
                {
                    user? (
                      <UserAvatar username={user.name}/>  
                    ): (
                        <p>Pro</p>
                    )
                }

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
                        onClick={handleLogout}
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