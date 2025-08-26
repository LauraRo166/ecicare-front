import React, { useState } from "react";

interface AwardFormProps {
    initialData?: { name?: string; image?: File | null };
    onSubmit: (data: { name: string; image: File | null }) => void;
    onCancel: () => void;
}

export const AwardForm: React.FC<AwardFormProps> = ({ initialData, onSubmit, onCancel }) => {
    const [name, setName] = useState(initialData?.name || "");
    const [image, setImage] = useState<File | null>(initialData?.image || null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ name: name, image });
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <label className="font-semibold">Nombre del premio</label>
            <input
                placeholder={name}
                className="mt-1 block w-full rounded-lg border border-gray-300 p-2"
                onChange={(e) => setName(e.target.value)}
            />
            <label className="font-semibold">Imagen</label>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            <div className="flex gap-2 justify-end">
                <button type="button" className="bg-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-400" onClick={onCancel}>
                    Cancelar
                </button>
                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
                    Guardar
                </button>
            </div>
        </form>
    );
};