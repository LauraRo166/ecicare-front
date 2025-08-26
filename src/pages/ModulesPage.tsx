import { useState } from "react";
import { DashboardModules } from "@/components/dashboards/DashboardModules.tsx";
import { SectionActions } from "@/components/SectionActions.tsx";
import { DashboardHeader } from "@/components/common/DashboardHeader.tsx";
import { useAuth } from "@/contexts/AuthContext.tsx";
import { AddModuleModal } from "@/components/modals/AddModuleModal.tsx";

export const ModulesPage = () => {
    const { logout } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="flex flex-col h-screen w-full">
            <div className="min-h-screen w-full bg-[#fceceb] p-0">
                {/* Header */}
                <DashboardHeader title="Administrador" onLogout={logout} />

                {/* Acciones */}
                <div className="flex gap-4 px-8 py-4 justify-center">
                    <SectionActions
                        title="Módulos"
                        onAdd={() => setIsModalOpen(true)} // abrir modal
                    />
                </div>

                {/* Módulos */}
                <DashboardModules />

                {/* Modal */}
                <AddModuleModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                />
            </div>
        </div>
    );
};
