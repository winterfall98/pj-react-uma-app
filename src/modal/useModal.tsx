import { useState } from "react";
import type {
    ModalVariant,
    ModalProps,
} from "./Modal.types";
import Modal from "./Modal";

function useModal() {
    const [modal, setModal] = useState<ModalProps | null>(null);

    function alert(
        message: string,
        options?: {
            okWord?: string;
            variant?: ModalVariant;
            onConfirm?: () => void;
        },
    ) {
        setModal({
            type: "alert",
            message,
            okWord: options?.okWord,
            variant: options?.variant,
            onConfirm: () => {
                setModal(null);
                options?.onConfirm?.();
            },
        });
    }


    function confirm(
        message: string,
        options?: {
            okWord?: string;
            cancelWord?: string;
            variant?: ModalVariant;
        },
    ): Promise<boolean> {
        return new Promise((resolve) => {
            setModal({
                type: "confirm",
                message,
                okWord: options?.okWord,
                cancelWord: options?.cancelWord,
                variant: options?.variant,
                onConfirm: () => {
                    setModal(null);
                    resolve(true);
                },
                onCancel: () => {
                    setModal(null);
                    resolve(false);
                },
            });
        });
    }

    const ModalRoot = modal ? <Modal {...modal} /> : null;
    return { alert, confirm, ModalRoot };
}

export default useModal;
