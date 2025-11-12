import { useState } from "react";
import type { UserEcicareDto } from "@/types/userEcicareData";

interface Props {
    onSubmit: (data: UserEcicareDto) => void;
}

export const CollaboratorForm = ({ onSubmit }: Props) => {
    const [formData, setFormData] = useState<UserEcicareDto>({
        name: "",
        email: "",
        password: "",
        role: "COLLABORATOR",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Nombre</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-2"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Correo</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-2"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Contraseña</label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-2"
                    required
                />
            </div>

            <button
                type="submit"
                className="w-full bg-[#d84239] hover:bg-[#b5372e] text-white py-2 rounded-lg font-semibold"
            >
                Crear Colaborador
            </button>
        </form>
    );
};