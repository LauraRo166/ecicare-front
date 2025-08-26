interface Participant {
    id: string
    name: string
    career: string
    age: number
    module: string
    challenge: string
}

const carreraColors: Record<string, string> = {
    Sistemas: "bg-green-100 text-green-700 border-green-400",
    Civil: "bg-red-100 text-red-700 border-red-400",
    Ambiental: "bg-lime-100 text-lime-700 border-lime-400",
    Electrica: "bg-purple-100 text-purple-700 border-purple-400",
    Industrial: "bg-orange-100 text-orange-700 border-orange-400",
}

export const ParticipantRow = ({ participant }: { participant: Participant }) => {
    return (
        <tr className="border-b last:border-b-0">
            <td className="py-2 px-2">{participant.id}</td>
            <td className="py-2 px-2">{participant.name}</td>
            <td className="py-2 px-2">
        <span
            className={`px-3 py-1 rounded-xl border text-sm font-semibold ${
                carreraColors[participant.career] ||
                "bg-gray-100 text-gray-700 border-gray-300"
            }`}
        >
          {participant.career}
        </span>
            </td>
            <td className="py-2 px-2">{participant.age}</td>
            <td className="py-2 px-2">{participant.module}</td>
            <td className="py-2 px-2">{participant.challenge}</td>
        </tr>
    )
}
