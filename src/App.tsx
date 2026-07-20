import CardSimulator from "./cardSimulator/CardSimulator";
import useModal from "./modal/useModal";

function App() {
    const { alert, confirm, ModalRoot } = useModal();

    return (
        <div className="App">
            <CardSimulator onError={
                (message: string) => alert(message, { okWord: "확인", variant: "warning" })
            }
            onConfirm={
                (message: string) => confirm(message, { okWord: "확인", cancelWord: "취소", variant: "warning"})
            }
            />

            {ModalRoot}
        </div>
    );
}

export default App;
