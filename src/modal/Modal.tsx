import { useRef, useEffect } from "react";
import type {
    ConfirmModalProps,
    AlertModalProps,
    ModalProps,
} from "./Modal.types";
import styles from "./modal.module.scss";

function preventDefault(event: Event) {
    event.preventDefault();
}

function preventDefaultKeydown(event: KeyboardEvent) {
    if (
        event.type === "keydown" &&
        (event.key === "ArrowUp" || event.key === "ArrowDown")
    ) {
        event.preventDefault();
    }
}

function AlertModal({
    message,
    okWord = "확인",
    variant,
    onConfirm: onOk,
}: AlertModalProps) {
    const okButtonRef = useRef<HTMLButtonElement>(null);
    useEffect(() => {
        okButtonRef.current?.focus();
    }, []);

    return (
        <div className={styles.modal}>
            <div className={styles.customModalText}>
                <p dangerouslySetInnerHTML={{ __html: message }} />
            </div>
            <div
                className={`${styles.customModalButton} ${styles[variant || "default"]}`}
            >
                <button ref={okButtonRef} onClick={onOk}>
                    {okWord}
                </button>
            </div>
        </div>
    );
}

function ConfirmModal({
    message,
    okWord = "확인",
    cancelWord = "취소",
    variant,
    onConfirm,
    onCancel
}: ConfirmModalProps) {
    const okButtonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        okButtonRef.current?.focus();
    }, []);

    return (
        <div className={styles.modal}>
            <div className={styles.customModalText}>
                <p dangerouslySetInnerHTML={{ __html: message }} />
            </div>
            <div
                className={`${styles.customModalButton} ${styles[variant || "default"]}`}
            >
                <button ref={okButtonRef} onClick={onConfirm}>
                    {okWord}
                </button>
                <button className={`${styles.cancel} ${styles[variant || "default"]}`} onClick={onCancel}>
                    {cancelWord}
                </button>
            </div>
        </div>
    );
}

function Modal(props: ModalProps) {
    
    useEffect(() => {  // 모달 열려있는 동안 스크롤 제어
        window.addEventListener("wheel", preventDefault, { passive: false });
        window.addEventListener("touchmove", preventDefault, {passive: false,});
        window.addEventListener("keydown", preventDefaultKeydown);

        return () => {  // 모달 닫히면 스크롤 제어 해제
            window.removeEventListener("wheel", preventDefault);
            window.removeEventListener("touchmove", preventDefault);
            window.removeEventListener("keydown", preventDefaultKeydown);
        };
    }, []);


    return (
        <div className={styles.modalWrapper}>
            {props.type === "alert" ? (
                <AlertModal {...props} />
            ) : (
                <ConfirmModal {...props} />
            )}
        </div>
    );
}

export default Modal;
