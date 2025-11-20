import { useState } from "react";
import { Modal } from "@/components/common/Modal.tsx";
import type { ModuleData } from "@/types/moduleData.ts";
import { updateModuleAdministrator } from "@/services/moduleService.js";

interface AddCollaboratorModalProps {
    isOpen: boolean;
    onClose: () => void;
    moduleName: string;
    onSuccess: (updatedModule: ModuleData) => void;
}

export const AddCollaboratorModal = ({ isOpen, onClose, moduleName, onSuccess }: AddCollaboratorModalProps) => {
    const [email, setEmail] = useState("");

    const handleSubmit = async () => {
        try {
            const updated = await updateModuleAdministrator(moduleName, email);
            onSuccess(updated);
            onClose();
        } catch (e) {
            console.error("Error agregando colaborador", e);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Agregar colaborador">
            <div className="flex flex-col gap-4 p-2">
                <label className="flex flex-col">
                    <span className="text-sm text-gray-600">Correo del colaborador</span>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border p-2 rounded-md"
                        placeholder="usuario@correo.com"
                    />
                </label>

                <button
                    onClick={handleSubmit}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                    Guardar
                </button>
            </div>
        </Modal>
    );
};