import { Modal } from "@/components/common/Modal.tsx";

interface AddModuleModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const AddModuleModal = ({ isOpen, onClose }: AddModuleModalProps) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Agregar módulo">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    console.log("Nuevo módulo agregado");
                    onClose();
                }}
                className="flex flex-col gap-4"
            >
                <input
                    type="text"
                    placeholder="Nombre del módulo"
                    className="mt-1 block w-full rounded-lg border border-gray-300 p-2"
                    required
                />

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
                        Guardar
                    </button>
                </div>
            </form>
        </Modal>
    );
};