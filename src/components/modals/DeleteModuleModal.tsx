import { Modal } from "@/components/common/Modal.tsx";

interface DeleteModuleModalProps {
    isOpen: boolean;
    onClose: () => void;
    deleteStatus: null | "success" | "error";
    onDelete: () => void;
}

export const DeleteModuleModal = ({ isOpen, onClose, deleteStatus, onDelete }: DeleteModuleModalProps) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Eliminar módulo">
            {deleteStatus === null && (
                <>
                    <p className="mb-4">¿Está seguro que desea eliminar este módulo?</p>
                    <p className="mb-4 text-gray-800">Tenga en cuenta que al eliminar este módulo se eliminarán los retos relacionados</p>
                    <div className="flex justify-between">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-400"
                        >
                            Cancelar
                        </button>

                        <button
                            onClick={onDelete}
                            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                        >
                            Confirmar
                        </button>
                    </div>
                </>
            )}

            {deleteStatus === "success" && <p className="text-green-600 font-semibold">Módulo eliminado exitosamente ✅</p>}
            {deleteStatus === "error" && <p className="text-red-600 font-semibold">Error al eliminar el módulo ❌</p>}
        </Modal>
    );
};