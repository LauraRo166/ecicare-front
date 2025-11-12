import "../styles/login.css";
import LoginForm from "../components/auth/LoginForm.tsx";

export const Login = () => {
    return (
        <div className="flex md:flex-row h-screen w-screen items-center justify-center">
            <LoginForm />
        </div>
    );
};
