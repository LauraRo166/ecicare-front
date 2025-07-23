import { NavLink } from "react-router-dom";
import logoBottom from "@/assets/logo/logo2.jpg";
import logoTop from "@/assets/logo/ecicare.png";
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
        name: "Métricas",
        href: "/metricas",
        icon: <ChartPie size={25} />,
    },
    {
        name: "Módulos",
        href: "/modulos",
        icon: <ChartSpline size={25} />,
        allowedRoles: ["EMPLOYEER"],
    },
    {
        name: "Premios",
        href: "/premios",
        icon: <Newspaper size={25} />,
        allowedRoles: ["ADMIN"],
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
    <aside className="flex h-screen w-80 flex-col bg-white px-5 py-8 justify-between">
        {/* Top logo */}
        <div className="mb-10 flex items-center justify-center">
            <img src={logoTop} alt="Logo de EciCare" className="h-20 w-auto" />
        </div>

        {/* Navigation */}
        <nav className="flex-1">
            <ul className="flex flex-col gap-y-6">
                {filteredMainNavItems.map((item, idx) => (
                    <li key={item.name}>
                        <NavLink
                            to={item.href}
                            className={({ isActive }) =>
                                isActive
                                    ? "flex items-center gap-x-4 rounded-2xl px-6 py-5 bg-[#e74c3c] text-white font-bold text-xl shadow transition-all"
                                    : "flex items-center gap-x-4 rounded-2xl px-6 py-5 text-black font-bold text-xl hover:bg-[#f5f5f5] transition-all"
                            }
                        >
                            {item.icon}
                            <span>{item.name}</span>
                        </NavLink>
                    </li>
                ))}
                {/* Cerrar Sesión */}
                <li>
                    <button
                        onClick={logout}
                        className="flex items-center gap-x-4 rounded-2xl px-6 py-5 text-black font-bold text-xl hover:bg-[#f5f5f5] transition-all w-full"
                    >
                        <LogOut size={32} />
                        <span>Cerrar Sesión</span>
                    </button>
                </li>
            </ul>
        </nav>

        {/* Bottom logo */}
        <div className="flex items-center justify-center mt-10">
            <img src={logoBottom} alt="Logo inferior" className="h-40 w-auto" />
        </div>
    </aside>
);
}