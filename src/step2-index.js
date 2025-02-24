import LottoShop from './domain/LottoShop.js';

const container = document.getElementById('container');

const handleSubmit = (e) => {
  e.preventDefault();

  const purchaseAmount = document.querySelector('input')?.value;

  const purchaseCount = LottoShop.calculateLottoCount(purchaseAmount);
  const purchasedLottos = LottoShop.createLotto(purchaseCount);

  const purchaseLottoCountBox = document.createElement('div');

  container.innerHTML = `
    <section>
      <p>총 ${purchaseCount}개를 구매하였습니다.</p>
      <ul>
        ${purchasedLottos.map((purchasedLotto) => `<li>${purchasedLotto.numbers.join(', ')}</li>`).join('')}
      </ul>
    </section>
    <form>
      <p>지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.</p>
      <div>
        <span>당첨 번호</span>
        <input/>
        <input/>
        <input/>
        <input/>
        <input/>
        <input/>
      </div>
      <div>
        <span>보너스 번호</span>
        <input/>
      </div>
      <button>결과 확인하기</button>
    </form>
  `;
};

const form = document.querySelector('form');
form.addEventListener('submit', handleSubmit);
