import React, { useState } from "react";

interface AwardFormProps {
    initialData?: { nombre?: string; imagen?: File | null };
    onSubmit: (data: { nombre: string; imagen: File | null }) => void;
    onCancel: () => void;
}

export const AwardForm: React.FC<AwardFormProps> = ({ initialData, onSubmit, onCancel }) => {
    const [nombre, setNombre] = useState(initialData?.nombre || "");
    const [imagen, setImagen] = useState<File | null>(initialData?.imagen || null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImagen(e.target.files[0]);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ nombre, imagen });
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <label className="font-semibold">Nombre del premio</label>
            <input
                className="border rounded px-2 py-1"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
            />
            <label className="font-semibold">Imagen</label>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            <div className="flex gap-2 justify-end">
                <button type="button" className="px-3 py-1 rounded bg-gray-200" onClick={onCancel}>
                    Cancelar
                </button>
                <button type="submit" className="px-3 py-1 rounded bg-[#d84239] text-white">
                    Guardar
                </button>
            </div>
        </form>
    );
};