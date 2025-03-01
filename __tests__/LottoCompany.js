import { Lotto, LottoCompany, LottoShop } from '../src/domain/index.js';
import { NO_WINNING } from '../src/lib/constants.js';

describe('LottoCompany', () => {
  let lottoCompany;
  beforeEach(() => {
    lottoCompany = new LottoCompany([1, 2, 3, 4, 5, 6], 7);
  });

  describe('calculateLottoRanks', () => {
    test('등수를 계산해 반환한다.', () => {
      expect(
        lottoCompany.calculateLottoRanks([
          new Lotto([1, 2, 3, 4, 5, 6]), // 1등
          new Lotto([1, 2, 3, 4, 5, 7]), // 2등
          new Lotto([1, 2, 3, 4, 5, 8]), // 3등
          new Lotto([1, 2, 3, 4, 8, 9]), // 4등
          new Lotto([1, 2, 3, 8, 9, 10]), // 5등
          new Lotto([1, 2, 8, 9, 10, 11]), // 당첨 없음
          new Lotto([1, 2, 8, 9, 10, 11]), // 당첨 없음
          new Lotto([1, 2, 8, 9, 10, 11]), // 당첨 없음
        ]),
      ).toEqual(['1', '2', '3', '4', '5', NO_WINNING, NO_WINNING, NO_WINNING]);
    });
  });

  describe('calculateTotalProfit', () => {
    test('전체 수익을 계산해 반환한다.', () => {
      expect(lottoCompany.calculateTotalProfit([1])).toBe(2_000_000_000);
      expect(lottoCompany.calculateTotalProfit([1, 2, 3, 4, 5])).toBe(2031555000);
    });
  });
});
