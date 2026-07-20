
import styles from "./../assets/styles/cardSimulator.module.scss";
interface CardListLeftProps {
    col: number;
    onClickEvent: (n:number) => void;
    resetAllSlotsEvent: () => void;
}

function CardListLeft({ col, onClickEvent, resetAllSlotsEvent }: CardListLeftProps) {
    return (
        <div className={styles.leftBoxWrap}>
            {/* <div className={styles.leftBox}>
                <h4>
                    <span className={styles.icon}></span>
                    <span>카드 선택</span>
                </h4>
                <div className={styles.leftInnerBox}>
                    <p>※ 우측 영역을 눌러 서포트 카드의 속성과 종류를 선택하세요.</p>
                </div>
            </div> */}

            <div className={styles.selectBox}>
                <h4>카드 갯수 선택</h4>
                <div className={styles.leftInnerBox}>
                    <div className={styles.select}>
                        <select id="col" value={col} onChange={(e) => onClickEvent(Number(e.target.value))}>
                            <option value="4">4칸</option>
                            <option value="5">5칸</option>
                            <option value="6">6칸</option>
                            <option value="7">7칸</option>
                            <option value="8">8칸</option>
                        </select>
                    </div>
                </div>
            </div>
            <button className={styles.resetButton} onClick={resetAllSlotsEvent}>초기화</button>
        </div>
    )
}

export default CardListLeft;