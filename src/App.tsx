import { useState } from 'react';
import Modal from './modal/Modal';
import type { ModalProps } from './modal/Modal.types';
import './App.css'

function App() {
  const [modal, setModal] = useState<ModalProps | null>(null);

  function handleModal() {
    setModal({
      type: "alert",
      message: "Hello, World!",
      okWord: "OK",
      variant: "default",
      onConfirm: () => {setModal(null)},
    });
  }

  return (
    <div className="App" style={{height: "200vh", background:"#eee"}}>
      <button onClick={handleModal}>Show Modal</button>
      {modal && <Modal {...modal} />}
    </div>
  )
}

export default App
