import { LottoCompany, LottoShop } from '../domain/index.js';
import { calculateProfitRate } from '../lib/utils.js';
import { InputView, OutputView } from './views/index.js';

export default class App {
  init() {
    OutputView.printContainer();
    OutputView.printPurchaseCountInput();

    document.querySelector('.purchase__form').addEventListener('submit', handlePurchaseSubmit);

    let purchasedLottos;
    function handlePurchaseSubmit(event) {
      event.preventDefault();

      if (purchasedLottos) return;

      const purchaseAmount = InputView.readPurchaseAmount();
      if (!purchaseAmount) return;

      const purchaseCount = LottoShop.calculateLottoCount(purchaseAmount);
      purchasedLottos = LottoShop.createLotto(purchaseCount);

      OutputView.printPurchasedLottos(purchasedLottos);
      OutputView.printWinningNumberForm();

      document.querySelector('.winning__form').addEventListener('submit', handleResultSubmit);

      function handleResultSubmit(event) {
        event.preventDefault();

        const winningNumbers = InputView.readWinNumbers();
        if (!winningNumbers) return;

        const bonusNumber = InputView.readBonusNumber(winningNumbers);
        if (!bonusNumber) return;

        const lottoCompany = new LottoCompany(winningNumbers, bonusNumber);
        const lottoRanks = lottoCompany.calculateLottoRanks(purchasedLottos);

        const totalPrize = lottoCompany.calculateTotalProfit(lottoRanks);
        const profitRate = calculateProfitRate(totalPrize, purchaseAmount);

        OutputView.printStatistics(lottoRanks, profitRate);
        OutputView.printRetryButton();
      }
    }
  }
}
