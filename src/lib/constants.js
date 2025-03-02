export const MIN_LOTTO_NUMBER = 1;
export const MAX_LOTTO_NUMBER = 45;
export const LOTTO_LENGTH = 6;
export const BONUS_NUMBER_COUNT = 1;
export const LOTTO_PRICE = 1_000;
export const MAX_LOTTO_PURCHASE_AMOUNT = 1_000_000_000;
export const SEPERATOR = ',';
export const NO_WINNING = '당첨 없음';
export const YES = 'y';
export const NO = 'n';

const ERROR_MESSAGE_DEFAULT = '[ERROR]';
export const ERROR_MESSAGES = {
  purchaseAmount: {
    positiveInteger: `${ERROR_MESSAGE_DEFAULT} 양의 정수를 입력해주세요.`,
    thousandUnit: `${ERROR_MESSAGE_DEFAULT} ${LOTTO_PRICE.toLocaleString()}단위로 입력해주세요.`,
    maxAmount: `${ERROR_MESSAGE_DEFAULT} 1회에 구매 가능한 최대 금액은 1억원입니다.`,
  },
  winNumber: {
    unique: `${ERROR_MESSAGE_DEFAULT} 중복되지 않은 숫자로 입력해주세요.`,
    range: `${ERROR_MESSAGE_DEFAULT} ${LOTTO_LENGTH}개의 ${MIN_LOTTO_NUMBER}~${MAX_LOTTO_NUMBER} 사이의 정수로 입력해주세요.`,
  },
  bonusNumber: {
    unique: `${ERROR_MESSAGE_DEFAULT} 당첨 번호와 중복되지 않게 입력해주세요.`,
    range: `${ERROR_MESSAGE_DEFAULT} ${BONUS_NUMBER_COUNT}개의 ${MIN_LOTTO_NUMBER}~${MAX_LOTTO_NUMBER} 사이의 정수로 입력해주세요.`,
  },
  retry: {
    yesOrNo: `${ERROR_MESSAGE_DEFAULT} ${YES} 또는 ${NO}을 입력해주세요.`,
  },
};

export const INPUT_MESSAGES = {
  purchaseAmount: '구입금액을 입력해 주세요.',
  winNumber: '당첨 번호를 입력해 주세요.',
  bonusNumber: '보너스 번호를 입력해 주세요.',
  retry: `다시 시작하시겠습니까? (${YES}/${NO})`,
};

export const OUTPUT_MESSAGE = {
  purchase: '{0}개를 구매했습니다.',
  statics: '당첨 통계',
  staticSeperator: '------------',
  staticResult: `{0}개 일치{1} ({2}원) - {3}개`,
  staticBonus: ', 보너스 볼 일치',
  profiteRate: '총 수익률은 {0}%입니다.',
};

export const LOTTO_RANK_INFO = {
  1: { winNumber: 6, isBonusNumberRequired: false, prize: 2_000_000_000 },
  2: { winNumber: 5, isBonusNumberRequired: true, prize: 30_000_000 },
  3: { winNumber: 5, isBonusNumberRequired: false, prize: 1_500_000 },
  4: { winNumber: 4, isBonusNumberRequired: false, prize: 50_000 },
  5: { winNumber: 3, isBonusNumberRequired: false, prize: 5_000 },
};
