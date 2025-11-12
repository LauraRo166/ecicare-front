import { useState, useEffect } from "react"
import { getRegisteredUsersByChallenge, getChallenges } from "@/services/challengeService"

export const DashboardStudents = () => {
    const [challengeName, setChallengeName] = useState("")
    const [registeredUsers, setRegisteredUsers] = useState<string[]>([])
    const [challenges, setChallenges] = useState<string[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchChallenges = async () => {
            try {
                const allChallenges = await getChallenges()
                setChallenges(allChallenges?.map((c: any) => c.name) ?? [])
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
            const data = await getRegisteredUsersByChallenge(challengeName)
            setRegisteredUsers(data)
        } catch (err) {
            setError("No se pudieron cargar los usuarios registrados: " + err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen w-full bg-[#fceceb] p-0 flex flex-col items-center">
            <div className="bg-white rounded-2xl shadow p-6 w-full max-w-2xl border border-gray-200 mt-8">
                <h2 className="text-xl font-bold text-black mb-4">Usuarios registrados por reto</h2>

                <div className="flex gap-2 mb-4">
                    <select
                        value={challengeName}
                        onChange={(e) => setChallengeName(e.target.value)}
                        className="flex-1 border border-gray-300 rounded-lg p-2"
                    >
                        <option value="">Selecciona un reto</option>
                        {challenges.map((ch) => (
                            <option key={ch} value={ch}>{ch}</option>
                        ))}
                    </select>

                    <button
                        onClick={handleSearch}
                        className="bg-[#d84239] hover:bg-[#b5372e] text-white px-4 py-2 rounded-lg"
                    >
                        Buscar
                    </button>
                </div>

                {loading && <p className="text-gray-500">Cargando usuarios...</p>}
                {error && <p className="text-red-500">{error}</p>}

                {!loading && !error && registeredUsers.length === 0 && challengeName && (
                    <p className="text-gray-500">No hay usuarios registrados en este reto.</p>
                )}

                {registeredUsers.length > 0 && (
                    <ul className="space-y-3">
                        {registeredUsers.map((userEmail, index) => (
                            <li
                                key={index}
                                className="p-3 border rounded-lg shadow-sm bg-gray-50"
                            >
                                <p className="font-medium">{userEmail}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}