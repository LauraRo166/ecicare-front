import CardAction from "@/components/CardAction";
import CardInfo from "@/components/CardInfo";
import { useAuth } from "@/contexts/AuthContext";
import companyLogo from "@/assets/logo/logo.png";

export const DashboardAdmin = () => {
    const { logout } = useAuth();

    return (
        <div className="min-h-screen w-full  text-white p-4 sm:p-6 lg:p-8">
            <div className="w-full flex justify-end mb-4">
                <button
                    onClick={logout}
                    className="bg-red-600/80 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                >
                    Cerrar Sesión
                </button>
            </div>

            <div className="w-full text-center sm:text-left mb-10">
                <h1 className="text-3xl md:text-4xl font-bold text-slate-100">
                    Hola, <span className="text-sky-400">{"Usuario"}</span>
                </h1>
                <p className="text-lg text-slate-400 mt-2">
                    ¿Qué quieres hacer hoy?
                </p>
            </div>

            <div className="mb-12">
                <h2 className="text-2xl font-semibold text-slate-200 mb-4">
                    De un vistazo
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <CardInfo title="Empresas Registradas" value={15} />
                    <CardInfo title="Usuarios Activos" value={48} />
                    <CardInfo title="Reportes Generados" value={9} />
                </div>
            </div>

            <div>
                <h2 className="text-2xl font-semibold text-slate-200 mb-4">
                    Acciones Principales
                </h2>
                <div className="items-center justify-center flex grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    <CardAction
                        title="Gestionar Empresas"
                        logo={companyLogo}
                        to="/companies"
                    />
                    <CardAction
                        title="Gestionar Usuarios"
                        logo={companyLogo}
                        to="/users"
                    />
                    <CardAction
                        title="Estadísticas Detalladas"
                        logo={companyLogo}
                        to="/statistics"
                    />
                </div>
            </div>
        </div>
    );
};
