import { LOTTO_RANK_INFO, NO_WINNING } from '../lib/constants.js';

export default class LottoCompany {
  #winNumbers;
  #bonusNumber;

  constructor(winNumbers, bonusNumber) {
    this.#winNumbers = winNumbers;
    this.#bonusNumber = bonusNumber;
  }

  calculateLottoRanks(purchasedLottos) {
    return purchasedLottos
      .map((lotto) => {
        const winningLottoCount = lotto.calculateMatchWinning(this.#winNumbers);
        const isBonusNumberMatch = lotto.includes(this.#bonusNumber);
        return this.#getRank(winningLottoCount, isBonusNumberMatch);
      })
      .reduce((prev, cur) => {
        prev.set(cur, (prev.get(cur) || 0) + 1);
        return prev;
      }, new Map());
  }

  #getRank(winningLottoCount, isBonusNumberMatch) {
    const rank = Object.keys(LOTTO_RANK_INFO).find((currentRank) => {
      const lottoRankInfo = LOTTO_RANK_INFO[currentRank];
      return (
        lottoRankInfo.winNumber === winningLottoCount &&
        (lottoRankInfo.isBonusNumberRequired ? isBonusNumberMatch : true)
      );
    });
    return rank ?? NO_WINNING;
  }

  calculateTotalProfit(lottoRankMap) {
    console.log([...lottoRankMap]);
    return [...lottoRankMap]
      .filter(([rank]) => rank !== NO_WINNING)
      .reduce((total, [rank, count]) => total + count * LOTTO_RANK_INFO[rank]?.prize, 0);
  }
}
