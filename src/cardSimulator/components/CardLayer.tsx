import { useState, useRef, useEffect } from "react";
import styles from "../assets/styles/cardSimulator.module.scss";
import type { CardListMap } from "./../CardSimulator.type";

import SpeedIcon from "../assets/icon/type/1.svg?react";
import StaminaIcon from "../assets/icon/type/2.svg?react";
import PowerIcon from "../assets/icon/type/3.svg?react";
import GritIcon from "../assets/icon/type/4.svg?react";
import IntIcon from "../assets/icon/type/5.svg?react";
import FriendIcon from "../assets/icon/type/6.svg?react";

function Search() {
    // 검색
    return (
        <input
            className={styles.searchInput}
            type="text"
            placeholder="카드 이름을 입력하세요"
        />
    );
}

type typeListProps = {
    selectedType: number;
    setSelectedType: (n: number) => void;
};

function TypeList({ selectedType, setSelectedType }: typeListProps) {
    const types = [
        { id: 1, label: "스피드", Icon: SpeedIcon },
        { id: 2, label: "스태미나", Icon: StaminaIcon },
        { id: 3, label: "힘", Icon: PowerIcon },
        { id: 4, label: "근성", Icon: GritIcon },
        { id: 5, label: "지식", Icon: IntIcon },
        { id: 6, label: "친구", Icon: FriendIcon },
    ];

    return (
        <ul className={styles.typeList}>
            {types.map(({ id, label, Icon }) => (
                <li key={id}>
                    <button
                        className={`${selectedType === id && styles["on"]}`}
                        onClick={() =>
                            selectedType === id
                                ? setSelectedType(0)
                                : setSelectedType(id)
                        }
                    >
                        <Icon />
                        <span className="sr-only">{label}</span>
                    </button>
                </li>
            ))}
        </ul>
    );
}

type CharaListProps = {
    cardList: CardListMap;
};

// 캐릭터 리스트
function CharaList({ cardList }: CharaListProps) {
    const isEmpty = Object.entries(cardList).length <= 0;
    return (
        <ul className={styles.charaList}>
        {!isEmpty &&
            Object.entries(cardList).map(([code, card]) => (
                <li key={code}>
                    <button>
                        <img src={card.image} alt={card.name} />
                        <span className="sr-only">{card.name}</span>
                    </button>
                </li>
            ))}
        </ul>
    );
}

type CardLayerProps = {
    isOpen: boolean;
    closeLayer: () => void;
    cardList: CardListMap;
};

function CardLayer({ isOpen, closeLayer, cardList }: CardLayerProps) {
    const [selectedType, setSelectedType] = useState<number>(0);
    const layerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (!layerRef.current) return;
            if(layerRef.current && e.target instanceof Node && !layerRef.current.contains(e.target)) {
                closeLayer();
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [closeLayer]);

    return (
        <div className={styles.layer} ref={layerRef}>
            <div className={styles.header}>
                <h4>서포트 카드 리스트</h4>
                <button onClick={closeLayer}>
                    <span className="sr-only">닫기</span>
                </button>
            </div>
            <div className={styles.contents}>
                <Search />
                <TypeList
                    selectedType={selectedType}
                    setSelectedType={setSelectedType}
                />
                <CharaList cardList={cardList} />
            </div>
        </div>
    );
}

export default CardLayer;
