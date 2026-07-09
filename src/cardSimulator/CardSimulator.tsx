import { useState, useMemo } from "react";
import CardList from "./components/CardList";
import CardListLeft from "./components/CardListLeft";
import ScenarioSelect from "./components/ScenarioSelect.tsx";
import StatTable from "./components/StatTable";
import styles from "./assets/styles/cardSimulator.module.scss";
import type {
    CardCode,
    CardSlot,
} from "./CardSimulator.type";
import { SCENARIO_LIST } from "./constants.ts";
import { getCache, setCache, fetchCardStats } from "./CachedCardStats.ts";

const defaultSlot: CardSlot = {code: 0, stats: {}, limitBreak: 4};

function CardSimulator({ onError }: {onError: (message: string) => void}) {
    const recentScenario = SCENARIO_LIST.at(-1)?.type;
    const [selectedScenario, setSelectedScenario] = useState<number>(Number(recentScenario));

    const [slots, setSlots] = useState<CardSlot[]>([
        {code: 0, stats: {}, limitBreak: 4},
        {code: 0, stats: {}, limitBreak: 4},
        {code: 0, stats: {}, limitBreak: 4},
        {code: 0, stats: {}, limitBreak: 4}
    ]);

    const isUsed = useMemo(
        () => slots.some((item) => item.code !== 0),
        [slots]
    )

    function controlSlotsLength(newLength: number) {
        if (newLength <= 0 || newLength > 9) return false;

        const diff: number = newLength - slots.length;

        if (diff > 0) {
            // 덧붙이기
            const newSlots: CardSlot[] = Array.from({ length: diff }, () => ({
                ...defaultSlot
            }));

            setSlots((prev) => [...prev, ...newSlots]);
        } else {
            // 자르기
            setSlots((prev) => prev.slice(0, newLength));
        }
    }

    async function setSlotsByIndex(index: number, code: CardCode) {
        let newStats = {};
        let data;
        let go = true;
        // 캐시 데이터 체크 후 fetch
        if (code > 0) {
            newStats = getCache(code);
            if(!newStats) {
                try {
                    data = await fetchCardStats(code);
                } catch (error) {
                    if (error instanceof Error) {
                        go = false;
                        onError(`
                            유효하지 않은 응답입니다.<br>
                            해당 파일이 존재하지 않거나 손상되었습니다.<br>
                            다른 항목을 선택해보세요.
                            `);
                    }
                }
            }
        }

        if (go) {
            setCache(code, data);
            newStats = data;

            setSlots((prev) => {
                const newSlots = [...prev];
                newSlots[index] = {...prev[index], code, stats: newStats};
                return newSlots;
            })
        }
    }

    function setSlotsByLimitBreak(number: number, index: number) {
        setSlots((prev) => {
            const newSlots = [...prev];
            newSlots[index] = {...prev[index], limitBreak: number};
            return newSlots;
        })
    }

    return (
        <div id="cardSimulator" className={styles.cardSimulator}>
            <h2>카드 시뮬레이터</h2>
            <div className={styles.cardSimulatorInner}>
                <CardListLeft onClickEvent={controlSlotsLength} col={slots.length} />
                <CardList cards={slots.map(slot => slot.code)} setCardsEvent={setSlotsByIndex} />
            </div>
            <ScenarioSelect selectedScenario={selectedScenario} setSelectedScenario={setSelectedScenario} />
            <StatTable slots={slots} isUsed={isUsed} scenarioNumber={selectedScenario} limitBreakEvent={setSlotsByLimitBreak} />
        </div>
    );
}

export default CardSimulator;
