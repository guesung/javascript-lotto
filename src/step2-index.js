import { appendContainer, createDivElement } from './dom/utils.js';
import { LottoCompany, LottoShop } from './domain/index.js';
import { LOTTO_RANK_INFO } from './lib/constants.js';
import { calculateMatchCount, calculateProfitRate } from './lib/utils.js';
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

    WebOutputView.printStatistics(lottoRanks);

    const modalOverlay = createDivElement({ class: 'modal-overlay' });
    appendContainer(modalOverlay);

    const retryButton = document.getElementById('retry');

    const handleRetryButtonClick = () => {
      const inputs = document.querySelectorAll('input');
      inputs.forEach((input) => {
        {
          input.value = '';
        }
      });
      container.removeChild(winningStaticsModal);
      container.removeChild(modalOverlay);
    };

    retryButton.addEventListener('click', handleRetryButtonClick);
  };

  document.getElementById('result').addEventListener('submit', handleResultButtonClick);
};

document.getElementById('purchase').addEventListener('submit', handlePurchaseSubmit);
