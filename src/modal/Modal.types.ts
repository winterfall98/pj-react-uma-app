export type ModalType = "alert" | "confirm";

export type ModalVariant = "default" | "warning" | "danger";

export type ModalBaseProps = {
    message: string,
    okWord?: string,
    variant?: ModalVariant,
}

export type AlertModalProps = ModalBaseProps & {
    onConfirm?: () => void,
}

export type ConfirmModalProps = ModalBaseProps & {
    cancelWord?: string,
    onConfirm: () => void,
    onCancel?: () => void,
}

export type ModalProps =
    | ({type: "alert";} & AlertModalProps)
    | ({type: "confirm";} & ConfirmModalProps);