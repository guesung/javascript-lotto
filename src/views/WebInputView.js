export default class WebInputView {
  static readPurchaseAmount() {
    return document.querySelector('.price')?.value;
  }

  static readWinNumbers() {
    const winningNumberInputs = document.querySelectorAll('.winning-number');

    return [...winningNumberInputs].map((winningNumberInput) => Number(winningNumberInput.value));
  }

  static readBonusNumber() {
    return Number(document.querySelector('.bonus-number').value);
  }
}
