import App2 from '../App2.js';
import { CLASS_NAME_MAP, ID_MAP } from '../dom/constants.js';
import { appendContainer, createDivElement } from '../dom/utils.js';
import { BONUS_NUMBER_COUNT, LOTTO_LENGTH, LOTTO_RANK_INFO, SEPERATOR } from '../lib/constants.js';
import { calculateMatchCount } from '../lib/utils.js';

export default class WebOutputView {
  static printContainer() {
    this.#print(
      `
      <header class="lotto-title">🎱 행운의 로또</header>
      <div id="${ID_MAP.container}" class="lotto-body"></div>
      <footer class="lotto-primary">Copyright 2023. woowacourse</footer>
    `,
      null,
      ID_MAP.app,
    );
  }

  static printPurchaseCountInput() {
    this.#print(`
        <h2 class="lotto-title">🎱내 번호 당첨 번호 확인🎱</h2>
        <form id="${ID_MAP.form.purchase}">
          <label for="purchase-amount">구입할 금액을 입력해주세요.</label>
          <div>
            <input type="text" placeholder="금액" value="5000" class="${CLASS_NAME_MAP.price}" id="purchase-amount" />
            <button>구입</button>
          </div>
        </form>
      `);
  }

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
              `<li class="${CLASS_NAME_MAP.ticket}"><span>🎟️</span>${purchasedLotto.numbers.join(
                `${SEPERATOR} `,
              )}</li>`,
          )
          .join('')}
      </ul>
    `,
      { class: 'lotto-info-container' },
    );
  }

  static printWinningNumberForm() {
    this.#print(`
      <form id="${ID_MAP.form.result}">
        <p>지난 주 당첨번호 ${LOTTO_LENGTH}개와 보너스 번호 ${BONUS_NUMBER_COUNT}개를 입력해주세요.</p>
        <div class="${CLASS_NAME_MAP.winningBox}">
          <div class="${CLASS_NAME_MAP.winningNumberBox}">
            <label>당첨 번호</label>
            <div>
              ${new Array(LOTTO_LENGTH)
                .fill(null)
                .map((_, index) => `<input class="${CLASS_NAME_MAP.winningNumber}" value="${index + 1}" />`)
                .join('')}
            </div>
          </div>
          <div class="${CLASS_NAME_MAP.bonusNumberBox}">
            <label>보너스 번호</label>
            <div>
              <input class="${CLASS_NAME_MAP.bonusNumber}" value="7" />
            </div>
          </div>
        </div>
        <button id="${ID_MAP.button.showResult}">결과 확인하기</button>
      </form>
    `);
  }

  static printStatistics(lottoRanks, profitRate) {
    this.#print(
      `
      <h2 class="lotto-subtitle">🏆 당첨 통계 🏆</h2>
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
      <p class="profile-rate">당신의 총 수익률은 ${profitRate}%입니다.</p>
      <button id="${ID_MAP.button.retry}">다시 시작하기</button>
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

      App2.reset();

      const app2 = new App2();
      app2.init();
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

  static #print(innerHTML, atributes, containerId = ID_MAP.container) {
    const container = document.getElementById(containerId);
    const element = createDivElement(atributes);
    element.innerHTML = innerHTML;

    container.appendChild(element);
  }
}
