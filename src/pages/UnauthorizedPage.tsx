export const UnauthorizedPage = () => (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Acceso denegado</h1>
        <p className="text-gray-700 mb-8">
            No tienes permisos para acceder a esta sección.
        </p>
        <a
            href="/login"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
            Volver al inicio de sesión
        </a>
    </div>
);