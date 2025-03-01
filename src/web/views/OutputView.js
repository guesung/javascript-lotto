import { BONUS_NUMBER_COUNT, LOTTO_LENGTH, LOTTO_RANK_INFO, SEPERATOR } from '../../lib/constants.js';
import { calculateMatchCount } from '../../lib/utils.js';
import App from '../App.js';
import { appendContainer, createDivElement } from '../utils.js';

export default class OutputView {
  static disablePurchaseSubmitButton() {
    const purchaseSubmitButton = document.querySelector('.purchase__button-submit');
    purchaseSubmitButton.disabled = true;
  }

  static renderContainer() {
    this.#render(
      `<header class="lotto-title">🎱 행운의 로또</header>
        <main id="container" class="lotto-body"></main>
        <footer class="lotto-primary">Copyright 2023. woowacourse</footer>
      `,
      null,
      'app',
    );
  }

  static renderPurchaseCountInput() {
    this.#render(
      `<section class="purchase">
        <h2 class="lotto-title">🎱내 번호 당첨 번호 확인🎱</h2>
        <form class="purchase__form">
          <label for="purchase__amount">구입할 금액을 입력해주세요.</label>
          <div>
            <input type="number" placeholder="금액" value="5000" id="purchase__amount" class="purchase__input--amount"  />
            <button class="purchase__button-submit">구입</button>
          </div>
        </form>
      </section>
      `,
    );
  }

  static renderPurchasedLottos(purchasedLottos) {
    this.#render(
      `<section class="purchased">
        <p>총 ${purchasedLottos.length}개를 구매하였습니다.</p>
        <ul class="purchased__list">
          ${purchasedLottos
            .map(
              (purchasedLotto) =>
                `<li class="purchased__item"><span class="purchased__ticket">🎟️</span>${purchasedLotto.numbers.join(
                  `${SEPERATOR} `,
                )}</li>`,
            )
            .join('')}
        </ul>
      </section>
    `,
    );
  }

  static renderWinningNumberForm() {
    this.#render(
      `<section class="winning">
        <form class="winning__form">
          <p>지난 주 당첨번호 ${LOTTO_LENGTH}개와 보너스 번호 ${BONUS_NUMBER_COUNT}개를 입력해주세요.</p>
          <div class="winning__box">
            <div class="winning__box-numbers">
              <label>당첨 번호</label>
              <div>
                ${new Array(LOTTO_LENGTH)
                  .fill(null)
                  .map((_, index) => `<input class="winning__input--lotto-number" value="${index + 1}" />`)
                  .join('')}
              </div>
            </div>
            <div class="winning__box-bonus-number">
              <label>보너스 번호</label>
              <input class="winning__input--bonus-number" value="7" />
            </div>
          </div>
          <button class="winning__button-submit">결과 확인하기</button>
        </form>
      </section>
    `,
    );
  }

  static renderStatistics(lottoRanks, profitRate) {
    this.#render(
      `<article class="result">
        <span class="result__close" aria-label="닫기">X</span>
        <h2 class="lotto-subtitle result__title">🏆 당첨 통계 🏆</h2>
        <table aria-label="로또 당첨 통계">
          <tr class="result__table--title">
            <th>일치 갯수</th>
            <th>당첨금</th>
            <th>당첨 갯수</th>
          </tr>
          ${OutputView.#renderLottoRanks(lottoRanks)}
        </table>
        <p class="result__profile-rate">당신의 총 수익률은 ${profitRate}%입니다.</p>
        <button class="result__button--retry">다시 시작하기</button>
      </article>
    `,
      { class: 'modal' },
    );

    OutputView.#removeModalWhenKeydownEscape();
    OutputView.#removeModalWhenClickOutsideModal();
    OutputView.#removeModalWhenClickCloseButton();

    const modalOverlay = createDivElement({ class: 'overlay' });
    appendContainer(modalOverlay);
  }

  static #removeModalWhenClickCloseButton() {
    const resultCloseButton = document.querySelector('.result__close');
    resultCloseButton.addEventListener('click', OutputView.#removeModal);
  }

  static #removeModalWhenKeydownEscape() {
    window.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') OutputView.#removeModal();
    });
  }

  static #removeModalWhenClickOutsideModal() {
    window.addEventListener('click', (event) => {
      if (!event.target.closest('.modal')) OutputView.#removeModal();
    });
  }

  static #renderLottoRanks(lottoRanks) {
    return [...Object.keys(LOTTO_RANK_INFO)]
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
      .join('');
  }

  static renderRetryButton() {
    const retryButton = document.querySelector('.result__button--retry');
    retryButton.addEventListener('click', handleRetryButton);

    function handleRetryButton() {
      document.querySelectorAll('input').forEach((input) => {
        input.value = '';
      });
      OutputView.#removeModal();
      OutputView.#removeContainer();

      const app = new App();
      app.init();
    }
  }

  static #removeModal() {
    container.querySelector('.modal').remove();
    container.querySelector('.overlay').remove();
  }

  static #removeContainer() {
    container.remove();
  }

  static #render(innerHTML, attributes, containerId = 'container') {
    const container = document.getElementById(containerId);
    const element = createDivElement(attributes);
    element.innerHTML = innerHTML;

    container.appendChild(element);
  }
}
