import { LottoCompany, LottoShop } from '../domain/index.js';
import { calculateProfitRate, retryUntilSuccess } from '../lib/utils.js';
import { InputView, OutputView } from './views/index.js';

export default class App {
  async run() {
    const purchaseAmount = await this.#retryReadUntilSuccess(InputView.readPurchaseAmount);
    const purchasedLottos = LottoShop.createLotto(purchaseAmount);
    OutputView.printPurchaseCount(purchasedLottos.length);

    OutputView.printPurchasedLottos(purchasedLottos);

    const winNumbers = await this.#retryReadUntilSuccess(InputView.readWinNumbers);
    const bonusNumber = await this.#retryReadUntilSuccess(() => InputView.readBonusNumber(winNumbers));

    const lottoCompany = new LottoCompany(winNumbers, bonusNumber);
    const lottoRankMap = lottoCompany.calculateLottoRanks(purchasedLottos);

    const totalPrize = lottoCompany.calculateTotalProfit(lottoRankMap);
    const profitRate = calculateProfitRate(totalPrize, purchaseAmount);

    OutputView.printStatistics(lottoRankMap);
    OutputView.printProfitRate(profitRate);

    const isRetry = await this.#retryReadUntilSuccess(InputView.readRetry);
    if (isRetry) await this.run();
  }

  #retryReadUntilSuccess(callbackFunction) {
    return retryUntilSuccess(callbackFunction, (error) => OutputView.printErrorMessage(error));
  }
}
