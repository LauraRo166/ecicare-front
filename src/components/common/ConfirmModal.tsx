import React from "react";
import { Modal } from "./Modal";

interface ConfirmModalProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    message: string;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({ open, onClose, onConfirm, message }) => (
    <Modal open={open} onClose={onClose}>
        <div className="mb-4">{message}</div>
        <div className="flex gap-2 justify-end">
            <button className="px-3 py-1 rounded bg-gray-200" onClick={onClose}>Cancelar</button>
            <button className="px-3 py-1 rounded bg-[#d84239] text-white" onClick={onConfirm}>Eliminar</button>
        </div>
    </Modal>
);