import { CLASS_NAME_MAP, ID_MAP } from '../dom/constants.js';
import { appendContainer, createDivElement } from '../dom/utils.js';
import { LOTTO_RANK_INFO } from '../lib/constants.js';
import { calculateMatchCount } from '../lib/utils.js';

export default class WebOutputView {
  static printPurchaseCount(purchaseCount) {
    this.#print(`<p>총 ${purchaseCount}개를 구매하였습니다.</p>`);
  }

  static printPurchasedLottos(purchasedLottos) {
    this.#print(
      `
      <ul>
        ${purchasedLottos
          .map(
            (purchasedLotto) =>
              `<li class="${CLASS_NAME_MAP.ticket}"><span>🎟️</span>${purchasedLotto.numbers.join(', ')}</li>`,
          )
          .join('')}
      </ul>
    `,
      { class: 'lotto-info-container' },
    );
  }

  static printWinningNumberForm() {
    this.#print(`
      <form id="result">
        <p>지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.</p>
        <div class="${CLASS_NAME_MAP.winningBox}">
          <div class="${CLASS_NAME_MAP.winningNumberBox}">
            <label>당첨 번호</label>
            <div>
              ${new Array(6)
                .fill(null)
                .map((_, index) => `<input class="${CLASS_NAME_MAP.winningNumber}" value="${index + 1}" />`)}
            </div>
          </div>
          <div class="${CLASS_NAME_MAP.bonusNumberBox}">
            <label>보너스 번호</label>
            <div>
              <input class="${CLASS_NAME_MAP.bonusNumber}" value="7" />
            </div>
          </div>
        </div>
        <button id="show-result">결과 확인하기</button>
      </form>
    `);
  }

  static printStatistics(lottoRanks, profitRate) {
    this.#print(
      `
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
      <button id=${ID_MAP.button.retry}>다시 시작하기</button>
    `,
      { class: CLASS_NAME_MAP.modal },
    );

    const modalOverlay = createDivElement({ class: CLASS_NAME_MAP.overlay });
    appendContainer(modalOverlay);
  }

  static printRetryButton() {
    const retryButton = document.getElementById(ID_MAP.button.retry);

    const handleRetryButton = () => {
      document.querySelectorAll('input').forEach((input) => {
        input.value = '';
      });
      WebOutputView.#removeModal();
    };
    retryButton.addEventListener('click', handleRetryButton);
  }

  static #removeModal() {
    const container = document.getElementById(ID_MAP.container);

    const modal = container.querySelector(`.${CLASS_NAME_MAP.modal}`);
    container.removeChild(modal);

    const overlay = container.querySelector(`.${CLASS_NAME_MAP.overlay}`);
    container.removeChild(overlay);
  }

  static #print(innerHTML, atributes) {
    const container = document.getElementById(ID_MAP.container);
    const element = createDivElement(atributes);
    element.innerHTML = innerHTML;

    container.appendChild(element);
  }
}
