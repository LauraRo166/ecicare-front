import { Modal } from "@/components/common/Modal.tsx";
import { useState } from "react";
import { deleteModule } from "@/services/moduleService";
import axios from "axios";

interface DeleteModuleModalProps {
    isOpen: boolean;
    onClose: () => void;
    moduleName: string;
    onDeleteSuccess?: () => void;
}

export const DeleteModuleModal = ({ isOpen, onClose, moduleName, onDeleteSuccess }: DeleteModuleModalProps) => {
    const [status, setStatus] = useState<null | "success" | "error">(null);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const handleDelete = async () => {
        try {
            await deleteModule(moduleName);
            setStatus("success");
            onDeleteSuccess?.();
            setTimeout(() => onClose(), 1500);
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                if (error.response.status === 400) {
                    setErrorMessage("El módulo aún tiene retos asociados, no es posible eliminarlo.");
                } else {
                    setErrorMessage(error.response.data?.message || "Error al eliminar el módulo.");
                }
            } else {
                setErrorMessage("Error inesperado al eliminar el módulo.");
            }
            setStatus("error");
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Eliminar módulo">
            {status === null && (
                <>
                    <p className="mb-4">¿Está seguro que desea eliminar el módulo <b>{moduleName}</b>?</p>
                    <p className="mb-4 text-gray-800">
                        Tenga en cuenta que solo se puede eliminar si no tiene retos asociados.
                    </p>
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
                <p className="text-green-600 font-semibold">Módulo eliminado exitosamente</p>
            )}

            {status === "error" && (
                <p className="text-red-600 font-semibold">{errorMessage}</p>
            )}
        </Modal>
    );
};