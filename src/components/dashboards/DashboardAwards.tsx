import { Plus, Edit, Trash } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { DashboardHeader } from "@/components/common/DashboardHeader";
import { useState } from "react";
import { Modal } from "@/components/common/Modal";
import { AwardForm } from "@/components/dashboards/AwardForm";
import { ConfirmModal } from "@/components/common/ConfirmModal";

const PAGE_SIZE = 8;
const initialPremios = [
    { id: 1, nombre: "Premio", imagen: null },
    { id: 2, nombre: "Premio", imagen: null },
    { id: 3, nombre: "Premio", imagen: null },
    { id: 4, nombre: "Premio", imagen: null },
    { id: 5, nombre: "Premio", imagen: null },
    { id: 6, nombre: "Premio", imagen: null },
    { id: 7, nombre: "Premio", imagen: null },
    { id: 8, nombre: "Premio", imagen: null },
    { id: 9, nombre: "Premio", imagen: null },
];

export const DashboardAwards = () => {
    const { logout } = useAuth();
    const [premios] = useState(initialPremios);
    const [page, setPage] = useState(1);

    // Estados visuales para mostrar los modales
    const [showCreate, setShowCreate] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [premioSeleccionado, setPremioSeleccionado] = useState<{ id: number; nombre: string; imagen: any } | null>(null);

    const totalPages = Math.ceil(premios.length / PAGE_SIZE);
    const premiosPagina = premios.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    return (
        <div className="min-h-screen w-full bg-[#fceceb] flex flex-col">
            <DashboardHeader title="Administrador" onLogout={logout} />

            <div className="px-10 py-8 flex-1">
                {/* Botón Nuevo Premio */}
                <div className="mb-6">
                    <button
                        type="button"
                        className="flex items-center gap-2 bg-green-100 text-black font-semibold px-4 py-2 rounded-lg border border-green-300 hover:bg-green-200 transition-colors"
                        onClick={() => setShowCreate(true)}
                    >
                        Nuevo Premio
                        <Plus size={20} className="text-green-600" />
                    </button>
                </div>

                {/* Grid de premios */}
                <div className="grid grid-cols-4 gap-6">
                    {premiosPagina.map((premio) => (
                        <div
                            key={premio.id}
                            className="bg-white rounded-xl border border-gray-300 p-2 flex flex-col items-center shadow-sm"
                            style={{ width: 220, height: 220, minWidth: 0 }}
                        >
                            {/* Imagen simulada */}
                            <div className="w-full h-24 bg-gray-200 rounded-lg mb-2 flex items-center justify-center overflow-hidden" />
                            {/* Nombre del premio */}
                            <div className="w-full text-left mb-2">
                                <span className="font-semibold text-base text-black">{premio.nombre}</span>
                            </div>
                            {/* Botones */}
                            <div className="flex gap-2 w-full">
                                <button
                                    type="button"
                                    className="flex items-center gap-1 px-2 py-1 rounded bg-yellow-100 text-yellow-700 border border-yellow-300 text-xs font-semibold hover:bg-yellow-200 transition-colors"
                                    onClick={() => {
                                        setPremioSeleccionado(premio);
                                        setShowEdit(true);
                                    }}
                                >
                                    <Edit size={14} />
                                    Editar
                                </button>
                                <button
                                    type="button"
                                    className="flex items-center gap-1 px-2 py-1 rounded bg-red-100 text-red-700 border border-red-300 text-xs font-semibold hover:bg-red-200 transition-colors"
                                    onClick={() => {
                                        setPremioSeleccionado(premio);
                                        setShowDelete(true);
                                    }}
                                >
                                    <Trash size={14} />
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Paginación minimalista */}
                <div className="flex justify-center items-center mt-8 gap-2">
                    <button
                        type="button"
                        className="p-2 rounded-full border border-gray-300 bg-white text-gray-700 disabled:opacity-40"
                        onClick={() => setPage(page - 1)}
                        disabled={page === 1}
                        aria-label="Anterior"
                    >
                        &lt;
                    </button>
                    {[...Array(totalPages)].map((_, i) => (
                        <button
                            key={i}
                            type="button"
                            className={`w-2 h-2 rounded-full mx-1 ${page === i + 1 ? "bg-[#d84239]" : "bg-gray-300"}`}
                            onClick={() => setPage(i + 1)}
                            aria-label={`Página ${i + 1}`}
                        />
                    ))}
                    <button
                        type="button"
                        className="p-2 rounded-full border border-gray-300 bg-white text-gray-700 disabled:opacity-40"
                        onClick={() => setPage(page + 1)}
                        disabled={page === totalPages}
                        aria-label="Siguiente"
                    >
                        &gt;
                    </button>
                </div>
            </div>

            {/* Modal Crear Premio */}
            <Modal open={showCreate} onClose={() => setShowCreate(false)}>
                <AwardForm
                    initialData={undefined}
                    onSubmit={() => setShowCreate(false)}
                    onCancel={() => setShowCreate(false)}
                />
            </Modal>

            {/* Modal Editar Premio */}
            <Modal open={showEdit} onClose={() => setShowEdit(false)}>
                <AwardForm
                    initialData={premioSeleccionado || undefined}
                    onSubmit={() => setShowEdit(false)}
                    onCancel={() => setShowEdit(false)}
                />
            </Modal>

            {/* Modal Eliminar Premio */}
            <ConfirmModal
                open={showDelete}
                onClose={() => setShowDelete(false)}
                onConfirm={() => setShowDelete(false)}
                message={`¿Seguro que deseas eliminar el premio "${premioSeleccionado?.nombre || ""}"?`}
            />
        </div>
    );
};