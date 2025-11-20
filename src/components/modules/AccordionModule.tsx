import React, { useState } from "react";
import { SectionActions } from "@/components/common/SectionActions.tsx";
import { AddChallengeModal } from "@/components/challenges/AddChallengeModal.tsx";
import { EditModuleModal } from "@/components/modules/EditModuleModal.tsx";
import { DeleteModuleModal } from "@/components/modules/DeleteModuleModal.tsx";
import { AddCollaboratorModal } from "@/components/modules/AddCollaboratorModal.tsx";
import type { ChallengeData } from "@/types/challengeData.ts";
import type { ModuleData } from "@/types/moduleData.ts";

interface AccordionModuleProps {
    module: ModuleData;
    children: React.ReactNode;
    onAddChallenge: (moduleName: string, challenge: ChallengeData) => void;
    onDeleteModule: (moduleName: string) => void;
    onEditModule: (module: ModuleData) => void;
}

export const AccordionModule = ({
                                    module,
                                    children,
                                    onAddChallenge,
                                    onDeleteModule,
                                    onEditModule,
                                }: AccordionModuleProps) => {

    const [open, setOpen] = useState(false);

    const [isAdd, setIsAdd] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [isAddCollaborator, setIsAddCollaborator] = useState(false);

    return (
        <div className="flex items-stretch mb-2 rounded-xl overflow-hidden shadow bg-white">

            {/* Modal agregar colaborador */}
            <AddCollaboratorModal
                isOpen={isAddCollaborator}
                onClose={() => setIsAddCollaborator(false)}
                moduleName={module.name}
                onSuccess={(updatedModule) => {
                    onEditModule(updatedModule); // refresca inmediatamente
                }}
            />

            <AddChallengeModal
                isOpen={isAdd}
                onClose={() => setIsAdd(false)}
                onAdd={(challenge) => onAddChallenge(module.name, challenge)}
                moduleName={module.name}
            />

            <EditModuleModal
                isOpen={isEdit}
                onClose={() => setIsEdit(false)}
                module={{
                    name: module.name,
                    description: module.description ?? "",
                    imageUrl: module.imageUrl ?? ""
                }}
                onUpdate={(module) => onEditModule(module)}
            />

            <DeleteModuleModal
                isOpen={isDelete}
                onClose={() => setIsDelete(false)}
                moduleName={module.name}
                onDeleteSuccess={() => {
                    onDeleteModule(module.name);
                    setIsDelete(false);
                }}
            />

            <div className="flex-col bg-white p-2 gap-2 border-r border-gray-200">
                <SectionActions
                    onAdd={() => setIsAdd(true)}
                    onEdit={() => setIsEdit(true)}
                    onDelete={() => setIsDelete(true)}
                    onAddCollaborator={() => setIsAddCollaborator(true)} // ← NUEVO
                />
            </div>

            <div className="flex-1">
                <button
                    onClick={() => setOpen(!open)}
                    className="w-full flex items-center justify-between px-4 py-3 font-semibold text-lg bg-white"
                >
                    <div className="flex items-center gap-3">
                        {module.imageUrl && (
                            <img
                                src={module.imageUrl}
                                alt={module.name}
                                className="w-10 h-10 rounded-full object-cover"
                            />
                        )}
                        <div className="flex flex-col text-left">
                            <span className="font-semibold">{module.name}</span>
                            {module.description && (
                                <span className="text-sm text-gray-500">{module.description}</span>
                            )}
                        </div>
                    </div>
                    <span>{open ? "▲" : "▼"}</span>
                </button>

                {open && (
                    <div className="bg-white p-4 border-t border-gray-200">
                        {children}
                    </div>
                )}
            </div>

        </div>
    );
};