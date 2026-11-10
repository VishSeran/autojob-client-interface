import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Workflow } from "../types/workflow";
import { toast } from "sonner";
import api from "../features/auth/api/axiosInstance";


interface WorkflowContextType {
    
    workflows: Workflow[] | null;
    isLoading: boolean;
    setWorkflows: (workflows: Workflow[] | null) => void;
    refreshWorkflows: () =>Promise<void>;

}


const WorkflowContext = createContext<WorkflowContextType | undefined> (
    undefined
);

interface WorkflowProviderProps {
    children: ReactNode
}

export function WorkflowProvider({children}: WorkflowProviderProps) {

    const [workflows, setWorkflows] = useState<Workflow[] | null> (null);
    const [isLoading, setIsLoading] = useState(true);


    const refreshWorkflows = async() => {

        try{

            const response = await api.get(
                "workflow/all"
            )

            if (response.status !=200){
                setWorkflows(null);
                toast.message("Workflows are empty",{
                    description:"Please create a new workflow"
                })
                return;
            }

            const data = response.data

            const sortedWorkflows = data.sort(
                (a,b) => new Date(b.create_at).getTime() - new Date(a.create_at).getTime()
            )

            setWorkflows(sortedWorkflows)

        }catch(error){

            console.error("Failed to fetch workflows", error)
            toast.error("Internal Server Error",{
                description:"Failed to fetch workflows"
            })
            setWorkflows(null)
        
        }finally{
            setIsLoading(false)
        }
    }

    useEffect(
        () => {
            void refreshWorkflows();
        },
        []
    )

    return (

        <WorkflowContext.Provider value={{
            workflows,
            isLoading,
            setWorkflows,
            refreshWorkflows
        }}>
            {children}
        </WorkflowContext.Provider>
    )
}

export function useWorkflows() {

    const context = useContext(WorkflowContext);

    if (!context) {

        throw new Error(

            "useWorkflows must be used inside WorkflowProvider"
        );
    }

    return context;
    
}