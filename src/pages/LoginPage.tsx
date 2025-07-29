import "../styles/login.css";
import LoginForm from "../components/LoginForm.tsx";
import logoBlanco from "../assets/logo/logo.png";

export const Login = () => {
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
                    <LoginForm />
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
