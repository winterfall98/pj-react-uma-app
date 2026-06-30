import { useState, useMemo } from "react";
import CardList from "./components/CardList";
import CardListLeft from "./components/CardListLeft";
import ScenarioSelect from "./components/ScenarioSelect.tsx";
import StatTable from "./components/StatTable";
import styles from "./assets/styles/cardSimulator.module.scss";
import type {
    CardCode,
    CardStatData,
} from "./CardSimulator.type";
import { SCENARIO_LIST } from "./constants.ts";
import { getCache, setCache, fetchCardStats } from "./CachedCardStats.ts";


function CardSimulator() {
    const recentScenario = SCENARIO_LIST.at(-1)?.type;
    // TODO 리팩토링 (통합)
    const [columnLength, setColumLength] = useState<(number)>(4);
    const [cards, setCards] = useState<CardCode[]>([0, 0, 0, 0]);
    const [cardStatsArray, setCardStatsArray] = useState<CardStatData[]>([{}, {}, {}, {}]);
    const [limitbreaks, setLimitbreaks] = useState([4, 4, 4, 4]);
    const [selectedScenario, setSelectedScenario] = useState<number>(Number(recentScenario));

    const isUsed = useMemo(
        () => cardStatsArray.some((item) => Object.keys(item).length > 0),
        [cardStatsArray]
    )

    function controllColumnLength(newLength: number) {
        if (newLength <= 0 || newLength > 9) return false;

        const diff: number = newLength - cards.length;

        if (diff > 0) {
            // 덧붙이기
            const cPadding: number[] = new Array(diff).fill(0);
            AddCardsCol(cPadding);

            const dPadding: CardStatData[] = new Array(diff).fill({} as CardStatData);
            AddcardStatsCol(dPadding);
        } else {
            // 자르기
            cutCardsCol(diff);
            cutCardStatsCol(diff);
        }

        setColumLength(newLength);
    }

    function AddCardsCol(padding: CardCode[]) {
        setCards([...cards, ...padding]);
    }

    function AddcardStatsCol(padding: CardStatData[]) {
        setCardStatsArray([...cardStatsArray, ...padding]);
    }

    function cutCardsCol(diff: number) {
        setCards([...cards].slice(0, diff));
    }

    function cutCardStatsCol(diff: number) {
        setCardStatsArray([...cardStatsArray].slice(0, diff));
    }

    function setCardsByIndex(index: number, code: CardCode) {
        const newCards = [...cards];
        newCards[index] = code;
        setCards(newCards);
    }

    async function setCardStatArrayByIndex(index: number, code: number) {
        let newData = {};

        // 캐시 데이터 체크 후 fetch
        if (code > 0) {
            newData = getCache(code);
            if(!newData) {
                const data = await fetchCardStats(code);
                setCache(code, data);
                newData = data;
            }
        }

        setCardStatsArray((prev) => {
            const newCardStatsArray = [...prev];
            newCardStatsArray[index] = newData;
            return newCardStatsArray;
        });
    }

    return (
        <div id="cardSimulator" className={styles.cardSimulator}>
            <h2>카드 시뮬레이터</h2>
            <div className={styles.cardSimulatorInner}>
                <CardListLeft onClickEvent={controllColumnLength} col={columnLength} />
                <CardList cards={cards}  setCardsEvent={setCardsByIndex} setCardStatsEvent={setCardStatArrayByIndex} />
            </div>
            <ScenarioSelect selectedScenario={selectedScenario} setSelectedScenario={setSelectedScenario} />
            <StatTable stats={cardStatsArray} isUsed={isUsed} scenarioNumber={selectedScenario}  />
        </div>
    );
}

export default CardSimulator;
