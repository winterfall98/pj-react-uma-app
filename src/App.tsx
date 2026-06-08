import Modal from "./modal/Modal";
import CardSimulator from "./cardSimulator/CardSimulator";
import useModal from "./modal/useModal";
import type { AlertModalProps, ConfirmModalProps } from "./modal/Modal.types";

function App() {
    const { modal, alert, confirm } = useModal();

    const alertProps: AlertModalProps = {
        message: "Hello, World!",
        okWord: "OK",
        variant: "default",
        onConfirm: () => {
            console.log("Alert confirmed!");
        },
    };

    const confirmProps: ConfirmModalProps = {
        message: "Hello, confirm!",
        okWord: "OK",
        cancelWord: "Cancel",
        variant: "default",
        onConfirm: () => {
            console.log("Confirm confirmed!");
        },
        onCancel: () => {
            console.log("Confirm cancelled!");
        },
    };

    return (
        <div className="App">
            <CardSimulator />


            <br /><br /><br /><br />
            <hr />
            <button onClick={() => alert(alertProps)}>Show alert Modal</button>
            <button onClick={() => confirm(confirmProps)}>
                Show confirm Modal
            </button>

            {modal && <Modal {...modal} />}
        </div>
    );
}

export default App;
