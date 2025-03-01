import { appendContainer, createDivElement } from './dom/utils.js';
import { LottoCompany, LottoShop } from './domain/index.js';
import { LOTTO_RANK_INFO } from './lib/constants.js';
import { calculateMatchCount, calculateProfitRate } from './lib/utils.js';

let purchasedLottos;

const handlePurchaseSubmit = (event) => {
  event.preventDefault();

  if (purchasedLottos) return;

  const purchaseAmount = document.querySelector('input')?.value;

  const purchaseCount = LottoShop.calculateLottoCount(purchaseAmount);
  purchasedLottos = LottoShop.createLotto(purchaseCount);

  const lottoInfoContainer = createDivElement({ class: 'lotto-info-container' });
  appendContainer(lottoInfoContainer);

  lottoInfoContainer.innerHTML = `
  <section class='lotto-info'>
    <p>총 ${purchaseCount}개를 구매하였습니다.</p>
    <ul>
      ${purchasedLottos
        .map((purchasedLotto) => `<li class="ticket"><span>🎟️</span>${purchasedLotto.numbers.join(', ')}</li>`)
        .join('')}
    </ul>
  </section>
  <form id="result">
    <p>지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.</p>
    <div class="winning-box">
      <div class="winning-number-box">
        <label>당첨 번호</label>
        <div>
          <input class="winning-number" value="1" />
          <input class="winning-number" value="2" />
          <input class="winning-number" value="3" />
          <input class="winning-number" value="4" />
          <input class="winning-number" value="5" />
          <input class="winning-number" value="6" />
        </div>
      </div>
      <div class="bonus-number-box">
        <label>보너스 번호</label>
        <div>
          <input class="bonus-number" value="7" />
        </div>
      </div>
    </div>
    <button id="show-result">결과 확인하기</button>
  </form>
`;

  // ..

  const handleResultButtonClick = (event) => {
    event.preventDefault();

    const winningNumberInputs = document.querySelectorAll('.winning-number');
    const winningNumbers = [...winningNumberInputs].map((winningNumberInput) => Number(winningNumberInput.value));
    const bonusNumber = Number(document.querySelector('.bonus-number').value);

    const lottoCompany = new LottoCompany(winningNumbers, bonusNumber);
    const lottoRanks = lottoCompany.calculateLottoRanks(purchasedLottos);

    const totalPrize = lottoCompany.calculateTotalProfit(lottoRanks);
    const profitRate = calculateProfitRate(totalPrize, purchaseAmount);

    const winningStaticsModal = createDivElement({ class: 'modal' });
    winningStaticsModal.innerHTML = `
      <h2>🏆 당첨 통계 🏆</h2>
      <table>
        <tr>
          <td>일치 갯수</td>
          <td>당첨금</td>
          <td>당첨 갯수</td>
        </tr>
        ${[...Object.keys(LOTTO_RANK_INFO)]
          .reverse()
          .map((rank) => {
            const lottoRankInfo = LOTTO_RANK_INFO[rank];
            const rankCount = calculateMatchCount(lottoRanks, rank);
            return `
        <tr>
          <td>${lottoRankInfo.winNumber}개</td>
          <td>${lottoRankInfo.prize.toLocaleString()}</td>
          <td>${rankCount}개</td>
        </tr>
      `;
          })
          .join('')}
      </table>
      <p>당신의 총 수익률은 ${profitRate}%입니다.</p>
      <button id="retry">다시 시작하기</button>
    `;

    appendContainer(winningStaticsModal);
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
