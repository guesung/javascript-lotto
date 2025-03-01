import { LottoCompany, LottoShop } from '../domain/index.js';
import { LOTTO_PRICE } from '../lib/constants.js';
import { calculateProfitRate } from '../lib/utils.js';
import { InputView, OutputView } from './views/index.js';

export default class App {
  #purchasedLottos;

  init() {
    OutputView.renderContainer();
    OutputView.renderPurchaseCountInput();

    document.querySelector('.purchase__form').addEventListener('submit', this.#handlePurchaseSubmit.bind(this));
  }

  #handlePurchaseSubmit(event) {
    event.preventDefault();

    const purchaseSubmitButton = document.querySelector('.purchase__button-submit');
    console.log(purchaseSubmitButton);
    purchaseSubmitButton.disabled = true;

    const purchaseAmount = InputView.readPurchaseAmount();
    if (!purchaseAmount) return;

    this.#purchasedLottos = LottoShop.createLotto(purchaseAmount);

    OutputView.renderPurchasedLottos(this.#purchasedLottos);
    OutputView.renderWinningNumberForm();

    document.querySelector('.winning__form').addEventListener('submit', this.#handleResultSubmit.bind(this));
  }

  #handleResultSubmit(event) {
    event.preventDefault();

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
