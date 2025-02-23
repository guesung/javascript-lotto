import { getIntersectCount } from '../lib/utils.js';

export default class Lotto {
  #numbers;

  constructor(numbers) {
    this.#numbers = numbers.sort((a, b) => a - b);
  }

  calculateMatchWinning(winNumbers) {
    return getIntersectCount(this.#numbers, winNumbers);
  }

  includes(number) {
    return this.#numbers.includes(number);
  }

  get numbers() {
    return this.#numbers;
  }
}
