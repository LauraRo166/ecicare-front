import { Edit, Trash } from "lucide-react";

interface AwardCardProps {
    award: { id: number; name: string; image: unknown };
    onEdit: () => void;
    onDelete: () => void;
}

export const AwardCard = ({ award, onEdit, onDelete }: AwardCardProps) => {
    return (
        <div
            className="bg-white rounded-xl border border-gray-300 p-2 flex flex-col items-center shadow-sm"
            style={{ width: 220, height: 220, minWidth: 0 }}
        >
            <div className="w-full h-24 bg-gray-200 rounded-lg mb-2 flex items-center justify-center overflow-hidden" />

            <div className="w-full text-left mb-2">
                <span className="font-semibold text-base text-black">{award.name}</span>
            </div>

            <div className="flex gap-2 w-full">
                <button
                    type="button"
                    className="flex items-center gap-1 px-2 py-1 rounded bg-yellow-100 text-yellow-700 border border-yellow-300 text-xs font-semibold hover:bg-yellow-200 transition-colors"
                    onClick={onEdit}
                >
                    <Edit size={14} />
                    Editar
                </button>
                <button
                    type="button"
                    className="flex items-center gap-1 px-2 py-1 rounded bg-red-100 text-red-700 border border-red-300 text-xs font-semibold hover:bg-red-200 transition-colors"
                    onClick={onDelete}
                >
                    <Trash size={14} />
                    Eliminar
                </button>
            </div>
        </div>
    );
};