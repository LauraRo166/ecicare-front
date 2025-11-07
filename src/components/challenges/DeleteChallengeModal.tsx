import { Modal } from "@/components/common/Modal";
import { useState } from "react";
import { deleteChallenge } from "@/services/challengeService";

interface DeleteChallengeModalProps {
    isOpen: boolean;
    onClose: () => void;
    challengeName: string;
    onDeleteSuccess?: () => void;
}

export const DeleteChallengeModal = ({
                                         isOpen,
                                         onClose,
                                         challengeName,
                                         onDeleteSuccess,
                                     }: DeleteChallengeModalProps) => {
    const [status, setStatus] = useState<null | "success" | "error">(null);
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        setLoading(true);
        try {
            await deleteChallenge(challengeName);
            setStatus("success");
            onDeleteSuccess?.();

            setTimeout(() => {
                setStatus(null);
                setLoading(false);
                onClose();
            }, 1200);
        } catch (error) {
            console.error("Error al eliminar reto:", error);
            setStatus("error");
            setLoading(false);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={() => {
                onClose();
                setStatus(null);
                setLoading(false);
            }}
            title="Eliminar reto"
        >
            {status === null && (
                <>
                    <p className="mb-4">
                        ¿Está seguro que desea eliminar el reto{" "}
                        <span className="font-semibold text-gray-800">{challengeName}</span>?
                    </p>

                    <div className="flex justify-between">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-100"
                            disabled={loading}
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={handleDelete}
                            disabled={loading}
                            className={`${
                                loading ? "bg-red-300" : "bg-red-500 hover:bg-red-600"
                            } text-white px-4 py-2 rounded-lg`}
                        >
                            {loading ? "Eliminando..." : "Confirmar"}
                        </button>
                    </div>
                </>
            )}

            {status === "success" && (
                <p className="text-green-600 font-semibold text-center mt-2">
                    Reto eliminado exitosamente
                </p>
            )}

            {status === "error" && (
                <p className="text-red-600 font-semibold text-center mt-2">
                    Error al eliminar el reto
                </p>
            )}
        </Modal>
    );
};