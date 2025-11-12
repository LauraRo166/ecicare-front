import { useState } from "react";

import type {ModuleData} from "@/types/moduleData.ts";

interface ModuleFormProps {
    initialData?: ModuleData;
    onSubmit: (data: ModuleData) => void;
    onClose?: () => void;
}

export const ModuleForm = ({ initialData, onSubmit, onClose }: ModuleFormProps) => {
    const [form, setForm] = useState<ModuleData>({
        name: initialData?.name || "",
        description: initialData?.description || "",
        imageUrl: initialData?.imageUrl || "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(form);
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
                type="text"
                name="name"
                placeholder="Nombre del módulo"
                value={form.name}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg border border-gray-300 p-2"
                required
                disabled={!!initialData}
            />

            <textarea
                name="description"
                placeholder="Descripción"
                value={form.description}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg border border-gray-300 p-2"
            />

            <input
                type="text"
                name="imageUrl"
                placeholder="URL de la imagen"
                value={form.imageUrl}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg border border-gray-300 p-2"
            />

            <div className="flex justify-end gap-3 mt-4">
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
    );
};