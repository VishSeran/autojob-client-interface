import { Navigate } from "react-router-dom";
import Header from "../../../components/header";
import { useUser } from "../../../contexts/UserContext";
import DashboardLoading from "../../../components/LoadingScreen";
import Dashboard from "./page/dashboard";

export default function DashboardLanding() {

    const { user, isLoading } = useUser();

    if (isLoading) {
        return <DashboardLoading />;
    }

    if (!user){
        return <DashboardLoading />;
    }

    if (user) {
        return <Dashboard />
    }

    
}