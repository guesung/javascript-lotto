import { LottoCompany, LottoShop } from '../domain/index.js';
import { LOTTO_PRICE } from '../lib/constants.js';
import { calculateProfitRate } from '../lib/utils.js';
import { InputView, OutputView } from './views/index.js';

export default class App {
  #purchasedLottos;

  init() {
    OutputView.renderContainer();
    OutputView.renderPurchaseCountInput();
  }

  attachSubmitEventListener() {
    window.addEventListener('submit', (submitEvent) => {
      submitEvent.preventDefault();

      try {
        if (submitEvent.target.classList.contains('purchase__form')) this.#handlePurchaseFormSubmit.call(this);
        if (submitEvent.target.classList.contains('winning__form')) this.#handleWinningFormSubmit.call(this);
      } catch (error) {
        window.alert(error.message);
      }
    });
  }

  attachClickEventListener() {
    window.addEventListener('click', (clickEvent) => {
      if (clickEvent.target.classList.contains('result__button--retry')) this.#handleRetryButtonClick();
    });
  }

  #handlePurchaseFormSubmit() {
    const purchaseAmount = InputView.readPurchaseAmount();

    OutputView.disablePurchaseSubmitButton();

    this.#purchasedLottos = LottoShop.createLotto(purchaseAmount);

    OutputView.renderPurchasedLottos(this.#purchasedLottos);
    OutputView.renderWinningNumberForm();
  }

  #handleWinningFormSubmit() {
    const winningNumbers = InputView.readWinNumbers();
    const bonusNumber = InputView.readBonusNumber(winningNumbers);

    const lottoCompany = new LottoCompany(winningNumbers, bonusNumber);
    const lottoRanks = lottoCompany.calculateLottoRanks(this.#purchasedLottos);

    const totalPrize = lottoCompany.calculateTotalProfit(lottoRanks);
    const profitRate = calculateProfitRate(totalPrize, this.#purchasedLottos.length * LOTTO_PRICE);

    OutputView.renderStatisticModal(lottoRanks, profitRate);
  }

  #handleRetryButtonClick() {
    OutputView.resetApp();

    const app = new App();
    app.init();
  }
}
