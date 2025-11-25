import { useEffect, useState } from "react";
import { Modal } from "@/components/common/Modal.tsx";
import type { ModuleData } from "@/types/moduleData.ts";
import { updateModuleAdministrator } from "@/services/moduleService.js";
import { searchUsers } from "@/services/userEcicareService";
import type { UserEcicareResponseDTO } from "@/types/userEcicareData";

interface AddCollaboratorModalProps {
    isOpen: boolean;
    onClose: () => void;
    moduleName: string;
    onSuccess: (updatedModule: ModuleData) => void;
}

export const AddCollaboratorModal = ({
                                         isOpen,
                                         onClose,
                                         moduleName,
                                         onSuccess
                                     }: AddCollaboratorModalProps) => {

    const [query, setQuery] = useState("");
    const [results, setResults] = useState<UserEcicareResponseDTO[]>([]);
    const [selectedUser, setSelectedUser] = useState<UserEcicareResponseDTO | null>(null);

    const [loadingSearch, setLoadingSearch] = useState(false);

    // Debounce search
    useEffect(() => {
        if (!isOpen) {
            setQuery("");
            setResults([]);
            setSelectedUser(null);
            return;
        }

        const delay = setTimeout(async () => {
            if (query.length < 2) {
                setResults([]);
                return;
            }

            try {
                setLoadingSearch(true);
                const users = await searchUsers(query, "COLLABORATOR");
                setResults(users);
            } catch (err) {
                console.error(err);
            } finally {
                setLoadingSearch(false);
            }
        }, 300);

        return () => clearTimeout(delay);
    }, [query, isOpen]);

    const handleSelectUser = (user: UserEcicareResponseDTO) => {
        setSelectedUser(user);
        setQuery(user.name);
        setResults([]);
    };

    const handleSubmit = async () => {
        if (!selectedUser) return;

        try {
            const updated = await updateModuleAdministrator(moduleName, selectedUser.email);
            onSuccess(updated);
            onClose();
        } catch (e) {
            console.error("Error agregando colaborador", e);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Agregar colaborador">
            <div className="flex flex-col gap-4 p-2">

                {/* INPUT DE BÚSQUEDA */}
                <label className="flex flex-col relative">
                    <span className="text-sm text-gray-600">Buscar colaborador por nombre</span>

                    <input
                        type="text"
                        value={query}
                        onChange={(e) => {
                            setQuery(e.target.value);
                            setSelectedUser(null);
                        }}
                        className="border p-2 rounded-md"
                        placeholder="Escribe al menos 2 letras..."
                    />

                    {/* Dropdown */}
                    {results.length > 0 && (
                        <ul className="absolute top-full z-10 bg-white border border-gray-300 w-full mt-1 rounded-md shadow max-h-60 overflow-y-auto">
                            {results.map((user) => (
                                <li
                                    key={user.idEci}
                                    className="p-2 hover:bg-gray-100 cursor-pointer"
                                    onClick={() => handleSelectUser(user)}
                                >
                                    <span className="font-medium">{user.name}</span>
                                    <span className="text-gray-600 text-sm block">{user.email}</span>
                                </li>
                            ))}
                        </ul>
                    )}

                    {loadingSearch && query.length > 1 && (
                        <p className="text-sm text-gray-500 mt-1">Buscando...</p>
                    )}
                </label>

                {/* Usuario seleccionado */}
                {selectedUser && (
                    <div className="p-3 bg-gray-50 border rounded-lg shadow-sm">
                        <p className="font-medium">{selectedUser.name}</p>
                        <p className="text-sm text-gray-600">{selectedUser.email}</p>
                    </div>
                )}

                {/* BOTÓN */}
                <button
                    onClick={handleSubmit}
                    disabled={!selectedUser}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
                >
                    Guardar
                </button>
            </div>
        </Modal>
    );
};
