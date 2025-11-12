import { Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { Login } from "@/pages/LoginPage";
import { DashboardLayout } from "@/components/dashboards/DashboardLayout";
import { StudentsPage } from "@/pages/StudentsPage";
import { CollaboratorsPage } from "@/pages/CollaboratorsPage";
import { ModulesPage } from "@/pages/ModulesPage";
import { AwardsPage } from "@/pages/AwardsPage"
import { UnauthorizedPage } from "@/pages/UnauthorizedPage.tsx";

export const AppRoutes = () => (
    <Routes>
        {/* Redirecciones */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/login" />} />

        {/* Login */}
        <Route path="/login" element={<Login />} />

        {/* Página de acceso denegado */}
        <Route path="/unauthorized" element={<UnauthorizedPage/>} />

        {/* Rutas protegidas */}
        <Route element={<DashboardLayout />}>
            <Route
                path="/estudiantes"
                element={
                    <ProtectedRoute allowedRoles={["ADMINISTRATION", "COLLABORATOR"]}>
                        <StudentsPage />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/modulos"
                element={
                    <ProtectedRoute allowedRoles={["ADMINISTRATION", "COLLABORATOR"]}>
                        <ModulesPage />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/premios"
                element={
                    <ProtectedRoute allowedRoles={["ADMINISTRATION"]}>
                        <AwardsPage />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/colaboradores"
                element={
                    <ProtectedRoute allowedRoles={["ADMINISTRATION"]}>
                        <CollaboratorsPage />
                    </ProtectedRoute>
                }
            />
        </Route>
    </Routes>
);