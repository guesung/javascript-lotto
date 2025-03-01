import { LottoCompany, LottoShop } from './domain/index.js';
import { calculateProfitRate } from './lib/utils.js';
import { WebInputView, WebOutputView } from './views/index.js';

export default class App2 {
  init() {
    WebOutputView.printContainer();
    WebOutputView.printPurchaseCountInput();

    let purchasedLottos;

    const handlePurchaseSubmit = (event) => {
      event.preventDefault();

      if (purchasedLottos) return;

      const purchaseAmount = WebInputView.readPurchaseAmount();

      const purchaseCount = LottoShop.calculateLottoCount(purchaseAmount);
      purchasedLottos = LottoShop.createLotto(purchaseCount);

      WebOutputView.printPurchaseCount(purchaseCount);
      WebOutputView.printPurchasedLottos(purchasedLottos);
      WebOutputView.printWinningNumberForm();

      const handleResultSubmit = (event) => {
        event.preventDefault();

        const winningNumbers = WebInputView.readWinNumbers();
        const bonusNumber = WebInputView.readBonusNumber();

        const lottoCompany = new LottoCompany(winningNumbers, bonusNumber);
        const lottoRanks = lottoCompany.calculateLottoRanks(purchasedLottos);

        const totalPrize = lottoCompany.calculateTotalProfit(lottoRanks);
        const profitRate = calculateProfitRate(totalPrize, purchaseAmount);

        WebOutputView.printStatistics(lottoRanks, profitRate);
        WebOutputView.printRetryButton();
      };

      document.getElementById('result').addEventListener('submit', handleResultSubmit);
    };

    document.getElementById('purchase').addEventListener('submit', handlePurchaseSubmit);
  }

  static reset() {
    const app = document.getElementById('app');
    app.innerHTML = '';
  }
}
