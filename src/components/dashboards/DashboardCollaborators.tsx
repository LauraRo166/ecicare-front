import { useEffect, useState } from "react"
import { searchUsers, updateUserRole } from "@/services/userEcicareService"
import type { UserEcicareResponseDTO } from "@/types/userEcicareData"

export function DashboardCollaborators() {
    const [query, setQuery] = useState("")
    const [results, setResults] = useState<UserEcicareResponseDTO[]>([])
    const [selectedUser, setSelectedUser] = useState<UserEcicareResponseDTO | null>(null)

    const [loadingSearch, setLoadingSearch] = useState(false)
    const [updatingRole, setUpdatingRole] = useState(false)

    const [message, setMessage] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)

    // Debounce de búsqueda
    useEffect(() => {
        const delay = setTimeout(async () => {
            if (query.length < 2) {
                setResults([])
                return
            }

            try {
                setLoadingSearch(true)
                const users = await searchUsers(query)
                setResults(users)
            } catch (err) {
                console.error(err)
            } finally {
                setLoadingSearch(false)
            }
        }, 300)

        return () => clearTimeout(delay)
    }, [query])

    const handleSelectUser = (user: UserEcicareResponseDTO) => {
        setSelectedUser(user)
        setQuery(user.name)
        setResults([])
    }

    const handleConvert = async () => {
        if (!selectedUser) {
            setError("Debes seleccionar un usuario primero.")
            return
        }

        setError(null)
        setMessage(null)
        setUpdatingRole(true)

        try {
            await updateUserRole(selectedUser.idEci, "COLLABORATOR")

            setMessage(
                `El usuario ${selectedUser.name} ahora es COLABORADOR.`
            )

            setSelectedUser(null)
            setQuery("")
        } catch (err) {
            console.error(err)
            setError("Error al actualizar el rol.")
        } finally {
            setUpdatingRole(false)
        }
    }

    return (
        <div className="min-h-screen w-full bg-[#fceceb] p-0 flex flex-col items-center">
            <div className="bg-white rounded-2xl shadow p-6 w-full max-w-2xl border border-gray-200 mt-8">

                <h2 className="text-xl font-bold text-black mb-4">
                    Crear colaborador
                </h2>

                {/* INPUT DE BÚSQUEDA */}
                <div className="relative mb-4">
                    <input
                        type="text"
                        className="border border-gray-300 w-full p-2 rounded-lg"
                        placeholder="Busca un usuario por nombre..."
                        value={query}
                        onChange={(e) => {
                            setQuery(e.target.value)
                            setSelectedUser(null)
                        }}
                    />

                    {/* Dropdown */}
                    {results.length > 0 && (
                        <ul className="absolute z-10 bg-white border border-gray-300 w-full mt-1 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                            {results.map((user) => (
                                <li
                                    key={user.idEci}
                                    onClick={() => handleSelectUser(user)}
                                    className="p-2 hover:bg-gray-100 cursor-pointer"
                                >
                                    <span className="font-medium">{user.name}</span>
                                    <span className="text-gray-600 text-sm block">
                                        {user.email}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    )}

                    {loadingSearch && query.length > 1 && (
                        <p className="text-sm text-gray-500 mt-1">
                            Buscando...
                        </p>
                    )}
                </div>

                {/* Usuario seleccionado */}
                {selectedUser && (
                    <div className="p-3 bg-gray-50 border rounded-lg mb-4 shadow-sm">
                        <p className="font-medium">{selectedUser.name}</p>
                        <p className="text-sm text-gray-600">
                            {selectedUser.email}
                        </p>
                    </div>
                )}

                {/* Botón convertir */}
                <button
                    onClick={handleConvert}
                    disabled={updatingRole || !selectedUser}
                    className="w-full bg-[#d84239] hover:bg-[#b5372e] text-white py-2 rounded-lg disabled:bg-gray-400"
                >
                    {updatingRole ? "Actualizando..." : "Convertir en colaborador"}
                </button>

                {/* Mensajes */}
                {message && (
                    <p className="text-green-600 mt-3 font-medium">{message}</p>
                )}
                {error && (
                    <p className="text-red-600 mt-3 font-medium">{error}</p>
                )}
            </div>
        </div>
    )
}