import { Modal } from "@/components/common/Modal.tsx";

interface EditModuleModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
}

export const EditModuleModal = ({ isOpen, onClose, title }: EditModuleModalProps) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Editar módulo">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    console.log("Módulo editado");
                    onClose();
                }}
                className="flex flex-col gap-4"
            >
                <input type="text" placeholder={title} className="mt-1 block w-full rounded-lg border border-gray-300 p-2"/>

                <div className="flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="bg-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-400"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                    >
                        Guardar cambios
                    </button>
                </div>
            </form>
        </Modal>
    );
};