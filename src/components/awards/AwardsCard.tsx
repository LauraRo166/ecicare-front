import { Edit, Trash } from "lucide-react";
import type {AwardData} from "@/types/awardData.ts";

interface AwardCardProps {
    award: AwardData;
    onEdit: () => void;
    onDelete: () => void;
}

export const AwardCard = ({ award, onEdit, onDelete }: AwardCardProps) => {
    return (
        <div
            className="bg-white rounded-xl border border-gray-300 p-2 flex flex-col items-center shadow-sm w-56"
        >
            {award.imageUrl && (
                <div className="w-full h-24 rounded-lg overflow-hidden mb-2 flex items-center justify-center">
                    <img
                        src={award.imageUrl}
                        alt={award.name}
                        className="w-full h-full object-cover"
                    />
                </div>
            )}

            <div className="w-full text-left mb-2">
                <span className="font-semibold text-base text-black block">{award.name}</span>
                {award.description && (
                    <span className="text-sm text-gray-500 block break-words">{award.description}</span>

                )}
                <span className="font-semibold text-sm text-black-500 break-words">En Stock:</span>
                {award.inStock !== 0 && (
                    <span className="text-sm text-black-500 break-words">{award.inStock}</span>
                )}
            </div>

            <div className="flex gap-2 w-full mt-auto">
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