import { Modal } from "@/components/common/Modal";
import { AwardForm } from "@/components/AwardForm.tsx";

interface AddPrizeModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const AddAwardModal = ({ isOpen, onClose }: AddPrizeModalProps) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Crear Premio">
            <AwardForm
                initialData={undefined}
                onSubmit={onClose}
                onCancel={onClose}
            />
        </Modal>
    );
};