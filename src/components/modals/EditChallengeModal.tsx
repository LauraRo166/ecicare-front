import { Modal } from "@/components/common/Modal.tsx";
import { useState } from "react";

interface EditChallengeModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    description: string;
    prize: string;
    onSave: (values: { title?: string; description?: string; prize?: string }) => void;
}

export const EditChallengeModal = ({
                                       isOpen,
                                       onClose,
                                       title,
                                       description,
                                       prize,
                                       onSave,
                                   }: EditChallengeModalProps) => {
    const [form, setForm] = useState({ title: "", description: "", prize: "" });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Filtrar solo los campos modificados
        const updatedFields = Object.fromEntries(
            Object.entries(form).filter(([value]) => value.trim() !== "")
        );

        onSave(updatedFields);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Modificar reto">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Título</label>
                    <input
                        type="text"
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        placeholder={title} // ahora el valor actual aparece como placeholder
                        className="mt-1 block w-full rounded-lg border border-gray-300 p-2"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Descripción</label>
                    <input
                        type="text"
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        placeholder={description}
                        className="mt-1 block w-full rounded-lg border border-gray-300 p-2"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Premio</label>
                    <textarea
                        name="prize"
                        value={form.prize}
                        onChange={handleChange}
                        placeholder={prize}
                        className="mt-1 block w-full rounded-lg border border-gray-300 p-2"
                        rows={3}
                    />
                </div>

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