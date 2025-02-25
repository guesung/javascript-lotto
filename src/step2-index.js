import { ID_MAP } from './dom/constants.js';
import { LottoCompany, LottoShop } from './domain/index.js';
import { calculateProfitRate } from './lib/utils.js';
import { WebInputView, WebOutputView } from './views/index.js';

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

  const handleResultButtonClick = (event) => {
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

  document.getElementById(ID_MAP.form.result).addEventListener('submit', handleResultButtonClick);
};

document.getElementById(ID_MAP.form.purchase).addEventListener('submit', handlePurchaseSubmit);
