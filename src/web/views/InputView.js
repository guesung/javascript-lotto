export default class InputView {
  static readPurchaseAmount() {
    const purchaseAmountForm = document.querySelector('.purchase__form');
    const purchaseAmountInput = purchaseAmountForm?.querySelector('input');

    return purchaseAmountInput?.value;
  }

  static readWinNumbers() {
    const winningNumberInputs = document.querySelectorAll('.winning__input--number');

    return [...winningNumberInputs].map((winningNumberInput) => Number(winningNumberInput.value));
  }

  static readBonusNumber() {
    return Number(document.querySelector('.winning__input--bonus-number').value);
  }
}
