import { LottoCompany, LottoShop } from '../domain/index.js';
import { LOTTO_PRICE } from '../lib/constants.js';
import { calculateProfitRate } from '../lib/utils.js';
import { InputView, OutputView } from './views/index.js';

export default class App {
  #purchasedLottos;

  init() {
    OutputView.renderContainer();
    OutputView.renderPurchaseCountInput();

    window.addEventListener('submit', (formSubmitEvent) => {
      formSubmitEvent.preventDefault();

      if (formSubmitEvent.target.classList.contains('purchase__form')) {
        this.#handlePurchaseSubmit.call(this);
      }

      if (formSubmitEvent.target.classList.contains('winning__form')) {
        this.#handleResultSubmit.call(this);
      }
    });
  }

  #handlePurchaseSubmit() {
    const purchaseAmount = InputView.readPurchaseAmount();
    if (!purchaseAmount) return;

    OutputView.disablePurchaseSubmitButton();

    this.#purchasedLottos = LottoShop.createLotto(purchaseAmount);

    OutputView.renderPurchasedLottos(this.#purchasedLottos);
    OutputView.renderWinningNumberForm();
  }

  #handleResultSubmit() {
    const winningNumbers = InputView.readWinNumbers();
    if (!winningNumbers) return;

    const bonusNumber = InputView.readBonusNumber(winningNumbers);
    if (!bonusNumber) return;

    const lottoCompany = new LottoCompany(winningNumbers, bonusNumber);
    const lottoRanks = lottoCompany.calculateLottoRanks(this.#purchasedLottos);

    const totalPrize = lottoCompany.calculateTotalProfit(lottoRanks);
    const profitRate = calculateProfitRate(totalPrize, this.#purchasedLottos.length * LOTTO_PRICE);

    OutputView.renderStatistics(lottoRanks, profitRate);
    OutputView.renderRetryButton();
  }
}
