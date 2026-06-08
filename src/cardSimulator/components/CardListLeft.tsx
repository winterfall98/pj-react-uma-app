
import styles from "./../assets/styles/cardSimulator.module.scss";
/** 
 * TODO: 
 * 
 * 셀렉트 (열 갯수 제어)
 */

function CardListLeft() {
    return (
        <div className={styles.leftBoxWrap}>
            <div className={styles.leftBox}>
                <h4>
                    <span className={styles.icon}></span>
                    <span>카드 선택</span>
                </h4>
                <div className={styles.selectBottomBox}>
                    <p>※ 우측 영역을 눌러 서포트 카드의 속성과 종류를 선택하세요.</p>
                </div>
            </div>

            <div className={styles.selectBox}>
                <h4>카드 갯수 선택</h4>
                <div className={styles.selectBottomBox}>
                    <select id="col">
                        <option value="4" selected>4칸</option>
                        <option value="5">5칸</option>
                        <option value="6">6칸</option>
                        <option value="7">7칸</option>
                    </select>
                </div>
            </div>
        </div>
    )
}

export default CardListLeft;