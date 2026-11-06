import { useUser } from "../../contexts/UserContext.tsx";
import DashboardLoading from "../../components/LoadingScreen.tsx";
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