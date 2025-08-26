import React, { useState } from "react";
import { SectionActions } from "@/components/SectionActions";
import {AddChallengeModal} from "@/components/modals/AddChallengeModal.tsx";
import {EditModuleModal} from "@/components/modals/EditModuleModal.tsx";
import {DeleteModuleModal} from "@/components/modals/DeleteModuleModal.tsx";

interface AccordionModuleProps {
    title: string;
    children: React.ReactNode;
}

export const AccordionModule = ({ title, children }: AccordionModuleProps) => {
    const [open, setOpen] = useState(false);

    // Estados para modales
    const [isAdd, setIsAdd] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [deleteStatus, setDeleteStatus] = useState<null | "success" | "error">(null);

    const handleDelete = async () => {
        const ok = true;
        if (ok) {
            setDeleteStatus("success");
        } else {
            setDeleteStatus("error");
        }
    };

    return (
        <div className="flex items-stretch mb-2 rounded-xl overflow-hidden shadow bg-white">
            <AddChallengeModal isOpen={isAdd} onClose={() => setIsAdd(false)} />
            <EditModuleModal isOpen={isEdit} onClose={() => setIsEdit(false)} title={title} />
            <DeleteModuleModal
                isOpen={isDelete}
                onClose={() => {
                    setIsDelete(false);
                    setDeleteStatus(null);
                }}
                deleteStatus={deleteStatus}
                onDelete={handleDelete}
            />

            <div className="flex-col bg-white p-2 gap-2 border-r border-gray-200">
                <SectionActions
                    onAdd={() => setIsAdd(true)}
                    onEdit={() => setIsEdit(true)}
                    onDelete={() => setIsDelete(true)}
                />
            </div>

            <div className="flex-1">
                <button
                    onClick={() => setOpen(!open)}
                    className="w-full flex items-center justify-between px-4 py-3 font-semibold text-lg bg-white"
                >
                    <div className="flex items-center gap-3">
                        <span>⦿</span>
                        {title}
                    </div>
                    <span>{open ? "▲" : "▼"}</span>
                </button>

                {open && <div className="bg-white p-4 border-t border-gray-200">{children}</div>}
            </div>
        </div>
    );
};
