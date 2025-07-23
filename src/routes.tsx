import { Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute.tsx";
import { Login } from "./pages/LoginPage.tsx";
import { DashboardLayout } from "./components/dashboards/DashboardLayout.tsx";
import { MetricsPage } from "./pages/MetricsPage.tsx";
import { ConfigurationPage } from "./pages/ConfigurationPage.tsx";
import { ModulesPage } from "./pages/ModulesPage.tsx";
import { AwardsPage } from "./pages/AwardsPage.tsx";

export const AppRoutes = () => (
    <Routes>
        {/* Redirecciones */}
        <Route path="*" element={<Navigate to="/login" />} />
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Login */}
        <Route path="/login" element={<Login />} />

        {/* Rutas protegidas con layout */}
        <Route element={<DashboardLayout />}>
            <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
                <Route path="/metricas" element={<MetricsPage />} />
                <Route path="/modulos" element={<ModulesPage />} />
                <Route path="/premios" element={<AwardsPage />} />
                <Route path="/configuracion" element={<ConfigurationPage />} />

            </Route>
        </Route>
    </Routes>
);