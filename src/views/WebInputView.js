import { ID_MAP } from '../dom/constants.js';

export default class WebInputView {
  static readPurchaseAmount() {
    const purchaseAmountForm = document.getElementById(ID_MAP.form.purchase);
    const purchaseAmountInput = purchaseAmountForm?.querySelector('input');

    return purchaseAmountInput?.value;
  }

  static readWinNumbers() {
    const winningNumberInputs = document.querySelectorAll('.winning-number');

    return [...winningNumberInputs].map((winningNumberInput) => Number(winningNumberInput.value));
  }

  static readBonusNumber() {
    return Number(document.querySelector('.bonus-number').value);
  }
}
