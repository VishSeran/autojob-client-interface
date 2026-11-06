import { Navigate } from "react-router-dom";
import Header from "../../../components/header";
import { useUser } from "../../../contexts/UserContext";
import DashboardLoading from "../../../components/LoadingScreen";

export default function Dashboard() {

    return (
        <div>
            <Header />
        </div>
    )

    
}