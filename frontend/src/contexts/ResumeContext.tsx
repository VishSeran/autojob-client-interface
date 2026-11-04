import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Resume } from "../types/resumes";
import api from "../features/auth/api/axiosInstance";
import { toast } from "sonner";



interface ResumeContextType {

    resumes: Resume[] | null;
    isLoading: boolean;
    setResumes: (resumes: Resume[] | null) => void;
    refreshResumes: () => Promise<void>;
}


const ResumeContext = createContext<ResumeContextType | undefined> (
    undefined
);

interface ResumeProviderProps {
    children: ReactNode
}

export function ResumeProvider({children}: ResumeProviderProps) {

    const [resumes, setResumes] = useState< Resume[] | null>(null);
    const [isLoading, setIsLoading] = useState(true)

    const refreshResumes = async() => {

        try{

            const response = await api.get(
                "/resume/all",

            )

            if (response.status !=200){
                setResumes(null);
                toast.message("Resumes are empty",{
                    description:"Please add your resume"
                })
                return;
            }

            const data = response.data
            setResumes(data)

        }catch (error) {
            console.error("Failed to fetch resumes", error)
            toast.error("Internal Server Error",{
                description:"Failed to fetch resumes"
            })
            setResumes(null)

        }finally{
            setIsLoading(false)
        }
    }


    useEffect(()=>{
        void refreshResumes()
    },[])


    return (

        <ResumeContext.Provider value={{
            resumes,
            isLoading,
            setResumes,
            refreshResumes
        }}>
            {children}
        </ResumeContext.Provider>
    )
}

export function useResumes() {

    const context = useContext(ResumeContext) 

    if(!context){
        throw new Error(
            "useresumes must be used inside ResumeProvider"
        );
    }

    return context
}

