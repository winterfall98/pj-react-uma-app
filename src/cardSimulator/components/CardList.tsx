import { useState } from "react";
import styles from "./../assets/styles/cardSimulator.module.scss";
import type { CardCode, CardData, CardListMap } from "./../CardSimulator.type";
import CardLayer from "./CardLayer";

// 이미지 처리
const imageModules = import.meta.glob("../assets/charaCard/*.png", {
    as: "url",
});

let cachedCardList: CardListMap = {};

async function loadImages() {
    const entries = Object.entries(imageModules);
    const results = await Promise.all(
        entries.map(async ([Path2D, loader]) => {
            const url = await loader();
            const code = Path2D.match(/(\d+)/)?.[0];
            return [code, url];
        }),
    );
    const imageMap = Object.fromEntries(results);

    return imageMap;
}


async function setCharaDatas() {
    if (Object.keys(cachedCardList).length > 0) return;

    const [images, cardList] = await Promise.all([
        loadImages(),
        fetch("/cardSimulator/cardListData.json")
        .then((res) => res.json() as Promise<CardListMap>),
    ]);

    for (const [code, info] of Object.entries(cardList) as [string, CardData][]) {
        info.image = images[code] ?? null;
    }

    cachedCardList = cardList;
    console.log('cards => ', cachedCardList);
}

type CardProps = {
    key: number;
    code: CardCode;
    openLayer: () => void;
    removeThisCardEvent: () => void;
};

function Card({ code, openLayer, removeThisCardEvent }: CardProps) {
    const linkUrl: string = "https://uma.inven.co.kr/";
    return (
        <>
            <div className={`${styles.card} ${code !== false && styles.on}`}>
                <button className={styles.cardSlot} onClick={(e) => {e.stopPropagation(); openLayer(); }}>
                    {code !== false ? (
                        <img
                            src={cachedCardList[code]['image']}
                            title={cachedCardList[code]['name']}
                        />
                    ) : (
                        <span
                            className={styles.slotPlus}
                            aria-hidden="true"
                        ></span>
                    )}
                    <span className="sr-only">서포트 카드 선택</span>

                    <span className={`${styles.sparkle} ${styles.s1}`}></span>
                    <span className={`${styles.sparkle} ${styles.s2}`}></span>
                    <span className={`${styles.sparkle} ${styles.s3}`}></span>
                </button>
                <a
                    className={code !== false ? styles.on : styles.disabled}
                    href={linkUrl}
                    target="_blank"
                >
                    상세보기
                </a>
                <button
                    className={styles.removeButton}
                    onClick={removeThisCardEvent}
                >
                    <span className="sr-only">카드 제거하기</span>
                </button>
            </div>
        </>
    );
}


type cardListProps = {
    cards: CardCode[];
    setCardsEvent: (index: number, code: CardCode) => void;
};

// 카드 리스트 (n개)
// TODO: 슬롯 개수 셀렉트 받아서, 해당 값대로 Card 컴포넌트 렌더링하도록 변경 예정
function CardList({ cards, setCardsEvent }: cardListProps) {
    const [layerIsOpen, setLayerIsOpen] = useState<boolean>(false);
    const [selectedSlot, setSelectedSlot] = useState<number | null>(null);

    async function openLayer(index: number) {
        await setCharaDatas();
        setSelectedSlot(index);
        setLayerIsOpen(true);
        console.log(selectedSlot, index);
    }
    function closeLayer() {
        setSelectedSlot(null);
        setLayerIsOpen(false);
    }

    function removeThisCardEvent(index: number, code: CardCode) {
        console.log(index);
        setCardsEvent(index, code);
        setSelectedSlot(null);
    }

    // if (layerIsOpen) openLayer(0);

    return (
        <>
            <h3 className="sr-only">카드 리스트</h3>
            <div className={styles.cardList}>
                {cards.map((card, index) => (
                    <Card
                        key={index}
                        code={card}
                        openLayer={() => openLayer(index)}
                        removeThisCardEvent={() => removeThisCardEvent(index, false)}
                    />
                ))}
            </div>
            {layerIsOpen ? (
                <CardLayer
                    key={selectedSlot}
                    isOpen={layerIsOpen}
                    cardList={cachedCardList}
                    closeLayerEvent={closeLayer}
                    setCardsEvent={(code: number) => setCardsEvent(Number(selectedSlot), code)}

                />
            ) : (
                <></>
            )}
        </>
    );
}

export default CardList;
