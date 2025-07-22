import { createContext, useState, useContext, type ReactNode } from "react";
import type { User } from "../types/user";

interface AuthContextType {
    isAuthenticated: boolean;
    role: string | null;
    login: (user: User, token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [role, setRole] = useState<string | null>(null);

    const login = (user: User, token: string) => {
        localStorage.setItem("token", token);
        setIsAuthenticated(true);
        setRole(user.role);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        setRole(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, role, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth debe ser usado dentro de un AuthProvider");
    }
    return context;
};
