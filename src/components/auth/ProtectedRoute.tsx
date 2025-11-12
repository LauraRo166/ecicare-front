import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import type { JSX } from "react";

interface ProtectedRouteProps {
    children: JSX.Element;
    allowedRoles?: string[];
}

export const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
    const { isAuthenticated, role } = useAuth();

    // Si no está autenticado, redirige al login
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // Si hay restricción de rol y el rol no coincide
    if (allowedRoles && (!role || !allowedRoles.includes(role))) {
        return <Navigate to="/unauthorized" replace />;
    }

    // Si pasa todas las condiciones, muestra la página
    return children;
};