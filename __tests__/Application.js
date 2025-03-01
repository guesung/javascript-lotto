import App from '../src/App.js';
import * as utils from '../src/lib/utils.js';

const mockReadLineAsync = (mockValues) => {
  mockValues.forEach((mockValue) => jest.spyOn(utils, 'readLineAsync').mockResolvedValueOnce(mockValue));
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
    jest.resetAllMocks();
  });

  test('정상적인 경우의 출력을 테스트한다.', async () => {
    mockReadLineAsync(['5000', '1,2,3,4,5,6', '7', 'n']);
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
});
