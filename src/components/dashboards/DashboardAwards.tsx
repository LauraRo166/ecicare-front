import { useState } from "react";
import { DeleteAwardModal } from "@/components/modals/DeleteAwardModal";
import { EditAwardModal } from "@/components/modals/EditAwardModal";
import { AwardsPagination } from "@/components/AwardsPagination.tsx";
import { AwardsGrid } from "@/components/AwardsGrid.tsx"

const PAGE_SIZE = 8;
const initialAwards = [
    { id: 1, name: "Premio", image: null },
    { id: 2, name: "Premio", image: null },
    { id: 3, name: "Premio", image: null },
    { id: 4, name: "Premio", image: null },
    { id: 5, name: "Premio", image: null },
    { id: 6, name: "Premio", image: null },
    { id: 7, name: "Premio", image: null },
    { id: 8, name: "Premio", image: null },
    { id: 9, name: "Premio", image: null },
];

export const DashboardAwards = () => {
    const [awards] = useState(initialAwards);
    const [page, setPage] = useState(1);
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [selectedAward, setSelectedAward] = useState<{ id: number; name: string; image: unknown } | null>(null);

    const totalPages = Math.ceil(awards.length / PAGE_SIZE);
    const awardsPage = awards.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    return (
        <div className="min-h-screen w-full bg-[#fceceb] flex flex-col">
            <div className="px-10 flex-1">
                {/* Grid de premios */}
                <AwardsGrid
                    awards={awardsPage}
                    onEdit={(award) => {
                        setSelectedAward(award);
                        setShowEdit(true);
                    }}
                    onDelete={(award) => {
                        setSelectedAward(award);
                        setShowDelete(true);
                    }}
                />

                <AwardsPagination
                    page={page}
                    totalPages={totalPages}
                    onPageChange={setPage}
                />
            </div>

            <EditAwardModal
                isOpen={showEdit}
                onClose={() => setShowEdit(false)}
                selectedAward={selectedAward}
            />

            <DeleteAwardModal
                isOpen={showDelete}
                onClose={() => setShowDelete(false)}
                onDelete={async () => {
                    console.log("Eliminar reto");
                    return true;
                }}
            />
        </div>
    );
};
