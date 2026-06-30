import { SCENARIO_LIST } from "../constants";
import styles from "./../assets/styles/cardSimulator.module.scss";

type SelectProps = {
    selectedScenario: number;
    setSelectedScenario: (v:number) => void;
}

function Select({selectedScenario, setSelectedScenario}: SelectProps) {
    return (
        <div className={styles.trainingSelect}>
            <select

                value={selectedScenario}
                onChange={(e) => setSelectedScenario(Number(e.target.value))}
            >

            {SCENARIO_LIST.map((item) => (
                <option key={item.type} value={item.type}>{item.name}</option>
            ))}
            </select>
        </div>
    )
}

export default Select;