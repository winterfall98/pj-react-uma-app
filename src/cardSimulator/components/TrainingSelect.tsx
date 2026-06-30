import { TRAINING_LIST } from "../constants";
import styles from "./../assets/styles/cardSimulator.module.scss";

type SelectProps = {
    selectedTraining: string;
    setSelectedTraining: (v:string) => void;
}

function Select({selectedTraining, setSelectedTraining}: SelectProps) {
    return (
        <div className={styles.trainingSelect}>
            <select

                value={selectedTraining}
                onChange={(e) => setSelectedTraining(e.target.value)}
            >

            {TRAINING_LIST.map((item) => (
                <option key={item.type} value={item.type}>{item.name}</option>
            ))}
            </select>
        </div>
    )
}

export default Select;