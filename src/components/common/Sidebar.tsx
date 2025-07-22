import { NavLink } from "react-router-dom";
import logo from "@/assets/logo/logo.png";
import { useAuth } from "@/contexts/AuthContext";
import {
    OctagonAlert,
    Settings,
    Building,
    Headset,
    UserRoundCog,
    ChartSpline,
    LogOut,
    ChartPie,
    FileChartColumn,
    Newspaper,
} from "lucide-react";

// top itens
const mainNavItems = [
    {
        name: "Dashboard",
        href: "/dashboard",
        icon: <ChartPie size={25} />,
    },
    {
        name: "Ranking",
        href: "/ranking",
        icon: <ChartSpline size={25} />,
        allowedRoles: ["EMPLOYEER"],
    },
    {
        name: "Gestion de Contenido",
        href: "/contenido",
        icon: <Newspaper size={25} />,
        allowedRoles: ["ADMIN"],
    },
    {
        name: "Gestion de Empresas",
        href: "/empresas",
        icon: <Building size={25} />,
        allowedRoles: ["ADMIN"],
    },
    {
        name: "Gestion de Usuarios",
        href: "/usuarios",
        icon: <UserRoundCog size={25} />,
    },
    {
        name: "Alertas",
        href: "/alertas",
        icon: <OctagonAlert size={25} />,
        allowedRoles: ["EMPLOYEER"],
    },
    {
        name: "Reportes",
        href: "/reportes",
        icon: <FileChartColumn size={25} />,
    },
];

// bottom items
const secondaryNavItems = [
    { name: "Soporte", href: "/soporte", icon: <Headset size={25} /> },
    {
        name: "Configuracion",
        href: "/configuracion",
        icon: <Settings size={25} />,
    },
    { name: "Cerrar Sesión", href: "/login", icon: <LogOut size={25} /> },
];

export function Sidebar() {
    const { role, logout } = useAuth();

    const filteredMainNavItems = mainNavItems.filter(
        (item) =>
            !item.allowedRoles ||
            (role !== null && item.allowedRoles.includes(role))
    );

    return (
        <aside className="flex h-screen w-80 flex-col bg-[#0b1b2a] px-5 py-8">
            <div className="mb-10 flex items-center justify-center">
                <img src={logo} alt="Logo de Sara BI" className="h-40 w-auto" />
            </div>

            <nav className="flex-1">
                <ul className="flex flex-col gap-y-3">
                    {filteredMainNavItems.map((item) => (
                        <li key={item.name}>
                            <NavLink
                                to={item.href}
                                className={({ isActive }) =>
                                    `flex w-full items-center gap-x-4 rounded-lg p-4 text-[1rem] font-medium transition-colors
                                    ${
                                        isActive
                                            ? "bg-[#152e46]"
                                            : "text-gray-400 hover:bg-[#182535]"
                                    }`
                                }
                            >
                                {item.icon}
                                <span>{item.name}</span>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="mt-auto">
                <ul className="flex flex-col gap-y-3">
                    {secondaryNavItems.map((item) => (
                        <li key={item.name}>
                            {item.name === "Cerrar Sesión" ? (
                                <button
                                    onClick={logout}
                                    className="flex w-full items-center gap-x-4 rounded-lg p-4 text-lg font-medium text-gray-400 transition-colors hover:bg-[#4B1E1E] hover:text-white"
                                >
                                    {item.icon}
                                    <span>{item.name}</span>
                                </button>
                            ) : (
                                // Si no, renderiza el NavLink normal
                                <NavLink
                                    to={item.href}
                                    className={({ isActive }) =>
                                        `flex w-full items-center gap-x-4 rounded-lg p-4 text-lg font-medium transition-colors
                                        ${
                                            isActive
                                                ? "bg-[#152e46]"
                                                : "text-gray-400 hover:bg-[#182535]"
                                        }`
                                    }
                                >
                                    {item.icon}
                                    <span>{item.name}</span>
                                </NavLink>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    );
}
