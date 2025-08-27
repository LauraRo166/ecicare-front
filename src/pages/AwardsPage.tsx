import { DashboardAwards } from "@/components/dashboards/DashboardAwards.tsx";
import {DashboardHeader} from "@/components/common/DashboardHeader.tsx";
import {useAuth} from "@/contexts/AuthContext.tsx";
import {Plus} from "lucide-react";
import {useState} from "react";
import {AddAwardModal} from "@/components/modals/AddAwardModal.tsx";

export const AwardsPage = () => {
    const { logout } = useAuth();
    const [showCreate, setShowCreate] = useState(false);

    return (
        <div className="flex flex-col h-screen w-full">
            <div className="min-h-screen w-full bg-[#fceceb] p-0">
                {/* Header */}
                <DashboardHeader title="Administrador" onLogout={logout} />

                {/* Botón Nuevo Premio */}
                <div className="px-10 py-4 flex-1 mb-6">
                    <button
                        type="button"
                        className="flex items-center gap-2 bg-green-100 text-black font-semibold px-4 py-2 rounded-lg border border-green-300 hover:bg-green-200 transition-colors"
                        onClick={() => setShowCreate(true)}
                    >
                        Nuevo Premio
                        <Plus size={20} className="text-green-600" />
                    </button>
                </div>

                {/* Módulos */}
                <DashboardAwards />

                <AddAwardModal
                    isOpen={showCreate}
                    onClose={() => setShowCreate(false)}
                />
            </div>
        </div>
    );
};
