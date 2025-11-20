import apiClient from "../services/axiosService";

export interface LoginResponse {
    token: string;
    type: string;
    id: string;
    name: string;
    email: string;
    role: string;
}

export async function login(
    email: string,
    password: string
): Promise<LoginResponse> {
    if (email === "admin@escuelaing.edu.co" && password === "admin") {
        console.warn("⚠️ Usando credenciales de desarrollo locales.");
        await new Promise((resolve) => setTimeout(resolve, 500));

        return {
            token: "fake-bearer-token-for-local-dev-12345",
            type: "Bearer",
            id: "user-local-123",
            name: "Usuario de Prueba Local",
            email: "admin@escuelaing.edu.co",
            role: "ADMINISTRATION",
        };
    }
    if (email === "colaborador@escuelaing.edu.co" && password === "colaborador") {
        console.warn("⚠️ Usando credenciales de desarrollo locales.");
        await new Promise((resolve) => setTimeout(resolve, 500));

        return {
            token: "fake-bearer-token-for-local-dev-54321",
            type: "Bearer",
            id: "user-local",
            name: "Usuario de prueba",
            email: "colaborador@escuelaing.edu.co",
            role: "COLLABORATOR",
        };
    }
    const API_AUTH_URL = "http://tu-api.com/auth";
    const url = `${API_AUTH_URL}/login`;

    // Ahora, esta llamada es válida y TypeScript sabe que continuará
    const response = await apiClient.post<LoginResponse>(url, {
        email,
        password,
    });

    // Este es el return para la ruta de "producción"
    return response.data;
}
