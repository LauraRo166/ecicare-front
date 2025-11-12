import React, { useState } from "react";
import type { AwardData } from "@/types/awardData.ts";

interface AwardFormProps {
    initialData?: AwardData;
    onSubmit: (data: AwardData) => void;
    onCancel: () => void;
}

export const AwardForm: React.FC<AwardFormProps> = ({ initialData, onSubmit, onCancel }) => {
    const [form, setForm] = useState<AwardData>({
        awardId: initialData?.awardId || 0,
        name: initialData?.name || "",
        description: initialData?.description || "",
        inStock: initialData?.inStock,
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
                placeholder="Nombre del premio"
                value={form.name}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg border border-gray-300 p-2"
                required
            />

            <textarea
                name="description"
                placeholder="Descripción"
                value={form.description}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg border border-gray-300 p-2"
            />

            <input
                type="number"
                name="inStock"
                placeholder="Cantidad en stock"
                value={form.inStock ?? ""}
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
                    onClick={onCancel}
                    className="bg-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-100"
                >
                    Cancelar
                </button>
                <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-100"
                >
                    Guardar
                </button>
            </div>
        </form>
    );
};