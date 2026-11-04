import { useState } from "react";
import Header from "../../../components/header";
import { useResumes } from "../../../contexts/ResumeContext";
import { ActivityIcon, BedDouble, BotOff, Bubbles, DeleteIcon, DownloadIcon, GrabIcon, RecycleIcon, SearchAlertIcon, TextSelect, TrashIcon } from "lucide-react";
import api from "../../auth/api/axiosInstance";


export default function Resumes() {

    const {resumes, isLoading} = useResumes();

    const[category, setCategory] = useState("view_resumes")

    const formatDate = (date:string) => {

        return new Date(date).toLocaleString("en-US",{
            month:"short",
            day:"2-digit",
            year:"numeric",
            hour:"2-digit",
            minute:"2-digit"
        });
    };

    const makeDefault = async () => {

        try {

            const response = await api.post

        }catch (error) {

        }

    }

    return (


        <div className="flex-col">

            <Header />

            <div className="flex flex-col w-full items-center mt-8">

                <div className="flex gap-5 text-sm border transition duration-300 border-slate-100 px-4 py-2 rounded-full shadow-lg">

                    <button
                    onClick={()=>setCategory("view_resumes")} 
                    className={`px-3 py-1 rounded-full 
                        ${
                            category == "view_resumes"
                            ? "font-semibold text-[16px]  text-white bg-blue-900"
                            : "font-normal text-slate-700 hover:text-blue-900"
                        }`}>
                        View Resumes
                    </button>

                    <button
                    onClick={() => setCategory("add_resume")}
                    className={`px-3 py-1 rounded-full 
                        ${
                            category == "add_resume"
                            ? "font-semibold text-[16px]  text-white bg-blue-900"
                            : "font-normal text-slate-700 hover:text-blue-900"
                        }`}>
                        Add Resume
                    </button>

                </div>

                <div className="flex-col mt-15  px-4 py-2 items-center border border-slate-200 bg-linear-to-r from-gray-50 to-gray-100 rounded-lg shadow-2xl">
                    
                    <div className="flex-col">

                        {
                            category == "view_resumes"
                            ? (
                                <div className="flex-col">

                            
                                    <div className="flex flex-col gap-3">

                                        {
                                            resumes?.map((resume) => (
                                                

                                                <div key={resume.filename} className="flex flex-col gap-1 px-3 py-1 mx-3 my-1 border border-slate-100 bg-white rounded-lg shadow-md"> 

                                                    <div className="flex justify-between items-center gap-5 px-3 py-1 mx-3 my-1"> 
                                                        <div>
                                                            <h2 className="text-[18px] my-1  font-semibold font-sans"> {resume.filename} </h2>

                                                        </div>

                                                        <div>

                                                        <h3 className="text-[16px]"> {formatDate(resume.create_at)}</h3>
                                                        </div>


                                                    </div>

                                                    <div className="flex gap-1 justify-between px-3">

                                                        <div className="flex "> 

                                                        <button className="text-sm text-blue-700 px-2 py-1 hover:text-blue-500">
                                                            <DownloadIcon className="h-4 w-4"/>
                                                        </button>

                                                        <button className="text-sm text-red-700 px-2 py-1 hover:text-red-500">
                                                            <TrashIcon className="h-4 w-4"/>
                                                        </button> 
                                                        </div>


                                                        <div className="flex items-center">

                                                            
                                                             {resume.is_default? (
                                                                <div className="flex items-center"> 
                                                                    <TextSelect className="h-4 w-4"/>
                                                                    <button className="text-sm text-green-600 px-2 py-1 font-medium">
                                                                        Default
                                                                    </button>
                                                                </div>

                                                            ): (
                                                                <div className="flex items-center">
                                                                    <button>
                                                                        <TextSelect className="h-4 w-4"/>
                                                                    </button> 
                                                                    
                                                                    <button 
                                                                    className="text-sm text-red-600 px-2 py-1 font-medium">
                                                                        Not Default
                                                                    </button>
                                                                </div>
                                                            )}
                                                        </div>



                                                    </div>
                                                </div>

                                            ))
                                        }
                                    </div>
                                </div>
                            
                            ):(
                                <div> </div>
                            )
                            
                        }
                    </div>

                    

                </div>

                
            </div>

        </div>

    )
}