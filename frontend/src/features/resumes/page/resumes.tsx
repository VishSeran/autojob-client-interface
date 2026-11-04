import { useState } from "react";
import Header from "../../../components/header";
import { useResumes } from "../../../contexts/ResumeContext";


export default function Resumes() {

    const {resumes, isLoading} = useResumes();

    const[category, setCategory] = useState("view_resumes")

    const formatDate = (date:Date) => {

        return new Date(date).toLocaleString("en-US",{
            month:"short",
            day:"2-digit",
            year:"numeric",
            hour:"2-digit",
            minute:"2-digit"
        });
    };

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

                <div className="flex-col mt-15 w-lg max-w-lg px-4 py-2 items-center border border-slate-200 bg-slate-200 rounded-lg shadow-2xl">
                    
                    <div className="flex-col">

                        {
                            category == "view_resumes"
                            ? (
                                <div className="flex-col">

                            
                                    <div className="flex-col">

                                        {
                                            resumes?.map((resume) => (

                                                <div className="flex justify-between"> 

                                                    <h2 className="text-[17px] font-semibold font-mono"> {resume.filename} </h2>
                                                    <h3 className="text-[15px]"> {formatDate(resume.create_at)}</h3>
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