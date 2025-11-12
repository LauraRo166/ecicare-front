import { useEffect, useState } from "react";
import { DeleteAwardModal } from "@/components/awards/DeleteAwardModal.tsx";
import { EditAwardModal } from "@/components/awards/EditAwardModal.tsx";
import { Pagination } from "@/components/common/Pagination.tsx";
import { AwardsGrid } from "@/components/awards/AwardsGrid.tsx";
import type { AwardData } from "@/types/awardData.ts";
import { getAwards, getAwardsTotal, deleteAward } from "@/services/awardService";

const PAGE_SIZE = 8;

interface DashboardAwardsProps {
    newAward?: AwardData;
}

export const DashboardAwards = ({ newAward }: DashboardAwardsProps) => {
    const [awards, setAwards] = useState<AwardData[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [selectedAward, setSelectedAward] = useState<AwardData | undefined>(undefined);

    useEffect(() => {
        const fetchAwards = async () => {
            try {
                const data = await getAwards(page, PAGE_SIZE);
                setAwards(data);
            } catch (error) {
                console.error("Error cargando premios:", error);
            }
        };

        const fetchTotalAwards = async () => {
            try {
                const total = await getAwardsTotal();
                setTotalPages(Math.ceil(total / PAGE_SIZE));
            } catch (error) {
                console.error("Error obteniendo total de premios:", error);
            }
        };

        fetchAwards();
        fetchTotalAwards();
    }, [page]);

    useEffect(() => {
        if (newAward) {
            setAwards((prev) => [newAward, ...prev]);
        }
    }, [newAward]);

    const handleUpdateAward = (updated: AwardData) => {
        setAwards((prev) =>
            prev.map(a => (a.id === updated.id ? updated : a))
        );
    };

    const handleDelete = async () => {
        if (!selectedAward) return false;
        try {
            await deleteAward(selectedAward.id);
            setAwards(prev => prev.filter(a => a.id !== selectedAward.id));
            setShowDelete(false);
            return true;
        } catch (error) {
            console.error("Error eliminando premio:", error);
            return false;
        }
    };

    return (
        <div className="min-h-screen w-full bg-[#fceceb] flex flex-col">
            <div className="px-10 flex-1">
                <AwardsGrid
                    awards={awards}
                    onEdit={(award) => {
                        setSelectedAward(award);
                        setShowEdit(true);
                    }}
                    onDelete={(award) => {
                        setSelectedAward(award);
                        setShowDelete(true);
                    }}
                />

                <Pagination
                    page={page}
                    totalPages={totalPages}
                    onPageChange={setPage}
                />
            </div>

            {selectedAward && (
                <EditAwardModal
                    isOpen={showEdit}
                    onClose={() => setShowEdit(false)}
                    selectedAward={selectedAward}
                    onUpdate={handleUpdateAward}
                />
            )}

            <DeleteAwardModal
                isOpen={showDelete}
                onClose={() => setShowDelete(false)}
                onDelete={handleDelete}
            />
        </div>
    );
};