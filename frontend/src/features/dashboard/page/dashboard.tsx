import { Navigate, useNavigate } from "react-router-dom";
import Header from "../../../components/header";
import { useUser } from "../../../contexts/UserContext";
import DashboardLoading from "../../../components/LoadingScreen";


export default function Dashboard() {

    const {user, isLoading} = useUser();

    if (!user) {

        return (
            <DashboardLoading/>
        )
    }

    if (user) {

        return  (

        <div>
            <Header/>
        </div>

        )
        
    }

    

       
}