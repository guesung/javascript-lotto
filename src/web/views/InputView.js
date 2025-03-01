import Validator from '../../helpers/Validator.js';

export default class InputView {
  static readPurchaseAmount() {
    try {
      const rawPurchaseAmount = document.querySelector('.purchase__input--amount')?.value;
      const purchaseAmount = Number(rawPurchaseAmount);

      Validator.validatePurchaseAmount(purchaseAmount);

      return purchaseAmount;
    } catch (error) {
      window.alert(error.message);
    }
  }

  static readWinNumbers() {
    try {
      const winningNumberInputs = document.querySelectorAll('.winning__input--lotto-number');
      const winningNumbers = [...winningNumberInputs].map((winningNumberInput) => Number(winningNumberInput.value));

      Validator.validateWinNumbers(winningNumbers);

      return winningNumbers;
    } catch (error) {
      window.alert(error.message);
    }
  }

  static readBonusNumber(winningNumbers) {
    try {
      const rawBonusNumber = document.querySelector('.winning__input--bonus-number')?.value;
      const bonusNumber = Number(rawBonusNumber);

      Validator.validateBonusNumber(bonusNumber, winningNumbers);

      return bonusNumber;
    } catch (error) {
      window.alert(error.message);
    }
  }
}
