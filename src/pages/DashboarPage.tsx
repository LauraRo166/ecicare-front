import { DashboardAdmin } from "@/components/dashboards/DashboardAdmin";
import { DashboardUser } from "@/components/dashboards/UserDashboard";
import { useAuth } from "@/contexts/AuthContext";

export const DashboardPage = () => {
    const { role } = useAuth();

    if (role === "ADMIN") {
        return <DashboardAdmin />;
    }

    if (role === "EMPLOYEER") {
        return <DashboardUser />;
    }
};
