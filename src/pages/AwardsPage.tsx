import { DashboardAwards } from "@/components/dashboards/DashboardAwards.tsx";
import { Header } from "@/components/common/Header.tsx";
import { Plus } from "lucide-react";
import { useState } from "react";
import { AddAwardModal } from "@/components/awards/AddAwardModal.tsx";
import type { AwardData } from "@/types/awardData.ts";

export const AwardsPage = () => {
    const [showCreate, setShowCreate] = useState(false);
    const [newAward, setNewAward] = useState<AwardData | undefined>(undefined);

    return (
        <div className="flex flex-col h-screen w-full">
            <div className="min-h-screen w-full bg-[#fceceb] p-0">
                {/* Header */}
                <Header/>
                {/* Botón Nuevo Premio */}
                <div className="px-10 py-4 mb-6">
                    <button
                        type="button"
                        className="flex items-center gap-2 bg-white text-black font-semibold px-4 py-2
                        rounded-lg hover:bg-green-200 transition-colors"
                        onClick={() => setShowCreate(true)}
                    >
                        Nuevo Premio
                        <Plus size={20} className="text-green-600" />
                    </button>
                </div>

                <DashboardAwards newAward={newAward} />

                <AddAwardModal
                    isOpen={showCreate}
                    onClose={() => setShowCreate(false)}
                    onAdd={(award) => setNewAward(award)}
                />
            </div>
        </div>
    );
};