import { ParticipantRow } from "./ParticipantRow"

interface Participant {
    id: string
    name: string
    career: string
    age: number
    module: string
    challenge: string
}

export const ParticipantsTable = ({ data }: { data: Participant[] }) => {
    return (
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
            {data.map((p) => (
                <ParticipantRow key={p.id} participant={p} />
            ))}
            </tbody>
        </table>
    )
}
