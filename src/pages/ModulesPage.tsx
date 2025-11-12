import { useState } from "react";
import { DashboardModules } from "@/components/dashboards/DashboardModules.tsx";
import { SectionActions } from "@/components/common/SectionActions.tsx";
import { Header } from "@/components/common/Header.tsx";
import { AddModuleModal } from "@/components/modules/AddModuleModal.tsx";

import type {ModuleData} from "@/types/moduleData.ts";

export const ModulesPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newModule, setNewModule] = useState<ModuleData | undefined>(undefined);

    return (
        <div className="flex flex-col h-screen w-full">
            <div className="min-h-screen w-full bg-[#fceceb] p-0">
                {/* Header */}
                <Header title="Administrador" />

                {/* Acciones */}
                <div className="flex gap-4 px-8 py-4 justify-center">
                    <SectionActions
                        title="Módulos"
                        onAdd={() => setIsModalOpen(true)} // abrir modal
                    />
                </div>

                {/* Módulos */}
                <DashboardModules newModule={newModule}/>

                {/* Modal */}
                <AddModuleModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onAdd={(module) => setNewModule(module)}
                />
            </div>
        </div>
    );
};
