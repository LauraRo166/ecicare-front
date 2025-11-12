import { Modal } from "@/components/common/Modal.tsx";
import { ModuleForm } from "@/components/modules/ModuleForm.tsx";
import { updateModule } from "@/services/moduleService";

import type { ModuleData } from "@/types/moduleData.ts";

interface EditModuleModalProps {
    isOpen: boolean;
    onClose: () => void;
    module: ModuleData;
    onUpdate?: (module: ModuleData) => void;
}

export const EditModuleModal = ({ isOpen, onClose, module, onUpdate }: EditModuleModalProps) => {
    const handleEdit = async (updatedModule: ModuleData) => {
        try {
            const response = await updateModule(updatedModule);
            onUpdate?.(response);
            onClose();
        } catch (error) {
            console.error("Error al actualizar módulo", error);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Editar módulo">
            <ModuleForm initialData={module} onSubmit={handleEdit} onClose={onClose} />
        </Modal>
    );
};