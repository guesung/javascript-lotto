import { appendContainer, createDivElement } from '../dom/utils.js';
import { LOTTO_RANK_INFO } from '../lib/constants.js';
import { calculateMatchCount } from '../lib/utils.js';

export default class WebOutputView {
  static printPurchaseCount(purchaseCount) {
    const lottoInfoContainer = createDivElement();
    lottoInfoContainer.innerHTML = `<p>총 ${purchaseCount}개를 구매하였습니다.</p>`;
    this.#print(lottoInfoContainer);
  }

  static printPurchasedLottos(purchasedLottos) {
    const lottoInfoContainer = createDivElement({ class: 'lotto-info-container' });
    this.#print(lottoInfoContainer);

    lottoInfoContainer.innerHTML = `
      <ul>
        ${purchasedLottos
          .map((purchasedLotto) => `<li class="ticket"><span>🎟️</span>${purchasedLotto.numbers.join(', ')}</li>`)
          .join('')}
      </ul>
    `;
  }

  static printWinningNumberForm() {
    const container = createDivElement();
    this.#print(container);

    container.innerHTML = `
      <form id="result">
        <p>지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.</p>
        <div class="winning-box">
          <div class="winning-number-box">
            <label>당첨 번호</label>
            <div>
              <input class="winning-number" value="1" />
              <input class="winning-number" value="2" />
              <input class="winning-number" value="3" />
              <input class="winning-number" value="4" />
              <input class="winning-number" value="5" />
              <input class="winning-number" value="6" />
            </div>
          </div>
          <div class="bonus-number-box">
            <label>보너스 번호</label>
            <div>
              <input class="bonus-number" value="7" />
            </div>
          </div>
        </div>
        <button id="show-result">결과 확인하기</button>
      </form>
    `;
  }

  static printStatistics(lottoRanks, profitRate) {
    const container = createDivElement({ class: 'modal' });
    this.#print(container);

    container.innerHTML = `
      <h2>🏆 당첨 통계 🏆</h2>
      <table>
        <tr>
          <td>일치 갯수</td>
          <td>당첨금</td>
          <td>당첨 갯수</td>
        </tr>
        ${[...Object.keys(LOTTO_RANK_INFO)]
          .reverse()
          .map((rank) => {
            const lottoRankInfo = LOTTO_RANK_INFO[rank];
            const rankCount = calculateMatchCount(lottoRanks, rank);
            return `
        <tr>
          <td>${lottoRankInfo.winNumber}개</td>
          <td>${lottoRankInfo.prize.toLocaleString()}</td>
          <td>${rankCount}개</td>
        </tr>
      `;
          })
          .join('')}
      </table>
      <p>당신의 총 수익률은 ${profitRate}%입니다.</p>
      <button id="retry">다시 시작하기</button>
    `;
  }

  static #print(element) {
    appendContainer(element);
  }
}
