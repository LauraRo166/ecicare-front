import { useState } from "react";
import { SectionActions } from "@/components/common/SectionActions.tsx";
import { EditChallengeModal } from "@/components/challenges/EditChallengeModal.tsx";
import { DeleteChallengeModal } from "@/components/challenges/DeleteChallengeModal.tsx";
import type { ChallengeData } from "@/types/challengeData.ts";
import { FileText, Clock, Target, Lightbulb, Gift } from "lucide-react";

interface ChallengeProps {
    challenge: ChallengeData;
    onUpdate: (updatedChallenge: ChallengeData) => void;
    onDelete: (deletedChallengeName: string) => void;
}

export const Challenge = ({ challenge, onUpdate, onDelete }: ChallengeProps) => {
    const [isEdit, setIsEdit] = useState(false);
    const [isDelete, setIsDelete] = useState(false);

    const formatDuration = (duration: string) => {
        const date = new Date(duration);
        return date.toLocaleString("es-CO", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <div className="bg-white shadow-sm border border-gray-200 rounded-xl p-4 mb-3 relative flex gap-4">
            <EditChallengeModal
                isOpen={isEdit}
                onClose={() => setIsEdit(false)}
                challenge={challenge}
                onUpdate={(updatedChallenge) => {
                    setIsEdit(false);
                    onUpdate(updatedChallenge);
                }}
            />
            <DeleteChallengeModal
                isOpen={isDelete}
                onClose={() => setIsDelete(false)}
                challengeName={challenge.name}
                onDeleteSuccess={() => {
                    setIsDelete(false);
                    onUpdate(challenge);
                    onDelete(challenge.name);
                }}
            />

            <div className="absolute top-3 right-3 flex gap-2">
                <SectionActions
                    onEdit={() => setIsEdit(true)}
                    onDelete={() => setIsDelete(true)}
                />
            </div>

            {challenge.imageUrl && (
                <div className="w-36 flex-shrink-0">
                    <img
                        src={challenge.imageUrl}
                        alt={challenge.name}
                        className="rounded-lg h-24 w-full object-cover"
                    />
                </div>
            )}

            <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                    {challenge.name}
                </h3>
                {challenge.phrase && <p className="italic text-gray-600 mt-1">“{challenge.phrase}”</p>}

                <div className="mt-2 space-y-1 text-sm text-gray-700">
                    {challenge.description && (
                        <p className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-blue-600" />
                            <span className="font-semibold">Descripción:</span> {challenge.description}
                        </p>
                    )}
                    {challenge.duration && (
                        <p className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-purple-600" />
                            <span className="font-semibold">Duración:</span> {formatDuration(challenge.duration)}
                        </p>
                    )}
                    {(challenge.tips?.length ?? 0) > 0 && (
                        <div className="flex items-start gap-2">
                            <Lightbulb className="w-4 h-4 text-green-600 mt-1" />
                            <div>
                                <span className="font-semibold">Tips:</span>
                                <ul className="list-disc list-inside">
                                    {challenge.tips?.map((tip, idx) => (
                                        <li key={idx}>{tip}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}
                    {(challenge.goals?.length ?? 0) > 0 && (
                        <div className="flex items-start gap-2">
                            <Target className="w-4 h-4 text-red-600 mt-1" />
                            <div>
                                <span className="font-semibold">Metas:</span>
                                <ul className="list-disc list-inside">
                                    {challenge.goals?.map((goal, idx) => (
                                        <li key={idx}>{goal}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}

                    {typeof challenge.requiredVerifications === "number" && (
                        <p className="flex items-center gap-2">
                            <span className="font-semibold">Verificaciones requeridas:</span>
                            {challenge.requiredVerifications}
                        </p>
                    )}

                    <div className="flex items-start gap-2 mt-2">
                        <Gift className="w-4 h-4 text-yellow-600 mt-1" />
                        <div>
                            <span className="font-semibold">Premios asignados:</span>
                            {(challenge.redeemables?.length ?? 0) > 0 ? (
                                <ul className="list-disc list-inside mt-1">
                                    {challenge.redeemables?.map((r, idx) => (
                                        <li key={idx}>
                                            {r.name}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-gray-500 text-sm mt-1">
                                    Este reto no tiene premios relacionados.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};