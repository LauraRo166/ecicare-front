import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo/logo2.png";
import { useAuth } from "../../contexts/AuthContext.tsx";
import type { LoginResponse } from "../../types/loginResponse.ts";
import type { User } from "../../types/user.ts";
import logoBlanco from "../../assets/logo/logo.png";

const Login: React.FC = () => {
    const [username, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        // --- LÓGICA DE SIMULACIÓN PARA DESARROLLO LOCAL ---
        await new Promise((resolve) => setTimeout(resolve, 800));

        if (username === "local2@test.co" && password === "local2") {
            console.warn(
                "⚠️ Login exitoso con credenciales de desarrollo locales."
            );

            // 1. Simula la respuesta que recibirías de la API
            const fakeResponseData: LoginResponse = {
                token: "fake-jwt-token-for-local-development",
                refreshToken: "fake-refresh-token",
                id: "user-local-123",
                email: "local@test.com",
                name: "Usuario de Prueba",
                role: "ADMIN",
            };

            // 2. Procesa la respuesta falsa como si fuera real
            const { token, id, email, name, role } = fakeResponseData;
            const user: User = {
                id,
                email,
                name,
                role,
            };

            // 3. Llama a tu contexto de autenticación y redirige
            login(user, token);
            navigate("/estudiantes");
        } else {
            setError(
                "Credenciales incorrectas. Intenta con las credenciales locales."
            );
        }
        // Credenciales falsas para la prueba
        if (username === "local@test.co" && password === "local") {
            console.warn(
                "⚠️ Login exitoso con credenciales de desarrollo locales."
            );

            // 1. Simula la respuesta que recibirías de la API
            const fakeResponseData: LoginResponse = {
                token: "fake-jwt-token-for-local-development",
                refreshToken: "fake-refresh-token",
                id: "user-local-123",
                email: "local@test.com",
                name: "Usuario de Prueba",
                role: "ADMIN",
            };

            // 2. Procesa la respuesta falsa como si fuera real
            const { token, id, email, name, role } = fakeResponseData;
            const user: User = {
                id,
                email,
                name,
                role,
            };

            // 3. Llama a tu contexto de autenticación y redirige
            login(user, token);
            navigate("/estudiantes");
        } else {
            setError(
                "Credenciales incorrectas. Intenta con las credenciales locales."
            );
        }

        setIsLoading(false);

        // --- LÓGICA ORIGINAL (COMENTADA PARA TU IMPLEMENTACIÓN POSTERIOR) ---
        /*
    try {
      const response = await apiClient.post<LoginResponse>("/auth/login", {
        username,
        password,
      });

      console.log("Login exitoso:", response.data);

      const { token, refreshToken, id, email, fullName, role, specialty } =
        response.data;
      const user: User = {
        id,
        email,
        fullName,
        role
      };

      login(user, token);
      navigate("/home");
    } catch (err: any) {
      console.error("Error en login:", err);

      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else if (err.message) {
        setError(err.message);
      } else {
        setError(
          "Credenciales incorrectas o error en el servidor. Inténtalo de nuevo."
        );
      }
    } finally {
      setIsLoading(false);
    }
    */
    };

    return (
        <div className="flex flex-row h-screen w-screen">
            <div className="w-1/3 bg-[#C21313] flex flex-col items-start justify-center p-10 text-white">
                <img
                    src={logoBlanco}
                    alt="LogoBlanco"
                    className="w-[100%] h-auto"
                />
                <h1 className="text-[70px] font-bold mt-16">ECICARE</h1>
                <p className="text-[30px] mb-8">Escuela Colombiana de Ingeniería</p>
            </div>

            <div className="w-2/3 flex flex-col justify-center">
                <div className="flex-grow flex items-center justify-center">
                    <div className="login-card">
                        <div className="text-center mb-6">
                            <img
                                src={logo}
                                alt="Logo"
                                className="block mx-auto w-auto h-[10rem]"
                            />
                            <h2 className="text-[20px] font-bold mt-4">Inicio de Sesión</h2>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-1 p-2">
                                <label
                                    htmlFor="email"
                                    className="block mb-1 text-[#1E1E1E] font-bold text-[15px]"
                                >
                                    Correo
                                </label>
                                <input
                                    className="w-full p-3 border border-[#bdc3c7] text-base text-[#1E1E1E] rounded-lg"
                                    type="email"
                                    id="email"
                                    value={username}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="usuario@mail.escuelaing.edu.co"
                                    required
                                />
                            </div>

                            <div className="mb-8 p-2">
                                {" "}
                                <label
                                    htmlFor="password"
                                    className="block mb-1 text-[#1E1E1E] font-bold text-[15px]"
                                >
                                    Contraseña
                                </label>
                                <input
                                    className="w-full p-3 border border-[#bdc3c7] rounded-lg text-base text-[#1E1E1E]"
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="********"
                                    required
                                />
                            </div>

                            {error && (
                                <p className="mb-4 text-center text-red-200 text-sm">
                                    {error}
                                </p>
                            )}

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="bg-[#0A47AA] text-lg text-white w-full p-3 rounded-lg font-medium hover:bg-opacity-90 transition"
                            >
                                {isLoading ? "Cargando..." : "Iniciar Sesión"}
                            </button>

                            <div className="mt-6 text-center">
                                <Link
                                    to="/forgot-password"
                                    className=" text-xs sm:text-base text-[#0A47AA]"
                                >
                                    ¿Olvidaste tu contraseña?
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="bg-[#ADADAD] text-[#1E1E1E] text-center py-4 px-6 text-sm">
                    <p className="font-semibold">
                        ESCUELA COLOMBIANA DE INGENIERÍA JULIO GARAVITO
                    </p>
                    <p>Contáctenos Ext 611 - serviciosti@escuelaing.edu.co</p>
                </div>
            </div>
        </div>
    );
};

export default Login;