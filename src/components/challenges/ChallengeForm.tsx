import { useState } from "react";
import type { ChallengeData } from "@/types/challengeData";
import type { RedeemableData } from "@/types/redeemableData";
import { RedeemablesList } from "@/components/redeemables/RedeemableList";
import { AssignRedeemableModal } from "@/components/redeemables/AssignRedeemableModal";
import { deleteRedeemable } from "@/services/redeemableService";

interface ChallengeFormProps {
    initialData?: ChallengeData;
    onSubmit: (data: ChallengeData) => void;
    onClose?: () => void;
}

export const ChallengeForm = ({ initialData, onSubmit, onClose }: ChallengeFormProps) => {
    const [form, setForm] = useState<ChallengeData>(
        initialData ?? {
            name: "",
            description: "",
            imageUrl: "",
            phrase: "",
            tips: [],
            duration: "",
            goals: [],
            moduleName: "",
            redeemables: [],
        }
    );

    const [tipsText, setTipsText] = useState((initialData?.tips ?? []).join(", "));
    const [goalsText, setGoalsText] = useState((initialData?.goals ?? []).join(", "));
    const [isRedeemableModalOpen, setIsRedeemableModalOpen] = useState(false);
    const [isChallengeCreated, setIsChallengeCreated] = useState(!!initialData);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const updatedForm: ChallengeData = {
            ...form,
            tips: tipsText.split(",").map((v) => v.trim()).filter(Boolean),
            goals: goalsText.split(",").map((v) => v.trim()).filter(Boolean),
        };
        onSubmit(updatedForm);
        setIsChallengeCreated(true);
    };

    const handleAddRedeemable = (newRedeemable: RedeemableData) => {
        const updatedChallenge: ChallengeData = {
            ...form,
            redeemables: [...(form.redeemables || []), newRedeemable],
        };
        setForm(updatedChallenge);
        onSubmit(updatedChallenge);
    };

    const handleDeleteRedeemable = async (redeemable: RedeemableData) => {
        if (!form.name) {
            console.warn("No hay nombre de reto (form.name) — no se puede eliminar en backend");
            alert("El reto no tiene nombre. Guarda el reto antes de eliminar premios.");
            return;
        }
        if (!redeemable.awardId && redeemable.awardId !== 0) {
            console.warn("awardId inválido:", redeemable.awardId);
            alert("El premio no tiene ID válido.");
            return;
        }

        try {
            await deleteRedeemable(form.name, redeemable.awardId);

            const updated = {
                ...form,
                redeemables: form.redeemables?.filter((r) => r.awardId !== redeemable.awardId),
            };
            setForm(updated);
            onSubmit(updated);
        } catch (error: never) {
            console.error("Error al eliminar el redimible:", error);
            const msg = error?.response?.data?.message || error?.message || "Error desconocido";
            alert("No se pudo eliminar el premio: " + msg);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
                type="text"
                name="name"
                placeholder="Título del reto"
                value={form.name}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg border border-gray-300 p-2"
                required
                disabled={!!initialData}
            />
            <textarea
                name="description"
                placeholder="Descripción"
                value={form.description}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg border border-gray-300 p-2"
                required
            />
            <input
                type="text"
                name="imageUrl"
                placeholder="URL de la imagen"
                value={form.imageUrl}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg border border-gray-300 p-2"
            />
            <input
                type="text"
                name="phrase"
                placeholder="Frase motivacional"
                value={form.phrase}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg border border-gray-300 p-2"
            />
            <input
                type="text"
                name="tips"
                placeholder="Tips (separados por coma)"
                value={tipsText}
                onChange={(e) => setTipsText(e.target.value)}
                className="mt-1 block w-full rounded-lg border border-gray-300 p-2"
            />
            <input
                type="text"
                name="goals"
                placeholder="Metas (separadas por coma)"
                value={goalsText}
                onChange={(e) => setGoalsText(e.target.value)}
                className="mt-1 block w-full rounded-lg border border-gray-300 p-2"
            />
            <input
                type="datetime-local"
                name="duration"
                value={form.duration}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg border border-gray-300 p-2"
            />

            <div className="mt-6">
                <h3 className="font-semibold mb-2">Premios del reto</h3>

                {isChallengeCreated ? (
                    <>
                        {form.redeemables && form.redeemables.length > 0 ? (
                            <RedeemablesList
                                redeemables={form.redeemables}
                                onDelete={handleDeleteRedeemable}
                            />
                        ) : (
                            <p className="text-gray-500 italic">Este reto no tiene premios relacionados.</p>
                        )}
                        <button
                            type="button"
                            onClick={() => setIsRedeemableModalOpen(true)}
                            className="mt-3 bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600"
                        >
                            Asignar premio
                        </button>
                    </>
                ) : (
                    <p className="text-gray-500 italic">
                        Primero debes crear el reto antes de asignar premios.
                    </p>
                )}
            </div>

            <div className="flex justify-end gap-3 mt-4">
                <button
                    type="button"
                    onClick={onClose}
                    className="bg-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-100"
                >
                    Cancelar
                </button>

                <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                >
                    {isChallengeCreated ? "Guardar cambios" : "Crear reto"}
                </button>
            </div>

            {isRedeemableModalOpen && (
                <AssignRedeemableModal
                    isOpen={isRedeemableModalOpen}
                    onClose={() => setIsRedeemableModalOpen(false)}
                    challengeName={form.name}
                    onSave={(newRedeemable) => {
                        handleAddRedeemable(newRedeemable);
                        setIsRedeemableModalOpen(false);
                    }}
                />
            )}
        </form>
    );
};