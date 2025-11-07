import { useState } from "react";
import { Modal } from "@/components/common/Modal";
import { ChallengeForm } from "@/components/challenges/ChallengeForm";
import type { ChallengeData } from "@/types/challengeData";
import { createChallenge } from "@/services/challengeService";

interface AddChallengeModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd?: (challenge: ChallengeData) => void;
    moduleName: string;
}

export const AddChallengeModal = ({
                                      isOpen,
                                      onClose,
                                      onAdd,
                                      moduleName,
                                  }: AddChallengeModalProps) => {
    const [loading, setLoading] = useState(false);

    const handleAddChallenge = async (challenge: ChallengeData) => {
        try {
            setLoading(true);
            const created = await createChallenge({ ...challenge, moduleName });
            onAdd?.(created);
            onClose();
        } catch (error) {
            console.error("Error al crear reto:", error);
            alert("No se pudo crear el reto. Revisa los campos o intenta de nuevo.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Agregar reto">
            <div className="flex flex-col gap-4">
                {loading ? (
                    <p className="text-center text-gray-600">Creando reto...</p>
                ) : (
                    <ChallengeForm onSubmit={handleAddChallenge} onClose={onClose} />
                )}
            </div>
        </Modal>
    );
};