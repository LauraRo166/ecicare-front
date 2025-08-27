import { AccordionModule } from "@/components/AccordionModule";
import { Challenge } from "@/components/Challenge";

export const DashboardModules = () => {
    return (
        <div className="min-h-screen w-full bg-[#fceceb] px-10">
            <AccordionModule title="Bienestar físico y nutricional">
                <Challenge title="Prueba" description="Un reto de ejemplo" prize="Abrazos" />
            </AccordionModule>

            <AccordionModule title="Salud integral">
                <p>Aquí va el contenido del módulo de usuarios</p>
            </AccordionModule>

            <AccordionModule title="Bienestar emocional y descanso">
                <p>Aquí va el contenido del módulo de configuración</p>
            </AccordionModule>
        </div>
    );
};
