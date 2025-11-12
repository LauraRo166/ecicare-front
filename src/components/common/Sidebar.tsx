import { NavLink } from "react-router-dom";
import logoBottom from "@/assets/logo/logo2.png";
import logoTop from "@/assets/logo/ecicare.png";
import { useAuth } from "@/contexts/AuthContext";
import {
    ChartSpline,
    LogOut,
    Users,
    Trophy,
    UserPlus,
} from "lucide-react";

const mainNavItems = [
    {
        name: "Módulos",
        href: "/modulos",
        icon: <ChartSpline size={25} />,
        allowedRoles: ["ADMINISTRATION", "COLLABORATOR"],
    },
    {
        name: "Premios",
        href: "/premios",
        icon: <Trophy size={25} />,
        allowedRoles: ["ADMINISTRATION"],
    },
    {
        name: "Estudiantes",
        href: "/estudiantes",
        icon: <Users size={25} />,
        allowedRoles: ["ADMINISTRATION", "COLLABORATOR"],
    },
    {
        name: "Colaboradores",
        href: "/colaboradores",
        icon: <UserPlus size={25} />,
        allowedRoles: ["ADMINISTRATION"],
    },
    { name: "Cerrar Sesión", href: "/login", icon: <LogOut size={25} /> },
];


export function Sidebar() {
    const { role, logout } = useAuth();

    const filteredMainNavItems = mainNavItems.filter(
        (item) =>
            !item.allowedRoles ||
            (role && item.allowedRoles.includes(role))
    );

    return (
        <aside className="flex h-screen w-80 flex-col bg-white px-5 py-8 justify-between border-r border-gray-200">
            {/* Logo superior */}
            <div className="mb-10 flex items-center justify-center">
                <img
                    src={logoTop}
                    alt="Logo de EciCare"
                    className="h-20 w-auto"
                />
            </div>

            {/* Navegación principal */}
            <nav className="flex-1">
                <ul className="flex flex-col gap-y-8">
                    {filteredMainNavItems.map((item) => (
                        <li key={item.name}>
                            {item.name === "Cerrar Sesión" ? (
                                <button
                                    onClick={logout}
                                    className="flex items-center gap-x-4 rounded-2xl px-2 py-2 text-[#333] font-semibold text-[1.1rem] hover:bg-[#f5f5f5] transition-all w-full"
                                >
                                    {item.icon}
                                    <span>{item.name}</span>
                                </button>
                            ) : (
                                <NavLink
                                    to={item.href}
                                    className={({ isActive }) =>
                                        isActive
                                            ? "flex items-center gap-x-4 rounded-2xl px-2 py-2 bg-[#d84239] text-white font-semibold text-[1.1rem] shadow transition-all"
                                            : "flex items-center gap-x-4 rounded-2xl px-2 py-2 text-[#333] font-semibold text-[1.1rem] hover:bg-[#f5f5f5] transition-all"
                                    }
                                >
                                    {item.icon}
                                    <span>{item.name}</span>
                                </NavLink>
                            )}
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Logo inferior */}
            <div className="flex items-center justify-center mt-10">
                <img
                    src={logoBottom}
                    alt="Logo inferior"
                    className="h-40 w-auto"
                />
            </div>
        </aside>
    );
}