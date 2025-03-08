import { LOTTO_RANK_INFO, OUTPUT_MESSAGE } from '../../lib/constants.js';
import { calculateMatchCount, formatMessage } from '../../lib/utils.js';

export default class OutputView {
  static printPurchasedLottos(purchasedLottos) {
    purchasedLottos.forEach((lotto) => this.#printf(lotto.numbers));
  }

  static printPurchaseCount(purchaseCount) {
    this.#printf(OUTPUT_MESSAGE.purchase, purchaseCount);
  }

  static printStatistics(lottoRankMap) {
    this.#printf(OUTPUT_MESSAGE.statics);
    this.#printf(OUTPUT_MESSAGE.staticSeperator);

    [...Object.keys(LOTTO_RANK_INFO)].reverse().forEach((rank) => {
      const bonusOutput = this.#getBonusOutput(LOTTO_RANK_INFO[rank].isBonusNumberRequired);
      const rankCount = lottoRankMap.get(rank) ?? 0;

      this.#printf(
        OUTPUT_MESSAGE.staticResult,
        LOTTO_RANK_INFO[rank].winNumber,
        bonusOutput,
        LOTTO_RANK_INFO[rank].prize.toLocaleString(),
        rankCount,
      );
    });
  }

  static #getBonusOutput(isBonusNumber) {
    return isBonusNumber ? OUTPUT_MESSAGE.staticBonus : '';
  }

  static printProfitRate(profitRate) {
    this.#printf(OUTPUT_MESSAGE.profiteRate, profitRate);
  }

  static printErrorMessage(error) {
    this.#printf(error.message);
  }

  static #printf(...args) {
    this.#print(formatMessage(...args));
  }

  static #print(message) {
    console.log(message);
  }
}
