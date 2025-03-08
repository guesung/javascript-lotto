import { BONUS_NUMBER_COUNT, INPUT_MESSAGES, LOTTO_LENGTH, LOTTO_RANK_INFO, SEPERATOR } from '../../lib/constants.js';
import { calculateMatchCount } from '../../lib/utils.js';
import App from '../App.js';
import { createDivElement } from '../utils.js';

export default class OutputView {
  static renderLayout() {
    this.#render(
      `<header class="lotto-title">🎱 행운의 로또</header>
        <main id="container" class="lotto-body"></main>
        <footer class="lotto-primary">Copyright 2023. woowacourse</footer>
      `,
      null,
      'app',
    );

    this.#setLayoutCSS();
  }

  static #setLayoutCSS() {
    const headerHeight = document.querySelector('header').offsetHeight;
    document.documentElement.style.setProperty('--header-height', headerHeight + 'px');

    const footerHeight = document.querySelector('footer').offsetHeight;
    document.documentElement.style.setProperty('--footer-height', footerHeight + 'px');
  }

  static disablePurchaseForm() {
    const purchaseSubmitButton = document.querySelector('.purchase__button-submit');
    purchaseSubmitButton.disabled = true;

    const purchaseInput = document.querySelector('.purchase__input--amount');
    purchaseInput.disabled = true;
  }

  static renderPurchaseSection() {
    this.#render(
      `<section class="purchase">
        <h2 class="lotto-title">🎱내 번호 당첨 번호 확인🎱</h2>
        <form class="purchase__form">
          <label for="purchase__amount">${INPUT_MESSAGES.purchaseAmount}</label>
          <div>
            <input type="number" placeholder="금액" value="5000" id="purchase__amount" class="purchase__input--amount"  />
            <button class="purchase__button-submit">구입</button>
          </div>
        </form>
      </section>
      `,
    );
  }

  static renderPurchasedSection(purchasedLottos) {
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

  static renderWinningNumberSection() {
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
                  .map(
                    (_, index) =>
                      `<input class="winning__input--lotto-number" value="${
                        index + 1
                      }" maxlength="2" min="1" max="45" />`,
                  )
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

  static renderStatisticModal(lottoRankMap, profitRate) {
    this.#render(
      `<my-modal>
        <span class="result__close" aria-label="닫기">X</span>
        <h2 class="lotto-subtitle result__title">🏆 당첨 통계 🏆</h2>
        <table aria-label="로또 당첨 통계">
          <tr class="result__table--title">
            <th>일치 갯수</th>
            <th>당첨금</th>
            <th>당첨 갯수</th>
          </tr>
          ${OutputView.#getLottoRanksOutput(lottoRankMap)}
        </table>
        <p class="result__profile-rate">당신의 총 수익률은 ${profitRate}%입니다.</p>
        <button class="result__button--retry">다시 시작하기</button>
      </my-modal>
    `,
      null,
      'app',
    );
  }

  static #getLottoRanksOutput(lottoRankMap) {
    return [...Object.keys(LOTTO_RANK_INFO)]
      .reverse()
      .map((rank) => {
        const lottoRankInfo = LOTTO_RANK_INFO[rank];
        const rankCount = lottoRankMap.get(rank) ?? 0;

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

  static removeModal() {
    document.querySelector('#app').querySelector('my-modal')?.remove();
  }

  static resetApp() {
    document.querySelector('#app').innerHTML = '';

    const app = new App();
    app.init();
  }

  static #render(innerHTML, attributes, containerId = 'container') {
    const container = document.getElementById(containerId);

    if (attributes) {
      const element = createDivElement(attributes);
      element.insertAdjacentHTML('beforeend', innerHTML);
      container.appendChild(element);
      return;
    }

    container.insertAdjacentHTML('beforeend', innerHTML);
  }
}
