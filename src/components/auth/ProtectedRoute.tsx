import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext.tsx";

interface ProtectedRouteProps {
    allowedRoles: string[];
}

export const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
    const { isAuthenticated, role } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    const isAllowed = role ? allowedRoles.includes(role) : false;

    return isAllowed ? <Outlet /> : <Navigate to="/Login" replace />;
};
