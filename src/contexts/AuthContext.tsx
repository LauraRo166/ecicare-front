import { createContext, useState, useContext, type ReactNode } from "react";
import type { User } from "../types/user";

interface AuthContextType {
    isAuthenticated: boolean;
    role: string | null;
    email: string | null;
    login: (user: User, token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [role, setRole] = useState<string | null>(null);
    const [email, setEmail] = useState<string | null>(null);

    const login = (user: User) => {
        // Guardar en localStorage
        localStorage.setItem("email", user.email);
        localStorage.setItem("role", user.role);
        // Context ok
        // Guardar en react state
        setIsAuthenticated(true);
        setRole(user.role);
        setEmail(user.email);
    };

    const logout = () => {
        localStorage.removeItem("email");
        localStorage.removeItem("role");

        setIsAuthenticated(false);
        setRole(null);
        setEmail(null);
    };

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                role,
                email,
                login,
                logout
            }}
        >
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