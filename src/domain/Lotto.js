import { getIntersectCount } from '../lib/utils.js';

export default class Lotto {
  #numbers;

  constructor(numbers) {
    this.#numbers = numbers.sort((a, b) => a - b);
  }

  calculateMatchWinning(winNumbers) {
    return getIntersectCount(this.#numbers, winNumbers);
  }

  includes(bonusNumber) {
    return this.#numbers.includes(bonusNumber);
  }

  get numbers() {
    return this.#numbers;
  }
}
