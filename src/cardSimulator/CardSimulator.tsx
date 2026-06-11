import { useState } from "react";
import CardList from "./components/CardList";
import CardListLeft from "./components/CardListLeft";
import styles from "./assets/styles/cardSimulator.module.scss";
import type {
    CardCode,
    CardDetail
} from "./CardSimulator.type";


function CardSimulator() {
    const [columnLength, setColumLength] = useState<(number)>(4);
    const [cards, setCards] = useState<CardCode[]>([false, false, false, false]);
    const [cardDetails, setCardDetails] = useState<CardDetail[]>([false, false, false, false])

    function controllColumnLength(newLength: number) {
        if (newLength <= 0 || newLength > 9) return false;

        const diff: number = newLength - cards.length;

        if (diff > 0) {
            // 덧붙이기
            const padding: false[] = new Array(diff).fill(false);
            AddCardsCol(padding);
            AddCardDetailsCol(padding);
        } else {
            // 자르기
            cutCardsCol(diff);
            cutDetailsCol(diff);
        }

        setColumLength(newLength);
    }

    function AddCardsCol(padding: false[]) {
        setCards([...cards, ...padding]);
    }

    function AddCardDetailsCol(padding: false[]) {
        setCardDetails([...cardDetails, padding]);
    }

    function cutCardsCol(diff: number) {
        setCards([...cards].slice(0, diff));
    }

    function cutDetailsCol(diff: number) {
        setCardDetails([...cardDetails].slice(0, diff));
    }

    return (
        <div id="cardSimulator" className={styles.cardSimulator}>
            <h2>카드 시뮬레이터</h2>
            <div className={styles.cardSimulatorInner}>
                <CardListLeft onClickEvent={controllColumnLength} col={columnLength} />
                <CardList cards={cards} />
            </div>
        </div>
    );
}

export default CardSimulator;
