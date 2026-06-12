import styles from "../assets/styles/cardSimulator.module.scss";

function Search() {  // 검색
    return (
        <input
            className={styles.searchInput}
            type="text"
            placeholder="카드 이름을 입력하세요"
        />
    );
}

function TypeList() {  // 타입 버튼
    // 타입 컴포넌트
    return (
        <ul>
            <li>
                <button></button>
            </li>
        </ul>
    );
}

function CharaList() {  // 캐릭터 리스트
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
                <TypeList />
                <CharaList />
            </div>
        </div>
    );
}

export default CardLayer;
