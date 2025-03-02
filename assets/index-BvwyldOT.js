var __typeError = (msg) => {
  throw TypeError(msg);
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);
var _numbers, _winNumbers, _bonusNumber, _LottoCompany_instances, getRank_fn, _LottoShop_static, createLottoNumber_fn, _Validator_static, checkPositiveInteger_fn, checkInLottoNumberRange_fn, _OutputView_static, setLayoutCSS_fn, getLottoRanksOutput_fn, render_fn, _purchasedLottos, _App_instances, attachSubmitEventListener_fn, attachClickEventListener_fn, attachKeyDownEventListener_fn, handlePurchaseFormSubmit_fn, handleWinningFormSubmit_fn;
(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
class MyModal extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
      <div class="modal">
        ${this.innerHTML}
      </div>
      <div class="overlay" />
    `;
  }
}
customElements.define("my-modal", MyModal);
const generateRandomNumber = (start, end) => Math.floor(Math.random() * (end + 1 - start)) + start;
const generateUniqueRandomValue = (array, { start, end }) => {
  const randomNumber = generateRandomNumber(start, end);
  if (array.includes(randomNumber)) return generateUniqueRandomValue(array, { start, end });
  return randomNumber;
};
const generateUniqueNumbers = ({ start, end }, length) => new Array(length).fill(null).reduce((prev) => {
  const uniqueRandomValue = generateUniqueRandomValue(prev, { start, end });
  return [...prev, uniqueRandomValue];
}, []);
const calculateProfitRate = (profit, price) => Number((profit / price * 100).toFixed(1));
const checkUniqueArray = (array) => array.length === new Set(array).size;
const getIntersectCount = (array1, array2) => array1.filter((value) => array2.includes(value)).length;
const calculateMatchCount = (array, number) => array.filter((item) => item === number).length;
class Lotto {
  constructor(numbers) {
    __privateAdd(this, _numbers);
    __privateSet(this, _numbers, numbers.sort((a, b) => a - b));
  }
  calculateMatchWinning(winNumbers) {
    return getIntersectCount(__privateGet(this, _numbers), winNumbers);
  }
  includes(number) {
    return __privateGet(this, _numbers).includes(number);
  }
  get numbers() {
    return __privateGet(this, _numbers);
  }
}
_numbers = new WeakMap();
const MIN_LOTTO_NUMBER = 1;
const MAX_LOTTO_NUMBER = 45;
const LOTTO_LENGTH = 6;
const BONUS_NUMBER_COUNT = 1;
const LOTTO_PRICE = 1e3;
const MAX_LOTTO_PURCHASE_AMOUNT = 1e9;
const SEPERATOR = ",";
const NO_WINNING = "당첨 없음";
const YES = "y";
const NO = "n";
const ERROR_MESSAGE_DEFAULT = "[ERROR]";
const ERROR_MESSAGES = {
  purchaseAmount: {
    positiveInteger: `${ERROR_MESSAGE_DEFAULT} 양의 정수를 입력해주세요.`,
    thousandUnit: `${ERROR_MESSAGE_DEFAULT} ${LOTTO_PRICE.toLocaleString()}단위로 입력해주세요.`,
    maxAmount: `${ERROR_MESSAGE_DEFAULT} 1회에 구매 가능한 최대 금액은 1억원입니다.`
  },
  winNumber: {
    unique: `${ERROR_MESSAGE_DEFAULT} 중복되지 않은 숫자로 입력해주세요.`,
    range: `${ERROR_MESSAGE_DEFAULT} ${LOTTO_LENGTH}개의 ${MIN_LOTTO_NUMBER}~${MAX_LOTTO_NUMBER} 사이의 정수로 입력해주세요.`
  },
  bonusNumber: {
    unique: `${ERROR_MESSAGE_DEFAULT} 당첨 번호와 중복되지 않게 입력해주세요.`,
    range: `${ERROR_MESSAGE_DEFAULT} ${BONUS_NUMBER_COUNT}개의 ${MIN_LOTTO_NUMBER}~${MAX_LOTTO_NUMBER} 사이의 정수로 입력해주세요.`
  },
  retry: {
    yesOrNo: `${ERROR_MESSAGE_DEFAULT} ${YES} 또는 ${NO}을 입력해주세요.`
  }
};
const INPUT_MESSAGES = {
  purchaseAmount: "구입금액을 입력해 주세요."
};
const LOTTO_RANK_INFO = {
  1: { winNumber: 6, isBonusNumberRequired: false, prize: 2e9 },
  2: { winNumber: 5, isBonusNumberRequired: true, prize: 3e7 },
  3: { winNumber: 5, isBonusNumberRequired: false, prize: 15e5 },
  4: { winNumber: 4, isBonusNumberRequired: false, prize: 5e4 },
  5: { winNumber: 3, isBonusNumberRequired: false, prize: 5e3 }
};
class LottoCompany {
  constructor(winNumbers, bonusNumber) {
    __privateAdd(this, _LottoCompany_instances);
    __privateAdd(this, _winNumbers);
    __privateAdd(this, _bonusNumber);
    __privateSet(this, _winNumbers, winNumbers);
    __privateSet(this, _bonusNumber, bonusNumber);
  }
  calculateLottoRanks(purchasedLottos) {
    return purchasedLottos.map((lotto) => {
      const winningLottoCount = lotto.calculateMatchWinning(__privateGet(this, _winNumbers));
      const isBonusNumberMatch = lotto.includes(__privateGet(this, _bonusNumber));
      return __privateMethod(this, _LottoCompany_instances, getRank_fn).call(this, winningLottoCount, isBonusNumberMatch);
    });
  }
  calculateTotalProfit(lottoRanks) {
    return lottoRanks.filter((lottoRank) => lottoRank !== NO_WINNING).reduce((total, rank) => total + LOTTO_RANK_INFO[rank].prize, 0);
  }
}
_winNumbers = new WeakMap();
_bonusNumber = new WeakMap();
_LottoCompany_instances = new WeakSet();
getRank_fn = function(winningLottoCount, isBonusNumberMatch) {
  const rank = Object.keys(LOTTO_RANK_INFO).find((currentRank) => {
    const lottoRankInfo = LOTTO_RANK_INFO[currentRank];
    return lottoRankInfo.winNumber === winningLottoCount && (lottoRankInfo.isBonusNumberRequired ? isBonusNumberMatch : true);
  });
  return rank ?? NO_WINNING;
};
const _LottoShop = class _LottoShop {
  static createLotto(purchaseAmount) {
    const purchaseCount = Math.floor(purchaseAmount / LOTTO_PRICE);
    return Array.from({ length: purchaseCount }, () => {
      var _a;
      return new Lotto(__privateMethod(_a = _LottoShop, _LottoShop_static, createLottoNumber_fn).call(_a));
    });
  }
};
_LottoShop_static = new WeakSet();
createLottoNumber_fn = function() {
  return generateUniqueNumbers({ start: MIN_LOTTO_NUMBER, end: MAX_LOTTO_NUMBER }, LOTTO_LENGTH);
};
__privateAdd(_LottoShop, _LottoShop_static);
let LottoShop = _LottoShop;
class Validator {
  static validatePurchaseAmount(purchaseAmount) {
    if (!__privateMethod(this, _Validator_static, checkPositiveInteger_fn).call(this, purchaseAmount)) {
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
    if (winNumbers.length !== 6 || winNumbers.some((number) => !__privateMethod(this, _Validator_static, checkInLottoNumberRange_fn).call(this, number) || !__privateMethod(this, _Validator_static, checkPositiveInteger_fn).call(this, number))) {
      throw new Error(ERROR_MESSAGES.winNumber.range);
    }
    if (!checkUniqueArray(winNumbers)) {
      throw new Error(ERROR_MESSAGES.winNumber.unique);
    }
  }
  static validateBonusNumber(bonusNumber, winNumbers) {
    if (!__privateMethod(this, _Validator_static, checkPositiveInteger_fn).call(this, bonusNumber) || !__privateMethod(this, _Validator_static, checkInLottoNumberRange_fn).call(this, bonusNumber)) {
      throw new Error(ERROR_MESSAGES.bonusNumber.range);
    }
    if (winNumbers.includes(bonusNumber)) {
      throw new Error(ERROR_MESSAGES.bonusNumber.unique);
    }
  }
  static validateRetry(retryCommand) {
    if (retryCommand !== YES && retryCommand !== NO) {
      throw new Error(ERROR_MESSAGES.retry.yesOrNo);
    }
  }
}
_Validator_static = new WeakSet();
checkPositiveInteger_fn = function(value) {
  return !Number.isNaN(value) && value > 0 && Number.isInteger(value);
};
checkInLottoNumberRange_fn = function(value) {
  return value >= MIN_LOTTO_NUMBER && value <= MAX_LOTTO_NUMBER;
};
__privateAdd(Validator, _Validator_static);
class InputView {
  static readPurchaseAmount() {
    var _a;
    const purchaseAmount = (_a = document.querySelector(".purchase__input--amount")) == null ? void 0 : _a.valueAsNumber;
    Validator.validatePurchaseAmount(purchaseAmount);
    return purchaseAmount;
  }
  static readWinNumbers() {
    const winningNumberInputs = document.querySelectorAll(".winning__input--lotto-number");
    const winningNumbers = [...winningNumberInputs].map((winningNumberInput) => Number(winningNumberInput.value));
    Validator.validateWinNumbers(winningNumbers);
    return winningNumbers;
  }
  static readBonusNumber(winningNumbers) {
    var _a;
    const rawBonusNumber = (_a = document.querySelector(".winning__input--bonus-number")) == null ? void 0 : _a.value;
    const bonusNumber = Number(rawBonusNumber);
    Validator.validateBonusNumber(bonusNumber, winningNumbers);
    return bonusNumber;
  }
}
const createDivElement = (attributes) => {
  const divElement = document.createElement("div");
  if (attributes)
    Object.entries(attributes).forEach(([attributeKey, attributeValue]) => {
      divElement.setAttribute(attributeKey, attributeValue);
    });
  return divElement;
};
const _OutputView = class _OutputView {
  static renderLayout() {
    __privateMethod(this, _OutputView_static, render_fn).call(this, `<header class="lotto-title">🎱 행운의 로또</header>
        <main id="container" class="lotto-body"></main>
        <footer class="lotto-primary">Copyright 2023. woowacourse</footer>
      `, null, "app");
    __privateMethod(this, _OutputView_static, setLayoutCSS_fn).call(this);
  }
  static disablePurchaseForm() {
    const purchaseSubmitButton = document.querySelector(".purchase__button-submit");
    purchaseSubmitButton.disabled = true;
    const purchaseInput = document.querySelector(".purchase__input--amount");
    purchaseInput.disabled = true;
  }
  static renderPurchaseSection() {
    __privateMethod(this, _OutputView_static, render_fn).call(this, `<section class="purchase">
        <h2 class="lotto-title">🎱내 번호 당첨 번호 확인🎱</h2>
        <form class="purchase__form">
          <label for="purchase__amount">${INPUT_MESSAGES.purchaseAmount}</label>
          <div>
            <input type="number" placeholder="금액" value="5000" id="purchase__amount" class="purchase__input--amount"  />
            <button class="purchase__button-submit">구입</button>
          </div>
        </form>
      </section>
      `);
  }
  static renderPurchasedSection(purchasedLottos) {
    __privateMethod(this, _OutputView_static, render_fn).call(this, `<section class="purchased">
        <p>총 ${purchasedLottos.length}개를 구매하였습니다.</p>
        <ul class="purchased__list">
          ${purchasedLottos.map(
      (purchasedLotto) => `<li class="purchased__item"><span class="purchased__ticket">🎟️</span>${purchasedLotto.numbers.join(
        `${SEPERATOR} `
      )}</li>`
    ).join("")}
        </ul>
      </section>
    `);
  }
  static renderWinningNumberSection() {
    __privateMethod(this, _OutputView_static, render_fn).call(this, `<section class="winning">
        <form class="winning__form">
          <p>지난 주 당첨번호 ${LOTTO_LENGTH}개와 보너스 번호 ${BONUS_NUMBER_COUNT}개를 입력해주세요.</p>
          <div class="winning__box">
            <div class="winning__box-numbers">
              <label>당첨 번호</label>
              <div>
                ${new Array(LOTTO_LENGTH).fill(null).map(
      (_, index) => `<input class="winning__input--lotto-number" value="${index + 1}" maxlength="2" min="1" max="45" />`
    ).join("")}
              </div>
            </div>
            <div class="winning__box-bonus-number">
              <label>보너스 번호</label>
              <input class="winning__input--bonus-number" value="7" />
            </div>
          </div>
          <button class="winning__button-submit">결과 확인하기</button>
        </form>
      </section>
    `);
  }
  static renderStatisticModal(lottoRanks, profitRate) {
    var _a;
    __privateMethod(this, _OutputView_static, render_fn).call(this, `<my-modal>
        <span class="result__close" aria-label="닫기">X</span>
        <h2 class="lotto-subtitle result__title">🏆 당첨 통계 🏆</h2>
        <table aria-label="로또 당첨 통계">
          <tr class="result__table--title">
            <th>일치 갯수</th>
            <th>당첨금</th>
            <th>당첨 갯수</th>
          </tr>
          ${__privateMethod(_a = _OutputView, _OutputView_static, getLottoRanksOutput_fn).call(_a, lottoRanks)}
        </table>
        <p class="result__profile-rate">당신의 총 수익률은 ${profitRate}%입니다.</p>
        <button class="result__button--retry">다시 시작하기</button>
      </my-modal>
    `, null, "app");
  }
  static removeModal() {
    var _a;
    (_a = document.querySelector("#app").querySelector("my-modal")) == null ? void 0 : _a.remove();
  }
  static resetApp() {
    document.querySelector("#app").innerHTML = "";
    const app2 = new App();
    app2.init();
  }
};
_OutputView_static = new WeakSet();
setLayoutCSS_fn = function() {
  const headerHeight = document.querySelector("header").offsetHeight;
  document.documentElement.style.setProperty("--header-height", headerHeight + "px");
  const footerHeight = document.querySelector("footer").offsetHeight;
  document.documentElement.style.setProperty("--footer-height", footerHeight + "px");
};
getLottoRanksOutput_fn = function(lottoRanks) {
  return [...Object.keys(LOTTO_RANK_INFO)].reverse().map((rank) => {
    const lottoRankInfo = LOTTO_RANK_INFO[rank];
    const rankCount = calculateMatchCount(lottoRanks, rank);
    return `
          <tr>
            <td>${lottoRankInfo.winNumber}개</td>
            <td>${lottoRankInfo.prize.toLocaleString()}</td>
            <td>${rankCount}개</td>
          </tr>
        `;
  }).join("");
};
render_fn = function(innerHTML, attributes, containerId = "container") {
  const container = document.getElementById(containerId);
  if (attributes) {
    const element = createDivElement(attributes);
    element.insertAdjacentHTML("beforeend", innerHTML);
    container.appendChild(element);
    return;
  }
  container.insertAdjacentHTML("beforeend", innerHTML);
};
__privateAdd(_OutputView, _OutputView_static);
let OutputView = _OutputView;
class App {
  constructor() {
    __privateAdd(this, _App_instances);
    __privateAdd(this, _purchasedLottos);
  }
  init() {
    OutputView.renderLayout();
    OutputView.renderPurchaseSection();
  }
  attachEventListener() {
    __privateMethod(this, _App_instances, attachSubmitEventListener_fn).call(this);
    __privateMethod(this, _App_instances, attachClickEventListener_fn).call(this);
    __privateMethod(this, _App_instances, attachKeyDownEventListener_fn).call(this);
  }
}
_purchasedLottos = new WeakMap();
_App_instances = new WeakSet();
attachSubmitEventListener_fn = function() {
  window.addEventListener("submit", (submitEvent) => {
    submitEvent.preventDefault();
    try {
      if (submitEvent.target.classList.contains("purchase__form")) __privateMethod(this, _App_instances, handlePurchaseFormSubmit_fn).call(this);
      if (submitEvent.target.classList.contains("winning__form")) __privateMethod(this, _App_instances, handleWinningFormSubmit_fn).call(this);
    } catch (error) {
      window.alert(error.message);
    }
  });
};
attachClickEventListener_fn = function() {
  window.addEventListener("click", (clickEvent) => {
    if (clickEvent.target.classList.contains("result__button--retry")) OutputView.resetApp();
    if (clickEvent.target.classList.contains("result__close")) OutputView.removeModal();
    if (!clickEvent.target.closest(".modal")) OutputView.removeModal();
  });
};
attachKeyDownEventListener_fn = function() {
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") OutputView.removeModal();
  });
};
handlePurchaseFormSubmit_fn = function() {
  const purchaseAmount = InputView.readPurchaseAmount();
  OutputView.disablePurchaseForm();
  __privateSet(this, _purchasedLottos, LottoShop.createLotto(purchaseAmount));
  OutputView.renderPurchasedSection(__privateGet(this, _purchasedLottos));
  OutputView.renderWinningNumberSection();
};
handleWinningFormSubmit_fn = function() {
  const winningNumbers = InputView.readWinNumbers();
  const bonusNumber = InputView.readBonusNumber(winningNumbers);
  const lottoCompany = new LottoCompany(winningNumbers, bonusNumber);
  const lottoRanks = lottoCompany.calculateLottoRanks(__privateGet(this, _purchasedLottos));
  const totalPrize = lottoCompany.calculateTotalProfit(lottoRanks);
  const profitRate = calculateProfitRate(totalPrize, __privateGet(this, _purchasedLottos).length * LOTTO_PRICE);
  OutputView.renderStatisticModal(lottoRanks, profitRate);
};
const app = new App();
app.init();
app.attachEventListener();
