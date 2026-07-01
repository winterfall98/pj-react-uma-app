import { useState, useRef, useEffect } from "react";
import styles from "../assets/styles/cardSimulator.module.scss";
import type { CardListMap } from "./../CardSimulator.type";
import { MOBILE_BREAK } from "../constants";

import SpeedIcon from "../assets/icon/type/1.svg?react";
import StaminaIcon from "../assets/icon/type/2.svg?react";
import PowerIcon from "../assets/icon/type/3.svg?react";
import GritIcon from "../assets/icon/type/4.svg?react";
import IntIcon from "../assets/icon/type/5.svg?react";
import FriendIcon from "../assets/icon/type/6.svg?react";


type SearchProps = {
    inputText: string,
    setInputText: (name: string) => void;
    SearchNameEvent: (name: string) => void;
}

function Search({ inputText, setInputText, SearchNameEvent }: SearchProps) {

    return (
        <input
            className={styles.searchInput}
            type="text"
            placeholder="카드 이름을 입력하세요"
            value={inputText}
            onChange={(e) => {
                setInputText(e.currentTarget.value);
                SearchNameEvent(e.currentTarget.value);
            }}
        />
    );
}


type TypeListProps = {
    selectedType: number;
    selectTypeEvent: (n: number) => void;
};

function TypeList({ selectedType, selectTypeEvent }: TypeListProps) {
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
                        onClick={() => selectTypeEvent(selectedType === id ? 0 : id)}
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
    selectedType: number;
    searchedName: string;
    cardList: CardListMap;
    closeLayerEvent: () => void;
    setCardsEvent: (code: number) => void;
};

// 캐릭터 리스트
function CharaList({ selectedType, searchedName, cardList, closeLayerEvent, setCardsEvent }: CharaListProps) {
    const isEmpty = Object.entries(cardList).length <= 0;

    function cardClickEvent(code: number) {
        setCardsEvent(code);
        closeLayerEvent();
    }

    return (
        <ul className={styles.charaList}>
        {!isEmpty &&
            Object.entries(cardList).filter(([, card]) => // 타입검색 && 이름검색
                (selectedType === 0 || card.type === String(selectedType)) &&
                (searchedName === '' || card.search?.includes(searchedName)))
            .map(([code, card]) => (
                <li key={code}>
                    <button onClick={() => cardClickEvent(Number(code))}>
                        <img src={card.image} alt={card.name} />
                        <span className="sr-only">{card.name}</span>
                    </button>
                </li>
            ))}
        </ul>
    );
}


const headerHeight = 65;

type CardLayerProps = {
    cardList: CardListMap;
    closeLayerEvent: () => void;
    setCardsEvent: (code: number) => void;
    coordXY: number[];
};

function CardLayer({ cardList, closeLayerEvent, setCardsEvent, coordXY }: CardLayerProps) {
    const [selectedType, setSelectedType] = useState<number>(0);
    const [inputText, setInputText] = useState<string>('');  // input text 표시값
    const [searchedName, setSearchedName] = useState<string>('');  // 검색용
    const layerRef = useRef<HTMLDivElement>(null);
    const timerRef = useRef<number | null>(null);

    let layerWidth = 434;
    let layerHeight = 640;

    // Layer 위치 보정
    let x = coordXY[0];
    let y = coordXY[1] + window.scrollY;
    console.log(y, window.scrollY);

    if (window.innerWidth <= MOBILE_BREAK || window.innerHeight <= layerHeight) {
        // window 폭이 layerWidth 보다 작을 때는 레이어 폭을 가득 채움
        layerWidth = window.innerWidth;
        layerHeight = window.innerHeight - headerHeight;
        x = 0;
        y = headerHeight;
    } else {
        // 레이어가 window 폭을 벗어나면 보정
        if (x + layerWidth > window.innerWidth) {
            x = x - layerWidth;
        }
        // 레이어가 window 높이를 벗어나면 보정
        if (y + layerHeight > window.innerHeight) {
            y = y - layerHeight + headerHeight;
            y = y < 0 ? window.scrollY + headerHeight : y;
        }
    }

    x = Math.max(0, x);
    y = Math.max(0, y);



    function SearchNameEvent(newText: string) {
    const text = newText.replace(/\s/g, "");  // 공백 제거

        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }

        timerRef.current = window.setTimeout(() => {
            setSearchedName(text);
            setSelectedType(0);  // 타입 필터 무효화
        }, 300);
    }

    function selectTypeEvent(type: number) {
        setSelectedType(type);
        setInputText('');
        setSearchedName('');
    }

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (!layerRef.current) return;
            if(layerRef.current && e.target instanceof Node && !layerRef.current.contains(e.target)) {
                closeLayerEvent();
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);

            // 이름 검색 타이머 이벤트 제거
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        }
    }, [closeLayerEvent]);
    return (
        <div
            className={styles.layer}
            ref={layerRef}
            style={{
                width: `${layerWidth}px`,
                height: `${layerHeight}px`,
                top: `${y}px`,
                left: `${x}px`,
            }}
        >
            <div className={styles.header}>
                <h4>서포트 카드 리스트</h4>
                <button onClick={closeLayerEvent}>
                    <span className="sr-only">닫기</span>
                </button>
            </div>
            <div className={styles.contents}>
                <Search
                    inputText={inputText}
                    setInputText={setInputText}
                    SearchNameEvent={SearchNameEvent}
                />
                <TypeList
                    selectedType={selectedType}
                    selectTypeEvent={selectTypeEvent}
                />
                <CharaList
                selectedType={selectedType}
                searchedName={searchedName}
                cardList={cardList}
                setCardsEvent={setCardsEvent}
                closeLayerEvent={closeLayerEvent}
                />
            </div>
        </div>
    );
}

export default CardLayer;
