import Lotto from '../src/domain/Lotto.js';

describe('Lotto', () => {
  test('로또는 6개의 숫자로 이뤄진 배열이다.', () => {
    const lottoNumbers = [1, 2, 3, 4, 5, 6];
    const lotto = new Lotto(lottoNumbers);

    expect(lotto.numbers).toEqual(lottoNumbers);
  });

  describe('calculateMatchWinning', () => {
    test('당첨된 로또 개수를 구한다.', () => {
      const lottoNumbers = [1, 2, 3, 4, 5, 6];
      const lotto = new Lotto(lottoNumbers);

      const matchingWinning = lotto.calculateMatchWinning([1, 2, 3, 4, 5, 7]);
      expect(matchingWinning).toBe(5);
    });
  });

  describe('includes', () => {
    test('해당하는 번호가 로또에 존재하는지 구한다.', () => {
      const lottoNumbers = [1, 2, 3, 4, 5, 6];
      const lotto = new Lotto(lottoNumbers);

      expect(lotto.includes(5)).toBeTruthy();
      expect(lotto.includes(7)).toBeFalsy();
    });
  });
});
