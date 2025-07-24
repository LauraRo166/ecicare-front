import { DashboardAdmin } from "@/components/dashboards/DashboardAdmin";
import { useAuth } from "@/contexts/AuthContext";

export const MetricsPage = () => {
    const { role } = useAuth();
    return role === "ADMIN" ? <DashboardAdmin /> : <DashboardAdmin />;
};
