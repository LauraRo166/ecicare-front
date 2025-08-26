import { useState } from "react";
import { SectionActions } from "@/components/SectionActions";
import { EditChallengeModal } from "@/components/modals/EditChallengeModal.tsx";
import { DeleteChallengeModal } from "@/components/modals/DeleteChallengeModal.tsx";
import { Trophy, FileText } from "lucide-react"; // 👈 iconos

interface ChallengeProps {
    title: string;
    description: string;
    prize: string;
}

export const Challenge = ({ title, description, prize }: ChallengeProps) => {
    const [isEdit, setIsEdit] = useState(false);
    const [isDelete, setIsDelete] = useState(false);

    return (
        <div className="bg-white shadow-sm border border-gray-200 rounded-xl p-4 mb-3 relative">
            <EditChallengeModal
                isOpen={isEdit}
                onClose={() => setIsEdit(false)}
                title={title}
                description={description}
                prize={prize}
                onSave={(values) => console.log("Guardar reto", values)}
            />

            <DeleteChallengeModal
                isOpen={isDelete}
                onClose={() => setIsDelete(false)}
                onDelete={async () => {
                    console.log("Eliminar reto");
                    return true;
                }}
            />

            <div className="absolute top-3 right-3 flex gap-2">
                <SectionActions onEdit={() => setIsEdit(true)} onDelete={() => setIsDelete(true)} />
            </div>

            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                {title}
            </h3>

            <div className="mt-3 space-y-2 text-sm text-gray-700">
                <p className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-yellow-600" />
                    <span className="font-semibold">Premio:</span> {prize}
                </p>
                <p className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-blue-600" />
                    <span className="font-semibold">Descripción:</span> {description}
                </p>
            </div>
        </div>
    );
};
