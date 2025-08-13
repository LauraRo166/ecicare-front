interface DashboardHeaderProps {
    title: string;
    onLogout: () => void;
    showSearch?: boolean;
}

export const DashboardHeader= ({ title, onLogout, showSearch = true }:
                                                                DashboardHeaderProps) => {
    return (
        <div className="flex items-center justify-between px-8 py-6 bg-white border-b border-gray-200">
            <h1 className="text-2xl font-bold text-black">{title}</h1>
            <div className="flex items-center gap-4">
                {showSearch && (
                    <input
                        type="text"
                        placeholder="Buscar aquí..."
                        className="px-5 py-2 rounded-full border border-gray-300 bg-white text-gray-700 focus:outline-none w-64"
                    />
                )}
                <button
                    onClick={onLogout}
                    className="bg-[#d84239] hover:bg-[#b83227] text-white font-bold py-2 px-4 rounded-lg transition-colors"
                >
                    Cerrar Sesión
                </button>
            </div>
        </div>
    );
};