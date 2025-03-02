import App from '../src/command/App.js';
import InputView from '../src/command/views/InputView.js';
import { ERROR_MESSAGES, NO, YES } from '../src/lib/constants';
import * as utils from '../src/lib/utils.js';

const mockReadLineAsync = (mockValues) => {
  mockValues.forEach((mockValue) => jest.spyOn(InputView, 'readLineAsync').mockResolvedValueOnce(mockValue));
};

const mockGenerateUniqueNumbers = (mockValues) => {
  mockValues.forEach((mockValue) => jest.spyOn(utils, 'generateUniqueNumbers').mockReturnValueOnce(mockValue));
};

describe('Application', () => {
  let consoleLogSpy;
  beforeEach(() => {
    consoleLogSpy = jest.spyOn(console, 'log');
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('기능 요구사항 테스트', () => {
    it('정상적인 경우의 출력을 테스트한다.', async () => {
      mockReadLineAsync(['5000', '1,2,3,4,5,6', '7', NO]);
      mockGenerateUniqueNumbers([
        [1, 2, 3, 4, 5, 6],
        [1, 2, 3, 4, 5, 11],
        [1, 2, 3, 4, 11, 12],
        [1, 2, 3, 11, 12, 13],
        [1, 2, 11, 12, 13, 14],
      ]);

      const app = new App();
      await app.run();

      [
        '5개를 구매했습니다.',
        [1, 2, 3, 4, 5, 6],
        [1, 2, 3, 4, 5, 11],
        [1, 2, 3, 4, 11, 12],
        [1, 2, 3, 11, 12, 13],
        [1, 2, 11, 12, 13, 14],
        '3개 일치 (5,000원) - 1개',
        '4개 일치 (50,000원) - 1개',
        '5개 일치 (1,500,000원) - 1개',
        '5개 일치, 보너스 볼 일치 (30,000,000원) - 0개',
        '6개 일치 (2,000,000,000원) - 1개',
        '총 수익률은 40031100%입니다.',
      ].forEach((expectedConsoleLogMessage) => {
        expect(consoleLogSpy).toHaveBeenCalledWith(expectedConsoleLogMessage);
      });
    });

    it('로또 구입 금액을 입력하면 구입 금액에 해당하는 만큼 로또를 발행해야 한다.', async () => {
      mockReadLineAsync(['1000', '1,2,3,4,5,6', '7', NO]);

      const app = new App();
      await app.run();

      ['1개를 구매했습니다.'].forEach((expectedConsoleLogMessage) => {
        expect(consoleLogSpy).toHaveBeenCalledWith(expectedConsoleLogMessage);
      });
    });

    it('로또 번호는 오름차순으로 정렬하여 보여준다.', async () => {
      mockReadLineAsync(['1000', '1,2,3,4,5,6', '7', NO]);
      mockGenerateUniqueNumbers([[3, 2, 5, 4, 1, 6]]);

      const app = new App();
      await app.run();

      [[1, 2, 3, 4, 5, 6]].forEach((expectedConsoleLogMessage) => {
        expect(consoleLogSpy).toHaveBeenCalledWith(expectedConsoleLogMessage);
      });
    });

    it('재시작시 게임을 다시 시작한다.', async () => {
      mockReadLineAsync(['1000', '1,2,3,4,5,6', '7', YES, '1000', '1,2,3,4,5,6', '7', NO]);
      mockGenerateUniqueNumbers([
        [1, 2, 3, 4, 5, 7],
        [1, 2, 3, 4, 5, 8],
      ]);

      const app = new App();
      await app.run();

      [
        [1, 2, 3, 4, 5, 7],
        [1, 2, 3, 4, 5, 8],
      ].forEach((expectedConsoleLogMessage) => {
        expect(consoleLogSpy).toHaveBeenCalledWith(expectedConsoleLogMessage);
      });
    });
  });

  describe('예외 사항 처리', () => {
    describe('구입금액', () => {
      it('구입 금액은 양의 정수여야한다.', async () => {
        mockReadLineAsync(['0', '1000', '1,2,3,4,5,6', '7', NO]);
        mockGenerateUniqueNumbers([[3, 2, 5, 4, 1, 6]]);

        const app = new App();
        await app.run();

        [ERROR_MESSAGES.purchaseAmount.positiveInteger].forEach((expectedConsoleLogMessage) => {
          expect(consoleLogSpy).toHaveBeenCalledWith(expectedConsoleLogMessage);
        });
      });
      it('구입 금액은 1000으로 나누어 떨어져야한다.', async () => {
        mockReadLineAsync(['10', '1000', '1,2,3,4,5,6', '7', NO]);
        mockGenerateUniqueNumbers([[3, 2, 5, 4, 1, 6]]);

        const app = new App();
        await app.run();

        [ERROR_MESSAGES.purchaseAmount.thousandUnit].forEach((expectedConsoleLogMessage) => {
          expect(consoleLogSpy).toHaveBeenCalledWith(expectedConsoleLogMessage);
        });
      });
    });

    describe('당첨 번호', () => {
      it('당첨 번호는 중복되지 않은 숫자여야한다.', async () => {
        mockReadLineAsync(['1000', '1,2,3,4,5,5', '1,2,3,4,5,6', '7', NO]);
        mockGenerateUniqueNumbers([[3, 2, 5, 4, 1, 6]]);

        const app = new App();
        await app.run();

        [ERROR_MESSAGES.winNumber.unique].forEach((expectedConsoleLogMessage) => {
          expect(consoleLogSpy).toHaveBeenCalledWith(expectedConsoleLogMessage);
        });
      });
      test.each(['1,2,3,4,5,6,7', '1,2,3,4,5', '1,2,3,4,5,46', '0,1,2,3,4,5'])(
        '당첨 번호은 6개의 1-45 사이의 정수여야한다.',
        async (value) => {
          mockReadLineAsync(['1000', value, '1,2,3,4,5,6', '7', NO]);
          mockGenerateUniqueNumbers([[3, 2, 5, 4, 1, 6]]);

          const app = new App();
          await app.run();

          [ERROR_MESSAGES.winNumber.range].forEach((expectedConsoleLogMessage) => {
            expect(consoleLogSpy).toHaveBeenCalledWith(expectedConsoleLogMessage);
          });
        },
      );
    });

    describe('보너스 번호', () => {
      it('보너스 번호는 당첨 번호와 중복되면 안된다.', async () => {
        mockReadLineAsync(['1000', '1,2,3,4,5,6', '6', '7', NO]);
        mockGenerateUniqueNumbers([[3, 2, 5, 4, 1, 6]]);

        const app = new App();
        await app.run();

        [ERROR_MESSAGES.bonusNumber.unique].forEach((expectedConsoleLogMessage) => {
          expect(consoleLogSpy).toHaveBeenCalledWith(expectedConsoleLogMessage);
        });
      });
      test.each(['0', '46', 'a', '1,2'])('보너스 번호는 1개의 1-45 사이의 정수여야한다.', async (value) => {
        mockReadLineAsync(['1000', '1,2,3,4,5,6', value, '7', NO]);
        mockGenerateUniqueNumbers([[3, 2, 5, 4, 1, 6]]);

        const app = new App();
        await app.run();

        [ERROR_MESSAGES.bonusNumber.range].forEach((expectedConsoleLogMessage) => {
          expect(consoleLogSpy).toHaveBeenCalledWith(expectedConsoleLogMessage);
        });
      });
    });

    describe('재시작 여부', () => {
      test.each(['Y', 'N', 'Of Course! Why Not?'])(`재시작 여부는 ${YES} 또는 ${NO}이어야한다.`, async (value) => {
        mockReadLineAsync(['1000', '1,2,3,4,5,6', '7', value, NO]);
        mockGenerateUniqueNumbers([[3, 2, 5, 4, 1, 6]]);

        const app = new App();
        await app.run();

        [ERROR_MESSAGES.retry.yesOrNo].forEach((expectedConsoleLogMessage) => {
          expect(consoleLogSpy).toHaveBeenCalledWith(expectedConsoleLogMessage);
        });
      });
    });
  });
});
