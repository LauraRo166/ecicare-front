import type { UserEcicareResponseDTO } from "@/types/userEcicareData";

interface Props {
    user: UserEcicareResponseDTO;
    onDelete: () => void;
}

export const CollaboratorCard = ({ user, onDelete }: Props) => {
    return (
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl shadow-sm mt-4">
            <h3 className="text-lg font-bold text-gray-800">{user.name}</h3>
            <p className="text-gray-600">📧 {user.email}</p>
            <p className="text-gray-600">Rol: {user.role}</p>

            <button
                onClick={onDelete}
                className="mt-3 bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-lg"
            >
                Eliminar
            </button>
        </div>
    );
};