import { useAuth } from "@/contexts/AuthContext";
import { Download } from "lucide-react";

const participantes = [
    {
        id: "01",
        nombre: "Andrés García",
        carrera: "Sistemas",
        edad: 20,
        modulo: "Actividad Física",
        reto: "Abdominales",
    },
    {
        id: "02",
        nombre: "Laura Pérez",
        carrera: "Civil",
        edad: 21,
        modulo: "Actividad Física",
        reto: "Abdominales",
    },
    {
        id: "03",
        nombre: "Carlos Ruiz",
        carrera: "Ambiental",
        edad: 22,
        modulo: "Actividad Física",
        reto: "Abdominales",
    },
    {
        id: "04",
        nombre: "Sofía Torres",
        carrera: "Eléctrica",
        edad: 23,
        modulo: "Actividad Física",
        reto: "Abdominales",
    },
    {
        id: "05",
        nombre: "Miguel Rojas",
        carrera: "Industrial",
        edad: 24,
        modulo: "Actividad Física",
        reto: "Abdominales",
    },
];

const carreraColors: Record<string, string> = {
    Sistemas: "bg-green-100 text-green-700 border-green-400",
    Civil: "bg-red-100 text-red-700 border-red-400",
    Ambiental: "bg-lime-100 text-lime-700 border-lime-400",
    Eléctrica: "bg-purple-100 text-purple-700 border-purple-400",
    Industrial: "bg-orange-100 text-orange-700 border-orange-400",
};

export const DashboardAdmin = () => {
    const { logout } = useAuth();

    return (
        <div className="min-h-screen w-full bg-[#fceceb] p-0">
            {/* Header */}
            <div className="flex items-center justify-between px-8 py-6 bg-white border-b border-gray-200">
                <h1 className="text-2xl font-bold text-black">Administrador</h1>
                <div className="flex items-center gap-4">
                    <input
                        type="text"
                        placeholder="Buscar aquí..."
                        className="px-5 py-2 rounded-full border border-gray-300 bg-white text-gray-700 focus:outline-none w-64"
                    />
                    <button
                        onClick={logout}
                        className="bg-[#d84239] hover:bg-[#b83227] text-white font-bold py-2 px-4 rounded-lg transition-colors"
                    >
                        Cerrar Sesión
                    </button>
                </div>
            </div>

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
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b">
                                <th className="py-2 px-2 font-semibold text-gray-700">Id</th>
                                <th className="py-2 px-2 font-semibold text-gray-700">Nombre</th>
                                <th className="py-2 px-2 font-semibold text-gray-700">Carrera</th>
                                <th className="py-2 px-2 font-semibold text-gray-700">Edad</th>
                                <th className="py-2 px-2 font-semibold text-gray-700">Módulo</th>
                                <th className="py-2 px-2 font-semibold text-gray-700">Reto</th>
                            </tr>
                        </thead>
                        <tbody>
                            {participantes.map((p) => (
                                <tr key={p.id} className="border-b last:border-b-0">
                                    <td className="py-2 px-2">{p.id}</td>
                                    <td className="py-2 px-2">{p.nombre}</td>
                                    <td className="py-2 px-2">
                                        <span className={`px-3 py-1 rounded-xl border text-sm font-semibold ${carreraColors[p.carrera] || "bg-gray-100 text-gray-700 border-gray-300"}`}>
                                            {p.carrera}
                                        </span>
                                    </td>
                                    <td className="py-2 px-2">{p.edad}</td>
                                    <td className="py-2 px-2">{p.modulo}</td>
                                    <td className="py-2 px-2">{p.reto}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};