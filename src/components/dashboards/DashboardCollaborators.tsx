import { useState } from "react"
import { createEcicareUser } from "@/services/userEcicareService.ts"
import type { UserEcicareDto } from "@/types/userEcicareData"

export const DashboardCollaborators = () => {
    const [idEci, setIdEci] = useState("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setMessage(null)
        setError(null)
        setLoading(true)

        try {
            const user: UserEcicareDto = {
                idEci: parseInt(idEci),
                name,
                email,
                password,
                role: "COLLABORATOR",
            }

            await createEcicareUser(user)
            setMessage("Colaborador creado exitosamente")
            setIdEci("")
            setName("")
            setEmail("")
            setPassword("")
        } catch (err: unknown) {
            console.error(err)
            setError("Error al crear el colaborador. Verifica los datos o si el usuario ya existe.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen w-full bg-[#fceceb] flex flex-col items-center">
            <div className="bg-white rounded-2xl shadow p-8 w-full max-w-2xl border border-gray-200 mt-10">
                <h2 className="text-2xl font-bold text-black mb-6">Registrar nuevo colaborador</h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            ID ECI
                        </label>
                        <input
                            type="number"
                            value={idEci}
                            onChange={(e) => setIdEci(e.target.value)}
                            required
                            className="w-full border border-gray-300 rounded-lg p-2"
                            placeholder="Ej: 12345"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Nombre completo
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full border border-gray-300 rounded-lg p-2"
                            placeholder="Ej: Samuel Rodríguez"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Correo institucional
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full border border-gray-300 rounded-lg p-2"
                            placeholder="Ej: samuel.rodriguez@escuelaing.edu.co"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full border border-gray-300 rounded-lg p-2"
                            placeholder="Contraseña"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-[#d84239] hover:bg-[#b5372e] text-white px-4 py-2 rounded-lg mt-4 font-semibold transition-all disabled:opacity-70"
                    >
                        {loading ? "Creando..." : "Crear colaborador"}
                    </button>
                </form>

                {message && <p className="text-green-600 mt-4 font-medium">{message}</p>}
                {error && <p className="text-red-600 mt-4 font-medium">{error}</p>}
            </div>
        </div>
    )
}