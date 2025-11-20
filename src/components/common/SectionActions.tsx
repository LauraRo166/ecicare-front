import { useAuth } from "@/contexts/AuthContext";
import { Edit, PlusCircle, Trash2, UserPlus } from "lucide-react";

interface SectionActionsProps {
    title?: string;
    onAdd?: () => void;
    onEdit?: () => void;
    onDelete?: () => void;
    onAddCollaborator?: () => void;   // ← NUEVO
}

export const SectionActions = ({
                                   title,
                                   onAdd,
                                   onEdit,
                                   onDelete,
                                   onAddCollaborator            // ← NUEVO
                               }: SectionActionsProps) => {

    const { role } = useAuth();

    const isReadOnly = role === "COLLABORATOR";

    return (
        <div className="flex rounded-md overflow-hidden">
            {title && (
                <span className="px-4 py-2 font-semibold bg-white text-[#1E1E1E]">
                    {title}
                </span>
            )}

            {/* Botón agregar */}
            {onAdd && (
                <button
                    onClick={!isReadOnly ? onAdd : undefined}
                    className={`bg-white px-2 py-2 ${
                        isReadOnly ? "opacity-40 cursor-not-allowed" : "hover:bg-green-100"
                    }`}
                    disabled={isReadOnly}
                >
                    <PlusCircle className="text-green-500 w-5 h-5" />
                </button>
            )}

            {/* Botón editar */}
            {onEdit && (
                <button
                    onClick={!isReadOnly ? onEdit : undefined}
                    className={`bg-white px-2 py-2 ${
                        isReadOnly ? "opacity-40 cursor-not-allowed" : "hover:bg-yellow-100"
                    }`}
                    disabled={isReadOnly}
                >
                    <Edit className="text-yellow-500 w-5 h-5" />
                </button>
            )}

            {/* Botón eliminar */}
            {onDelete && (
                <button
                    onClick={!isReadOnly ? onDelete : undefined}
                    className={`bg-white px-2 py-2 ${
                        isReadOnly ? "opacity-40 cursor-not-allowed" : "hover:bg-red-100"
                    }`}
                    disabled={isReadOnly}
                >
                    <Trash2 className="text-red-500 w-5 h-5" />
                </button>
            )}

            {onAddCollaborator && (
                <button
                    onClick={!isReadOnly ? onAddCollaborator : undefined}
                    className={`bg-white px-2 py-2 ${
                        isReadOnly ? "opacity-40 cursor-not-allowed" : "hover:bg-blue-100"
                    }`}
                    disabled={isReadOnly}
                >
                    <UserPlus className="text-blue-500 w-5 h-5" />
                </button>
            )}
        </div>
    );
};