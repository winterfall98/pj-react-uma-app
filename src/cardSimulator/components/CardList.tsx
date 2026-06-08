import styles from "./../assets/styles/cardSimulator.module.scss";

// 카드 1개
// 카드 데이터가 들어온 경우 변경 예정
function Card() {
    return (
        <>
            <button className={styles.cardSlot}>
                <span className={styles.slotPlus} aria-hidden="true"></span>
                <span className="sr-only">서포트 카드 선택</span>
            </button>
        </>
    );
}

// 카드 리스트 (n개)
// TODO: 슬롯 개수 셀렉트 받아서, 해당 값대로 Card 컴포넌트 렌더링하도록 변경 예정
function CardList() {
    return (
        <>
            <h3 className="sr-only">카드 리스트</h3>
            <div className={styles.cardList}>
                <Card />
                <Card />
                <Card />
                <Card />
            </div>
        </>
    );
}

export default CardList;