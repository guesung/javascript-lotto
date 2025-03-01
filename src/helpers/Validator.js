import {
  ERROR_MESSAGES,
  LOTTO_PRICE,
  MAX_LOTTO_NUMBER,
  MAX_LOTTO_PURCHASE_AMOUNT,
  MIN_LOTTO_NUMBER,
  NO,
  YES,
} from '../lib/constants.js';
import { checkUniqueArray } from '../lib/utils.js';

export default class Validator {
  static validatePurchaseAmount(purchaseAmount) {
    if (!this.#checkPositiveInteger(purchaseAmount)) {
      throw new Error(ERROR_MESSAGES.purchaseAmount.positiveInteger);
    }

    if (purchaseAmount % LOTTO_PRICE !== 0) {
      throw new Error(ERROR_MESSAGES.purchaseAmount.thousandUnit);
    }

    if (purchaseAmount > MAX_LOTTO_PURCHASE_AMOUNT) {
      throw new Error(ERROR_MESSAGES.purchaseAmount.maxAmount);
    }
  }

  static validateWinNumbers(winNumbers) {
    if (
      winNumbers.length !== 6 ||
      winNumbers.some((number) => !this.#checkInLottoNumberRange(number) || !this.#checkPositiveInteger(number))
    ) {
      throw new Error(ERROR_MESSAGES.winNumber.range);
    }

    if (!checkUniqueArray(winNumbers)) {
      throw new Error(ERROR_MESSAGES.winNumber.unique);
    }
  }

  static validateBonusNumber(bonusNumber, winNumbers) {
    if (!this.#checkPositiveInteger(bonusNumber) || !this.#checkInLottoNumberRange(bonusNumber)) {
      throw new Error(ERROR_MESSAGES.bonusNumber.range);
    }

    if (winNumbers.includes(bonusNumber)) {
      throw new Error(ERROR_MESSAGES.bonusNumber.unique);
    }
  }

  static #checkPositiveInteger(value) {
    return !Number.isNaN(value) && value > 0 && Number.isInteger(value);
  }

  static #checkInLottoNumberRange(value) {
    return value >= MIN_LOTTO_NUMBER && value <= MAX_LOTTO_NUMBER;
  }

  static validateRetry(retryCommand) {
    if (retryCommand !== YES && retryCommand !== NO) {
      throw new Error(ERROR_MESSAGES.retry.yesOrNo);
    }
  }
}
