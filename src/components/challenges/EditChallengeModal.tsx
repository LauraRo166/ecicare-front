import { Modal } from "@/components/common/Modal";
import type { ChallengeData } from "@/types/challengeData";
import { ChallengeForm } from "@/components/challenges/ChallengeForm";

interface EditChallengeModalProps {
    isOpen: boolean;
    onClose: () => void;
    challenge: ChallengeData;
    onUpdate: (updatedChallenge: ChallengeData) => void;
}

export const EditChallengeModal = ({
                                       isOpen,
                                       onClose,
                                       challenge,
                                       onUpdate,
                                   }: EditChallengeModalProps) => {
    const handleSubmit = (updated: ChallengeData) => {
        onUpdate(updated);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Editar reto">
            <ChallengeForm initialData={challenge} onSubmit={handleSubmit} onClose={onClose} />
        </Modal>
    );
};