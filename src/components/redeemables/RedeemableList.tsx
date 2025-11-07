import type { RedeemableData } from "@/types/redeemableData";

interface RedeemablesListProps {
    redeemables?: RedeemableData[];
}

export const RedeemablesList = ({ redeemables }: RedeemablesListProps) => {
    if (!redeemables || redeemables.length === 0) {
        return <p>Este reto no tiene premios relacionados.</p>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {redeemables.map((r, index) => (
                <div
                    key={r.awardId ?? r.name ?? index}
                    className="border p-2 rounded-lg flex items-center gap-3"
                >
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