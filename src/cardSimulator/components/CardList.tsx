import { useState } from "react";
import styles from "./../assets/styles/cardSimulator.module.scss";
import type { CardCode } from "./../CardSimulator.type";
import CardLayer from "./CardLayer";

const images = import.meta.glob("./../assets/charaCard/*.png", {
    eager: true,
    as: "url",
});

type CardProps = {
    key: number;
    code: CardCode;
    openLayer: () => void;
};

let CachedCharaData = null;

function Card({ code, openLayer }: CardProps) {
    const linkUrl: string = "https://uma.inven.co.kr/";
    return (
        <>
            <div className={styles.card}>
                <button className={styles.cardSlot} onClick={openLayer}>
                    {code !== false ? (
                        <img
                            src={
                                images[
                                    `./../assets/charaCard/scardicon_${code}.png`
                                ]
                            }
                            // title={}
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
            </div>
        </>
    );
}

type cardListProps = {
    cards: CardCode[];
};

// 카드 리스트 (n개)
// TODO: 슬롯 개수 셀렉트 받아서, 해당 값대로 Card 컴포넌트 렌더링하도록 변경 예정
function CardList({ cards }: cardListProps) {
    const [layerIsOpen, setLayerIsOpen] = useState<boolean>(false);
    const [selectedSlot, setSelectedSlot] = useState<number | null>(null);

    function openLayer(index: number) {
        setSelectedSlot(index);
        setLayerIsOpen(true);
    }
    function closeLayer() {
        setSelectedSlot(null);
        setLayerIsOpen(false);
    }

    return (
        <>
            <h3 className="sr-only">카드 리스트</h3>
            <div className={styles.cardList}>
                {cards.map((card, index) => (
                    <Card
                        key={index}
                        code={card}
                        openLayer={() => openLayer(index)}
                    />
                ))}
            </div>
            {layerIsOpen ? (
                <CardLayer
                    key={selectedSlot}
                    isOpen={layerIsOpen}
                    closeLayer={closeLayer}
                />
            ) : (
                <></>
            )}
        </>
    );
}

export default CardList;
