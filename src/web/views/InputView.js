import Validator from '../../helpers/Validator.js';

export default class InputView {
  static readPurchaseAmount() {
    const purchaseAmount = document.querySelector('.purchase__input--amount')?.valueAsNumber;

    Validator.validatePurchaseAmount(purchaseAmount);

    return purchaseAmount;
  }

  static readWinNumbers() {
    const winningNumberInputs = document.querySelectorAll('.winning__input--lotto-number');
    const winningNumbers = [...winningNumberInputs].map((winningNumberInput) => Number(winningNumberInput.value));

    Validator.validateWinNumbers(winningNumbers);

    return winningNumbers;
  }

  static readBonusNumber(winningNumbers) {
    const rawBonusNumber = document.querySelector('.winning__input--bonus-number')?.value;
    const bonusNumber = Number(rawBonusNumber);

    Validator.validateBonusNumber(bonusNumber, winningNumbers);

    return bonusNumber;
  }
}
