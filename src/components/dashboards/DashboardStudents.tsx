import { useState } from "react"
import { getConfirmedChallengesByUser } from "@/services/challengeService"
import type { ChallengeData } from "@/types/challengeData"

export const DashboardStudents = () => {
    const [email, setEmail] = useState("")
    const [challenges, setChallenges] = useState<ChallengeData[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleSearch = async () => {
        if (!email.trim()) return
        setLoading(true)
        setError(null)
        try {
            const data = await getConfirmedChallengesByUser(email)
            setChallenges(data)
        } catch (err) {
            setError("No se pudieron cargar los retos del estudiante: " + err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen w-full bg-[#fceceb] p-0 flex flex-col items-center">
            <div className="bg-white rounded-2xl shadow p-6 w-full max-w-2xl border border-gray-200 mt-8">
                <h2 className="text-xl font-bold text-black mb-4">Buscar retos por estudiante</h2>

                <div className="flex gap-2 mb-4">
                    <input
                        type="text"
                        placeholder="Ingresa el email del estudiante"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="flex-1 border border-gray-300 rounded-lg p-2"
                    />
                    <button
                        onClick={handleSearch}
                        className="bg-[#d84239] hover:bg-[#d84239] text-white px-4 py-2 rounded-lg"
                    >
                        Buscar
                    </button>
                </div>

                {loading && <p className="text-gray-500">Cargando retos...</p>}
                {error && <p className="text-red-500">{error}</p>}

                {challenges.length > 0 ? (
                    <ul className="space-y-3">
                        {challenges.map((challenge) => (
                            <li
                                key={challenge.name}
                                className="p-4 border rounded-lg shadow-sm bg-gray-50"
                            >
                                <h3 className="font-semibold">{challenge.name}</h3>
                                <p className="text-sm text-gray-600">{challenge.description}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    !loading && <p className="text-gray-500">No hay retos confirmados para este estudiante.</p>
                )}
            </div>
        </div>
    )
}