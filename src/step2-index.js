import LottoShop from './domain/LottoShop.js';

const container = document.getElementById('container');

const handleSubmit = (e) => {
  e.preventDefault();

  const purchaseAmount = document.querySelector('input')?.value;

  const purchaseCount = LottoShop.calculateLottoCount(purchaseAmount);
  const purchasedLottos = LottoShop.createLotto(purchaseCount);

  const purchaseLottoCountBox = document.createElement('div');
  purchaseLottoCountBox.className = 'winning-count-box';
  purchaseLottoCountBox.innerText = `총 ${purchaseCount}개를 구매하였습니다.`;

  container.appendChild(purchaseLottoCountBox);

  const purchaseLottosBox = document.createElement('div');
  purchasedLottos.forEach((purchasedLotto) => {
    const purchasedLottoBox = document.createElement('div');
    purchasedLottoBox.innerText = purchasedLotto.numbers.join(', ');
    purchaseLottosBox.appendChild(purchasedLottoBox);
  });

  container.appendChild(purchaseLottosBox);

  const winningBox = document.createElement('div');
  const winningInfo = document.createElement('p');
  winningInfo.innerText = '지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.';

  winningBox.appendChild(winningInfo);

  const winningNumbersBox = document.createElement('div');
  const winningNumbersInfo = document.createElement('span');
  winningNumbersInfo.innerText = '당첨 번호';

  const winningNumbersInputBox = document.createElement('div');
  for (let i = 0; i < 6; i += 1) {
    const winningNumbersInput = document.createElement('input');
    winningNumbersInputBox.appendChild(winningNumbersInput);
  }

  winningNumbersBox.appendChild(winningNumbersInfo);
  winningNumbersBox.appendChild(winningNumbersInputBox);

  container.appendChild(winningBox);
  container.appendChild(winningNumbersBox);

  const bonusNumberBox = document.createElement('div');
  const bonusNumberInfo = document.createElement('span');
  bonusNumberInfo.innerText = '보너스 번호';

  const bonusNumberInputBox = document.createElement('input');

  bonusNumberBox.appendChild(bonusNumberInfo);
  bonusNumberBox.appendChild(bonusNumberInputBox);

  container.appendChild(bonusNumberBox);

  const resultButton = document.createElement('button');
  resultButton.innerHTML = '결과 확인하기';
  container.appendChild(resultButton);
};

const form = document.querySelector('form');
form.addEventListener('submit', handleSubmit);
