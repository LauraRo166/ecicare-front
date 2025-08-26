import { Download } from "lucide-react"
import { ParticipantsTable } from "@/components/ParticipantsTable"

const participants = [
    {
        id: "01",
        name: "Andrés García",
        career: "Sistemas",
        age: 20,
        module: "Actividad Física",
        challenge: "Abdominales",
    },
    {
        id: "02",
        name: "Laura Pérez",
        career: "Civil",
        age: 21,
        module: "Actividad Física",
        challenge: "Abdominales",
    },
    {
        id: "03",
        name: "Carlos Ruiz",
        career: "Ambiental",
        age: 22,
        module: "Actividad Física",
        challenge: "Abdominales",
    },
    {
        id: "04",
        name: "Sofía Torres",
        career: "Eléctrica",
        age: 23,
        module: "Actividad Física",
        challenge: "Abdominales",
    },
    {
        id: "05",
        name: "Miguel Rojas",
        career: "Industrial",
        age: 24,
        module: "Actividad Física",
        challenge: "Abdominales",
    },
]

export const DashboardMetrics = () => {
    return (
        <div className="min-h-screen w-full bg-[#fceceb] p-0">
            {/* Tabla de participantes */}
            <div className="flex justify-center mt-4">
                <div className="bg-white rounded-2xl shadow p-6 w-full max-w-4xl border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold text-black">Participantes</h2>
                        <button className="flex items-center gap-2 bg-[#fceceb] text-[#e74c3c] border border-[#e74c3c] px-4 py-2 rounded-lg font-semibold hover:bg-[#e74c3c] hover:text-white transition-colors">
                            <Download size={18} />
                            Exportar
                        </button>
                    </div>

                    <ParticipantsTable data={participants} />
                </div>
            </div>
        </div>
    )
}
