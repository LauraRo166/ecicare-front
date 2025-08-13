import type { ReactNode } from "react";
interface ModalProps {
    open: boolean;
    onClose: () => void;
    children: ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ open, onClose, children }) => {
    if (!open) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent backdrop-blur-sm">
            <div className="bg-white rounded-xl p-6 min-w-[320px] shadow-lg relative">
                <button
                    className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                    onClick={onClose}
                    aria-label="Cerrar modal"
                >
                    ×
                </button>
                {children}
            </div>
        </div>
    );
};