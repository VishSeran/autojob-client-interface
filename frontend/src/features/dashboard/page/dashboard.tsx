import { Navigate } from "react-router-dom";
import Header from "../../../components/header";
import { useUser } from "../../../contexts/UserContext";
import DashboardLoading from "../../../components/LoadingScreen";

export default function Dashboard() {

    const { user, isLoading } = useUser();

    if (isLoading) {
        return <DashboardLoading />;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div>
            <Header />
        </div>
    );
}