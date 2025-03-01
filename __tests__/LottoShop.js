import { Lotto, LottoShop } from '../src/domain/index.js';

describe('LottoShop', () => {
  describe('calculateLottoCount', () => {
    test('로또 개수를 반환한다.', () => {
      expect(LottoShop.calculateLottoCount(5000)).toBe(5);
    });
  });

  describe('createLotto', () => {
    test('인자만큼 로또를 생성한다.', () => {
      const lottos = LottoShop.createLotto(5);

      expect(lottos).toHaveLength(5);
    });

    test('로또 객체를 생성해 반환한다.', () => {
      const lottos = LottoShop.createLotto(5);

      lottos.forEach((lotto) => {
        expect(lotto instanceof Lotto).toBeTruthy();
      });
    });
  });
});
