import { HardHat } from "lucide-react";
import type { ReactNode } from "react";

interface NotAvailableProps {
    title?: string;
    message?: string;
    children?: ReactNode;
}

export function NotAvailable({
    title = "Página en Construcción",
    message = "Esta sección aún no está disponible. Estamos trabajando para traerla lo antes posible.",
    children,
}: Readonly<NotAvailableProps>) {
    return (
        <div className="flex h-full w-full flex-col items-center justify-center gap-6 rounded-lg p-8 text-center">
            <HardHat className="text-yellow-500" size={64} strokeWidth={1.5} />

            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold text-white">{title}</h1>
                <p className="max-w-md text-lg text-gray-400">{message}</p>
            </div>

            {children && <div className="mt-4">{children}</div>}
        </div>
    );
}
