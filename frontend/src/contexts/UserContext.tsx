import { createContext, useContext, useState, type ReactNode } from "react";
import type { User } from "../types/user";
import { User } from "lucide-react";

interface UserContextType {
    user: User | null;
    isLoading: boolean;
    setUser: (user: User | null) => void;
    refreshUser: () => Promise<void>;
}


const UserContext = createContext<UserContextType |undefined>(
    undefined
);

interface UserProviderProps {
    children: ReactNode
}

export function UserProvider({children}: UserProviderProps) {

    const[user, setUser] = useState<User | null>(null)
    const[isLoading, setIsLoading] = useState(true)

    const refreshUser = async() => {

        try{

            
        }
    }
}