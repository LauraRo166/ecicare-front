import { DashboardMetrics } from "@/components/dashboards/DashboardMetrics.tsx";
import { useAuth } from "@/contexts/AuthContext";
import {DashboardHeader} from "@/components/common/DashboardHeader.tsx";

export const MetricsPage = () => {
    const { logout } = useAuth();
    return (
        <div className="flex flex-col h-screen w-full">
            <div className="min-h-screen w-full bg-[#fceceb] p-0">
                {/* Header */}
                <DashboardHeader title="Administrador" onLogout={logout} />
                {/* Módulos */}
                <DashboardMetrics />
            </div>
        </div>
    );
};
