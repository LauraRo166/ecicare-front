import { useEffect, useState } from "react";
import { Modal } from "@/components/common/Modal";
import type { AwardData } from "@/types/awardData";
import type { RedeemableData } from "@/types/redeemableData";
import { getAwards } from "@/services/awardService";
import { createRedeemable, updateRedeemable } from "@/services/redeemableService";

interface AssignRedeemableModalProps {
    isOpen: boolean;
    onClose: () => void;
    challengeName: string;
    existingRedeemable?: RedeemableData;
    onSave?: (redeemable: RedeemableData) => void;
}

export const AssignRedeemableModal = ({
                                          isOpen,
                                          onClose,
                                          challengeName,
                                          existingRedeemable,
                                          onSave,
                                      }: AssignRedeemableModalProps) => {
    const [awards, setAwards] = useState<AwardData[]>([]);
    const [selectedAwardId, setSelectedAwardId] = useState<number | "">(
        existingRedeemable?.awardId ?? ""
    );
    const [limitDays, setLimitDays] = useState<number>(
        existingRedeemable?.limitDays ?? 7
    );
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchAwards = async () => {
            try {
                const data = await getAwards(1, 50);
                setAwards(data.filter((a) => a.id !== undefined));
            } catch (error) {
                console.error("Error cargando premios:", error);
            }
        };
        fetchAwards();
    }, []);

    const handleSave = async () => {
        if (!selectedAwardId) {
            alert("Debes seleccionar un premio");
            return;
        }
        if (!limitDays || limitDays <= 0) {
            alert("Ingresa un número de días válido");
            return;
        }

        setLoading(true);
        try {
            const dto: RedeemableData = {
                challengeName,
                awardId: Number(selectedAwardId),
                limitDays,
            };

            const saved = existingRedeemable
                ? await updateRedeemable(challengeName, existingRedeemable.awardId, dto)
                : await createRedeemable(dto);

            onSave?.(saved);
            onClose();
        } catch (error) {
            console.error("Error guardando redimible:", error);
            alert("No se pudo guardar el redimible. Intenta nuevamente.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={existingRedeemable ? "Editar Premio" : "Asignar Premio"}
        >
            <div className="flex flex-col gap-4">
                <label className="flex flex-col">
                    Premio:
                    <select
                        value={selectedAwardId}
                        onChange={(e) => setSelectedAwardId(Number(e.target.value))}
                        className="mt-1 p-2 border rounded-lg"
                    >
                        <option value="">Selecciona un premio</option>
                        {awards.map((award) => (
                            <option key={award.id} value={award.id}>
                                {award.name}
                            </option>
                        ))}
                    </select>
                </label>

                <label className="flex flex-col">
                    Días límite para reclamar:
                    <input
                        type="number"
                        min={1}
                        value={limitDays}
                        onChange={(e) => setLimitDays(Number(e.target.value))}
                        className="mt-1 p-2 border rounded-lg"
                    />
                </label>

                <div className="flex justify-end gap-3 mt-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="bg-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-400"
                        disabled={loading}
                    >
                        Cancelar
                    </button>

                    <button
                        type="button"
                        onClick={handleSave}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                        disabled={loading}
                    >
                        {loading
                            ? "Guardando..."
                            : existingRedeemable
                                ? "Actualizar"
                                : "Asignar"}
                    </button>
                </div>
            </div>
        </Modal>
    );
};