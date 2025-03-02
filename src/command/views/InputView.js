import Validator from '../../helpers/Validator.js';
import readline from 'readline';

import { INPUT_MESSAGES, SEPERATOR, YES } from '../../lib/constants.js';

export default class InputView {
  static async readPurchaseAmount() {
    const rawPurchaseAmount = await InputView.readLineAsync(INPUT_MESSAGES.purchaseAmount);
    const purchaseAmount = Number(rawPurchaseAmount);

    Validator.validatePurchaseAmount(purchaseAmount);

    return purchaseAmount;
  }

  static async readWinNumbers() {
    const rawWinNumber = await InputView.readLineAsync(INPUT_MESSAGES.winNumber);
    const winNumbers = rawWinNumber.split(SEPERATOR).map(Number);

    Validator.validateWinNumbers(winNumbers);

    return winNumbers;
  }

  static async readBonusNumber(winNumbers) {
    const rawBonusNumber = await InputView.readLineAsync(INPUT_MESSAGES.bonusNumber);
    const bonusNumber = Number(rawBonusNumber);

    Validator.validateBonusNumber(bonusNumber, winNumbers);

    return bonusNumber;
  }

  static async readRetry() {
    const retryCommand = await InputView.readLineAsync(INPUT_MESSAGES.retry);

    Validator.validateRetry(retryCommand);

    return retryCommand === YES;
  }

  static async readLineAsync(query) {
    return new Promise((resolve, reject) => {
      if (typeof query !== 'string') {
        reject(new Error('query must be string'));
      }

      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });

      rl.question(query, (input) => {
        rl.close();
        resolve(input);
      });
    });
  }
}
