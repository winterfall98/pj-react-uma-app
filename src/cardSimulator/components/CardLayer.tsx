import styles from "../assets/styles/cardSimulator.module.scss";

function Search() {
    // 검색 컴포넌트
    return <input type="text"></input>;
}

function TypeList() {
    // 타입 컴포넌트
    return (
        <ul>
            <li>
                <button></button>
            </li>
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
    return (
        <div className="layer">
            <div className={styles.header}>
                <h4>서포트 카드 리스트</h4>
                <button>
                    <span className="sr-only">닫기</span>
                </button>
            </div>
            <Search />
            <TypeList />
            <CharaList />
        </div>
    );
}

export default CardLayer;
