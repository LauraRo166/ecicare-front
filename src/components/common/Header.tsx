import {useAuth} from "@/contexts/AuthContext.tsx";

export const Header = () => {
    const { role } = useAuth();

    const roleLabels: Record<string, string> = {
        ADMINISTRATION: "Administración",
        COLLABORATOR: "Colaborador",
        STUDENT: "Estudiante",
    };

    const readableRole = role ? roleLabels[role] || role : "";

    return (
        <div className="flex items-center justify-between px-8 py-6 bg-white border-b border-gray-200">
            <h1 className="text-2xl font-bold text-black">{readableRole}</h1>
        </div>
    );
};