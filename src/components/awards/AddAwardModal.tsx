import { Modal } from "@/components/common/Modal.tsx";
import { AwardForm } from "@/components/awards/AwardForm.tsx";
import type {AwardData} from "@/types/awardData.ts";
import {createAward} from "@/services/awardService.ts";

interface AddAwardProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd?: (award: AwardData) => void;
}


export const AddAwardModal = ({ isOpen, onClose, onAdd }: AddAwardProps) => {
    const handleAdd = async (award: AwardData) => {
        try {
            const createdAward = await createAward(award);
            onAdd?.(createdAward);
            onClose();
        } catch (error) {
            console.error("Error al crear premio:", error);
        }
    };
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Crear Premio">
            <AwardForm
                initialData={undefined}
                onSubmit={handleAdd}
                onCancel={onClose}
            />
        </Modal>
    );
};