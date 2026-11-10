import { createContext, useState, type ReactNode } from "react";
import type { Workflow } from "../types/workflow";


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


        }catch(error)
    }
}