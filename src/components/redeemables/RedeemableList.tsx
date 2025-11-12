import type { RedeemableData } from "@/types/redeemableData";

interface RedeemablesListProps {
    redeemables?: RedeemableData[];
    onDelete?: (redeemable: RedeemableData) => void;
}

export const RedeemablesList = ({ redeemables, onDelete }: RedeemablesListProps) => {
    if (!redeemables || redeemables.length === 0) {
        return <p>Este reto no tiene premios relacionados.</p>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {redeemables.map((r, index) => (
                <div
                    key={r.awardId ?? r.name ?? index}
                    className="relative border p-3 rounded-lg flex items-center gap-3 bg-white shadow-sm"
                >
                    {onDelete && (
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                onDelete(r);
                            }}
                            className="absolute top-1 right-1 text-gray-400 hover:text-red-500 text-lg font-bold"
                            title="Eliminar redimible"
                        >
                            ✕
                        </button>
                    )}

                    {r.imageUrl ? (
                        <img
                            src={r.imageUrl}
                            alt={r.name || "Premio"}
                            className="w-16 h-16 object-contain rounded-lg bg-gray-100"
                        />
                    ) : (
                        <div className="w-16 h-16 bg-gray-100 flex items-center justify-center rounded-lg">
                            <span className="text-sm">{r.name?.charAt(0) || "?"}</span>
                        </div>
                    )}

                    <div>
                        <p className="font-bold">{r.name}</p>
                        <p className="text-sm text-gray-600">{r.description || "Sin descripción"}</p>
                        {r.limitDays && (
                            <p className="text-xs text-gray-500 mt-1">
                                Límite: {r.limitDays} días
                            </p>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};
