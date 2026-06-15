import { useState } from "react";
import styles from "../assets/styles/cardSimulator.module.scss";

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

function CharaList() {
    // 캐릭터 리스트
    return (
        <ul>
            <li>
                <button></button>
            </li>
        </ul>
    );
}

type CardLayerProps = {
    isOpen: boolean;
    closeLayer: () => void;
};
function CardLayer({ isOpen, closeLayer }: CardLayerProps) {
    /**
     * 검색창
     * 타입선택창
     * 캐릭터리스트
     */

    const [selectedType, setSelectedType] = useState<number>(0);
    return (
        <div className={styles.layer}>
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
                <CharaList />
            </div>
        </div>
    );
}

export default CardLayer;
