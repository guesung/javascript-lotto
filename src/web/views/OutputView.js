import { BONUS_NUMBER_COUNT, LOTTO_LENGTH, LOTTO_RANK_INFO, SEPERATOR } from '../../lib/constants.js';
import { calculateMatchCount } from '../../lib/utils.js';
import App from '../App.js';
import { appendContainer, createDivElement } from '../utils.js';

export default class OutputView {
  static printContainer() {
    this.#print(
      `
        <header class="lotto-title">🎱 행운의 로또</header>
        <div id="container" class="lotto-body"></div>
        <footer class="lotto-primary">Copyright 2023. woowacourse</footer>
      `,
      null,
      'app',
    );
  }

  static printPurchaseCountInput() {
    this.#print(`
      <div id="container__purchase">
        <h2 class="lotto-title">🎱내 번호 당첨 번호 확인🎱</h2>
        <form id="purchase">
          <label for="purchase-amount">구입할 금액을 입력해주세요.</label>
          <div>
            <input type="text" placeholder="금액" value="5000" id="purchase-amount" />
            <button>구입</button>
          </div>
        </form>
      </div>
      `);
  }

  static printPurchaseCount(purchaseCount) {
    this.#print(`<p>총 ${purchaseCount}개를 구매하였습니다.</p>`);
  }

  static printPurchasedLottos(purchasedLottos) {
    this.#print(
      `
      <div id="container__purchased-lottos">
        <ul>
          ${purchasedLottos
            .map(
              (purchasedLotto) =>
                `<li class="ticket"><span>🎟️</span>${purchasedLotto.numbers.join(`${SEPERATOR} `)}</li>`,
            )
            .join('')}
        </ul>
      </div>
    `,
      { class: 'lotto-info-container' },
    );
  }

  static printWinningNumberForm() {
    this.#print(`
      <div id="container__winning-numbers">
        <form id="result">
          <p>지난 주 당첨번호 ${LOTTO_LENGTH}개와 보너스 번호 ${BONUS_NUMBER_COUNT}개를 입력해주세요.</p>
          <div class="winning-box">
            <div class="winning-number-box">
              <label>당첨 번호</label>
              <div>
                ${new Array(LOTTO_LENGTH)
                  .fill(null)
                  .map((_, index) => `<input class="winning-number" value="${index + 1}" />`)
                  .join('')}
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
      </div>
    `);
  }

  static printStatistics(lottoRanks, profitRate) {
    this.#print(
      `
      <div id="container__winning-statics">
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
        <button id="retry">다시 시작하기</button>
      </div>
    `,
      { class: 'modal' },
    );

    const modalOverlay = createDivElement({ class: 'overlay' });
    appendContainer(modalOverlay);
  }

  static printRetryButton() {
    const retryButton = document.getElementById('retry');

    const handleRetryButton = () => {
      document.querySelectorAll('input').forEach((input) => {
        input.value = '';
      });
      OutputView.#removeModal();

      App.reset();

      const app = new App();
      app.init();
    };
    retryButton.addEventListener('click', handleRetryButton);
  }

  static #removeModal() {
    const container = document.getElementById('container');

    const modal = container.querySelector(`.${'modal'}`);
    container.removeChild(modal);

    const overlay = container.querySelector(`.${'overlay'}`);
    container.removeChild(overlay);
  }

  static #print(innerHTML, atributes, containerId = 'container') {
    const container = document.getElementById(containerId);
    const element = createDivElement(atributes);
    element.innerHTML = innerHTML;

    container.appendChild(element);
  }
}
