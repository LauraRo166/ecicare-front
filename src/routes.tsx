import { Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute.tsx";
import { Login } from "./pages/LoginPage.tsx";
import { DashboardLayout } from "./components/dashboards/DashboardLayout.tsx";
import { DashboardPage } from "./pages/DashboarPage.tsx";
import { ConfigurationPage } from "./pages/ConfigurationPage.tsx";
import { SupportPage } from "./pages/SupportPage.tsx";
import { UserPage } from "./pages/UsersPage.tsx";
import { ReportsPage } from "./pages/ReportsPage.tsx";
import { AlertsPage } from "./pages/AlertPages.tsx";
import { RankingPage } from "./pages/RankingPage.tsx";
import { ContentPage } from "./pages/ContentPage.tsx";
import { CompanyPage } from "./pages/CompanyPage.tsx";

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="*" element={<Navigate to="/login" />} />
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />

            <Route element={<DashboardLayout />}>
                <Route
                    element={
                        <ProtectedRoute allowedRoles={["ADMIN", "EMPLOYEER"]} />
                    }
                >
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/soporte" element={<SupportPage />} />
                    <Route path="/usuarios" element={<UserPage />} />
                    <Route path="/reportes" element={<ReportsPage />} />
                    <Route
                        path="/configuracion"
                        element={<ConfigurationPage />}
                    />
                </Route>
            </Route>

            <Route element={<DashboardLayout />}>
                <Route
                    element={<ProtectedRoute allowedRoles={["EMPLOYEER"]} />}
                >
                    <Route path="/alertas" element={<AlertsPage />} />
                    <Route path="/ranking" element={<RankingPage />} />
                </Route>
            </Route>

            <Route element={<DashboardLayout />}>
                <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
                    <Route path="/contenido" element={<ContentPage />} />
                    <Route path="/empresas" element={<CompanyPage />} />
                </Route>
            </Route>
        </Routes>
    );
};
