
import { useState } from 'react';
import type { ModalProps, AlertModalProps, ConfirmModalProps } from './Modal.types';

function useModal() {
    const [modal, setModal] = useState<ModalProps | null>(null);
    
    function alert({onConfirm, ...rest}: AlertModalProps) {
        setModal({
            type: 'alert',
            ...rest,
            onConfirm: () => {
                setModal(null);
                onConfirm?.();
            },
        });
    }

    function confirm({ onConfirm, onCancel, ...rest}: ConfirmModalProps) {
        setModal({
            type: 'confirm',
            ...rest,
            onConfirm: () => {
                setModal(null);
                onConfirm?.();
            },
            onCancel: () => {
                setModal(null);
                onCancel?.();
            },
        });
    }

    return {modal, alert, confirm};
}

export default useModal;