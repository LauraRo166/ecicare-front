import { useState, useEffect } from "react"
import {
    getRegisteredUsersByChallenge,
    getConfirmedUsersByChallenge,
    getChallenges
} from "@/services/challengeService"

export const DashboardStudents = () => {
    const [challengeName, setChallengeName] = useState("")
    const [registeredUsers, setRegisteredUsers] = useState<string[]>([])
    const [confirmedUsers, setConfirmedUsers] = useState<string[]>([])
    const [challenges, setChallenges] = useState<string[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchChallenges = async () => {
            try {
                const allChallenges = await getChallenges()
                setChallenges(allChallenges?.map((c) => c.name) ?? [])
            } catch (err) {
                console.error("Error al cargar los retos:", err)
            }
        }
        fetchChallenges()
    }, [])

    const handleSearch = async () => {
        if (!challengeName.trim()) return
        setLoading(true)
        setError(null)

        try {
            const registered = await getRegisteredUsersByChallenge(challengeName)
            const confirmed = await getConfirmedUsersByChallenge(challengeName)

            setRegisteredUsers(registered)
            setConfirmedUsers(confirmed)
        } catch (err) {
            setError("No se pudieron cargar los usuarios: " + err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen w-full bg-[#fceceb] p-0 flex flex-col items-center">
            <div className="bg-white rounded-2xl shadow p-6 w-full max-w-3xl border border-gray-200 mt-8">
                <h2 className="text-xl font-bold text-black mb-4">Usuarios por reto</h2>

                {/* Selector de reto */}
                <div className="flex gap-2 mb-4">
                    <select
                        value={challengeName}
                        onChange={(e) => setChallengeName(e.target.value)}
                        className="flex-1 border border-gray-300 rounded-lg p-2"
                    >
                        <option value="">Selecciona un reto</option>
                        {challenges.map((ch) => (
                            <option key={ch} value={ch}>
                                {ch}
                            </option>
                        ))}
                    </select>

                    <button
                        onClick={handleSearch}
                        className="bg-[#d84239] hover:bg-[#b5372e] text-white px-4 py-2 rounded-lg"
                    >
                        Buscar
                    </button>
                </div>

                {/* Estado */}
                {loading && <p className="text-gray-500">Cargando...</p>}
                {error && <p className="text-red-500">{error}</p>}

                {/* Usuarios Registrados */}
                <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-2">Usuarios registrados</h3>

                    {registeredUsers.length === 0 ? (
                        <p className="text-gray-500">No hay usuarios registrados.</p>
                    ) : (
                        <ul className="space-y-2">
                            {registeredUsers.map((email, index) => (
                                <li key={index} className="p-3 border rounded-lg bg-gray-50">
                                    {email}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Usuarios Confirmados */}
                <div className="mt-8">
                    <h3 className="text-lg font-semibold mb-2">Usuarios confirmados</h3>

                    {confirmedUsers.length === 0 ? (
                        <p className="text-gray-500">No hay usuarios confirmados aún.</p>
                    ) : (
                        <ul className="space-y-2">
                            {confirmedUsers.map((email, index) => (
                                <li key={index} className="p-3 border rounded-lg bg-green-50">
                                    {email}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    )
}