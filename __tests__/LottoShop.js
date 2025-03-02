import { Lotto, LottoShop } from '../src/domain/index.js';

describe('LottoShop', () => {
  describe('createLotto', () => {
    context('로또 구매 금액이 주어졌을 때', () => {
      it('로또 구매 금액에 따라 로또 개수만큼 로또를 생성한다.', () => {
        const lottos = LottoShop.createLotto(5_000);

        expect(lottos).toHaveLength(5);
      });
    });

    it('로또 객체를 담은 배열을 반환한다.', () => {
      const lottos = LottoShop.createLotto(5);

      lottos.forEach((lotto) => {
        expect(lotto instanceof Lotto).toBeTruthy();
      });
    });
  });
});
