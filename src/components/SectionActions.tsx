import {Edit, PlusCircle, Trash2} from "lucide-react";

interface SectionActionsProps {
    title?: string;
    onAdd?: () => void;
    onEdit?: () => void;
    onDelete?: () => void;
}

export const SectionActions = ({ title, onAdd, onEdit, onDelete}:
                        SectionActionsProps) => {

    return (
        <div className="flex rounded-md overflow-hidden">
            {title && (
                <span className="px-4 py-2 font-semibold bg-white text-[#1E1E1E]">
                {title}
            </span>
            )}

            {onAdd && (
                <button onClick={onAdd} className="bg-white hover:bg-green-100 px-2 py-2">
                    <PlusCircle className="text-green-500 w-5 h-5" />
                </button>
            )}

            {onEdit && (
                <button onClick={onEdit} className="bg-white hover:bg-yellow-100 px-2 py-2">
                    <Edit className="text-yellow-500 w-5 h-5" />
                </button>
            )}

            {onDelete && (
                <button onClick={onDelete} className="bg-white hover:bg-red-100 px-2 py-2">
                    <Trash2 className="text-red-500 w-5 h-5" />
                </button>
            )}
        </div>
    );
};