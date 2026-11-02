import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { User } from "../types/user";


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

            const response = await fetch(
                "http://127.0.0.1:8000/user/profile",

                {
                    method:"GET",
                    credentials:"include"
                }
            )

            if (!response.ok){
                setUser(null)
                return;
            }

            const data:User = await response.json()
            setUser(data)

        }catch(error){
            console.error("Failed to fetch user:", error);
            setUser(null);
        }finally {
            setIsLoading(false)
        }
    }

    useEffect(()=>{
        void refreshUser()
    }, [])

    return (
        <UserContext.Provider
        value={{
            user,
            isLoading,
            setUser,
            refreshUser
        }}>
            {children}
        </UserContext.Provider>
    )
};


export function useUser() {

    const context = useContext(UserContext)

    if (!context) {
    throw new Error(
      "useUser must be used inside UserProvider"
    );
  }

  return context
}