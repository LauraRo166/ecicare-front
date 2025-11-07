import { Modal } from "@/components/common/Modal";
import { AwardForm } from "@/components/awards/AwardForm.tsx";
import type { AwardData } from "@/types/awardData.ts";
import { updateAward } from "@/services/awardService"; // importar la función del servicio

interface EditAwardModalProps {
    isOpen: boolean;
    onClose: () => void;
    selectedAward: AwardData;
    onUpdate: (updatedAward: AwardData) => void; // función para actualizar estado en DashboardAwards
}

export const EditAwardModal = ({
                                   isOpen,
                                   onClose,
                                   selectedAward,
                                   onUpdate,
                               }: EditAwardModalProps) => {

    const handleSubmit = async (updated: Partial<AwardData>) => {
        try {
            // Merge de los datos existentes con los actualizados
            const awardToUpdate: AwardData = { ...selectedAward, ...updated };

            const data = await updateAward(awardToUpdate); // llamamos al servicio
            onUpdate(data); // actualizar estado en DashboardAwards
            onClose(); // cerrar modal
        } catch (error) {
            console.error("Error al actualizar premio:", error);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Editar Premio">
            <AwardForm
                initialData={selectedAward}
                onSubmit={handleSubmit}
                onCancel={onClose}
            />
        </Modal>
    );
};