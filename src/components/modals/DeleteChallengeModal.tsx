import { Modal } from "@/components/Modal.tsx";
import { useState } from "react";

interface DeleteChallengeModalProps {
    isOpen: boolean;
    onClose: () => void;
    onDelete: () => Promise<boolean>;
}

export const DeleteChallengeModal = ({ isOpen, onClose, onDelete }: DeleteChallengeModalProps) => {
    const [status, setStatus] = useState<null | "success" | "error">(null);

    const handleDelete = async () => {
        try {
            const ok = await onDelete();
            setStatus(ok ? "success" : "error");
        } catch {
            setStatus("error");
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={() => { onClose(); setStatus(null); }} title="Eliminar reto">
            {status === null && (
                <>
                    <p className="mb-4">¿Está seguro que desea eliminar el reto?</p>
                    <div className="flex justify-between">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-400"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={handleDelete}
                            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                        >
                            Confirmar
                        </button>
                    </div>
                </>
            )}
            {status === "success" && (
                <p className="text-green-600 font-semibold">Reto eliminado exitosamente ✅</p>
            )}
            {status === "error" && (
                <p className="text-red-600 font-semibold">Error al eliminar el reto ❌</p>
            )}
        </Modal>
    );
};
