import CardList from "./components/CardList";
import CardListLeft from "./components/CardListLeft";
import styles from "./assets/styles/cardSimulator.module.scss";


function CardSimulator() {
    return (
        <div id="cardSimulator" className={styles.cardSimulator}>
            <h2>카드 시뮬레이터</h2>
            <div className={styles.cardSimulatorInner}>
                <CardListLeft />
                <CardList />
            </div>
        </div>
    );
}

export default CardSimulator;
