import { Modal } from "@/components/common/Modal";
import { AwardForm } from "@/components/AwardForm.tsx";

interface EditPrizeModalProps {
    isOpen: boolean;
    onClose: () => void;
    selectedAward: { id: number; name: string; image: any } | null;
}

export const EditAwardModal = ({
                                   isOpen,
                                   onClose,
                                   selectedAward,
                               }: EditPrizeModalProps) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Editar Premio">
            <AwardForm
                initialData={selectedAward || undefined}
                onSubmit={onClose}
                onCancel={onClose}
            />
        </Modal>
    );
};