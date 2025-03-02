import Lotto from '../src/domain/Lotto.js';

describe('Lotto', () => {
  context('로또 객체를 생성했을 때', () => {
    it('로또 번호를 프로퍼티로 저장한다.', () => {
      const lottoNumbers = [1, 2, 3, 4, 5, 6];
      const lotto = new Lotto(lottoNumbers);

      expect(lotto.numbers).toEqual(lottoNumbers);
    });
  });

  describe('calculateMatchWinning', () => {
    context('당첨 번호를 전달하면', () => {
      it('당첨된 로또 번호의 개수를 구한다.', () => {
        const lottoNumbers = [1, 2, 3, 4, 5, 6];
        const lotto = new Lotto(lottoNumbers);

        const matchingWinning = lotto.calculateMatchWinning([1, 2, 3, 4, 5, 7]);
        expect(matchingWinning).toBe(5);
      });
    });
  });

  describe('includes', () => {
    context('로또 번호가 주어졌을 때', () => {
      it('해당하는 번호가 로또에 존재하는지 구한다.', () => {
        const lottoNumbers = [1, 2, 3, 4, 5, 6];
        const lotto = new Lotto(lottoNumbers);

        expect(lotto.includes(5)).toBeTruthy();
        expect(lotto.includes(7)).toBeFalsy();
      });
    });
  });
});
