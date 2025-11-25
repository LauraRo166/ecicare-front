import { DashboardCollaborators } from "@/components/dashboards/DashboardCollaborators";
import { Header } from "@/components/common/Header";

export const CollaboratorsPage = () => {
    return (
        <div className="flex flex-col h-screen w-full">
            <div className="min-h-screen w-full bg-[#fceceb] p-0">
                <Header/>
                <DashboardCollaborators />
            </div>
        </div>
    );
};