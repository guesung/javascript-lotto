import { LottoCompany, LottoShop } from '../domain/index.js';
import { calculateProfitRate } from '../lib/utils.js';
import { InputView, OutputView } from './views/index.js';

export default class App {
  init() {
    OutputView.printContainer();
    OutputView.printPurchaseCountInput();

    document.getElementById('purchase').addEventListener('submit', handlePurchaseSubmit);

    let purchasedLottos;
    function handlePurchaseSubmit(event) {
      event.preventDefault();

      if (purchasedLottos) return;

      const purchaseAmount = InputView.readPurchaseAmount();

      const purchaseCount = LottoShop.calculateLottoCount(purchaseAmount);
      purchasedLottos = LottoShop.createLotto(purchaseCount);

      OutputView.printPurchaseCount(purchaseCount);
      OutputView.printPurchasedLottos(purchasedLottos);
      OutputView.printWinningNumberForm();

      document.getElementById('result').addEventListener('submit', handleResultSubmit);

      function handleResultSubmit(event) {
        event.preventDefault();

        const winningNumbers = InputView.readWinNumbers();
        const bonusNumber = InputView.readBonusNumber();

        const lottoCompany = new LottoCompany(winningNumbers, bonusNumber);
        const lottoRanks = lottoCompany.calculateLottoRanks(purchasedLottos);

        const totalPrize = lottoCompany.calculateTotalProfit(lottoRanks);
        const profitRate = calculateProfitRate(totalPrize, purchaseAmount);

        OutputView.printStatistics(lottoRanks, profitRate);
        OutputView.printRetryButton();
      }
    }
  }

  static reset() {
    const app = document.getElementById('app');
    app.innerHTML = '';
  }
}
