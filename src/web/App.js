import { LottoCompany, LottoShop } from '../domain/index.js';
import { LOTTO_PRICE } from '../lib/constants.js';
import { calculateProfitRate } from '../lib/utils.js';
import { InputView, OutputView } from './views/index.js';

export default class App {
  #purchasedLottos;

  constructor() {
    this.#purchasedLottos = [];
  }

  init() {
    OutputView.renderLayout();
    OutputView.renderPurchaseSection();
  }

  attachEventListener() {
    this.#attachSubmitEventListener();
    this.#attachClickEventListener();
    this.#attachKeyDownEventListener();
  }

  #attachSubmitEventListener() {
    window.addEventListener('submit', (submitEvent) => {
      submitEvent.preventDefault();

      try {
        if (submitEvent.target.classList.contains('purchase__form')) this.#handlePurchaseFormSubmit();
        if (submitEvent.target.classList.contains('winning__form')) this.#handleWinningFormSubmit();
      } catch (error) {
        window.alert(error.message);
      }
    });
  }

  #attachClickEventListener() {
    window.addEventListener('click', (clickEvent) => {
      if (clickEvent.target.classList.contains('result__button--retry')) OutputView.resetApp();

      if (clickEvent.target.classList.contains('result__close')) OutputView.removeModal();
      if (!clickEvent.target.closest('.modal')) OutputView.removeModal();
    });
  }

  #attachKeyDownEventListener() {
    window.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') OutputView.removeModal();
    });
  }

  #handlePurchaseFormSubmit() {
    const purchaseAmount = InputView.readPurchaseAmount();

    OutputView.disablePurchaseForm();

    this.#purchasedLottos = LottoShop.createLotto(purchaseAmount);

    OutputView.renderPurchasedSection(this.#purchasedLottos);
    OutputView.renderWinningNumberSection();
  }

  #handleWinningFormSubmit() {
    const winningNumbers = InputView.readWinNumbers();
    const bonusNumber = InputView.readBonusNumber(winningNumbers);

    const lottoCompany = new LottoCompany(winningNumbers, bonusNumber);
    const lottoRankMap = lottoCompany.calculateLottoRanks(this.#purchasedLottos);

    const totalPrize = lottoCompany.calculateTotalProfit(lottoRankMap);
    const profitRate = calculateProfitRate(totalPrize, this.#purchasedLottos.length * LOTTO_PRICE);

    OutputView.renderStatisticModal(lottoRankMap, profitRate);
  }
}
