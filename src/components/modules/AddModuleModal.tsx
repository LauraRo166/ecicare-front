import { Modal } from "@/components/common/Modal.tsx";
import { ModuleForm } from "@/components/modules/ModuleForm.tsx";
import type { ModuleData } from "@/types/moduleData.ts";
import { createModule } from "@/services/moduleService";
interface AddModuleModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd?: (module: ModuleData) => void;
}

export const AddModuleModal = ({ isOpen, onClose, onAdd }: AddModuleModalProps) => {
    const handleAdd = async (module: ModuleData) => {
        try {
            const createdModule = await createModule(module);
            onAdd?.(createdModule);
            onClose();
        } catch (error) {
            console.error("Error al crear módulo", error);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Agregar módulo">
            <ModuleForm onSubmit={handleAdd} onClose={onClose} />
        </Modal>
    );
};