

export interface Workflow {
    
    id: string,
    status: string
    query: string
    create_at: string
}

export interface WorkflowMessage {
    id: string;
    content: string;
    type: string;
}

export interface InitialWorkflowResult {
    messages: WorkflowMessage[];
}