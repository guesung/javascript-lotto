import App from '../src/App.js';
import * as utils from '../src/lib/utils.js';

function mockInput() {
  jest
    .spyOn(utils, 'readLineAsync')
    .mockResolvedValueOnce('5000')
    .mockResolvedValueOnce('1,2,3,4,5,6')
    .mockResolvedValueOnce('7')
    .mockResolvedValueOnce('n');
}

const DEFAULT_MOCK_RANDOM_VALUE = [
  [1, 2, 3, 4, 5, 6],
  [1, 2, 3, 4, 5, 11],
  [1, 2, 3, 4, 11, 12],
  [1, 2, 3, 11, 12, 13],
  [1, 2, 11, 12, 13, 14],
];

const mockRandomValue = (mockValue = DEFAULT_MOCK_RANDOM_VALUE) => {
  mockValue.forEach((randomValue) => jest.spyOn(utils, 'generateUniqueNumbers').mockReturnValueOnce(randomValue));
};

describe('Application', () => {
  test('정상적인 경우의 출력을 테스트한다.', async () => {
    const consoleLogSpy = jest.spyOn(console, 'log');

    mockInput();
    mockRandomValue();

    const app = new App();
    await app.run();

    expect(consoleLogSpy).toHaveBeenCalledWith('5개를 구매했습니다.');
    expect(consoleLogSpy).toHaveBeenCalledWith([1, 2, 3, 4, 5, 6]);
    expect(consoleLogSpy).toHaveBeenCalledWith([1, 2, 3, 4, 5, 11]);
    expect(consoleLogSpy).toHaveBeenCalledWith([1, 2, 3, 4, 11, 12]);
    expect(consoleLogSpy).toHaveBeenCalledWith([1, 2, 3, 11, 12, 13]);
    expect(consoleLogSpy).toHaveBeenCalledWith([1, 2, 11, 12, 13, 14]);
    expect(consoleLogSpy).toHaveBeenCalledWith('3개 일치 (5,000원) - 1개');
    expect(consoleLogSpy).toHaveBeenCalledWith('4개 일치 (50,000원) - 1개');
    expect(consoleLogSpy).toHaveBeenCalledWith('5개 일치 (1,500,000원) - 1개');
    expect(consoleLogSpy).toHaveBeenCalledWith('5개 일치, 보너스 볼 일치 (30,000,000원) - 0개');
    expect(consoleLogSpy).toHaveBeenCalledWith('6개 일치 (2,000,000,000원) - 1개');
    expect(consoleLogSpy).toHaveBeenCalledWith('총 수익률은 40031100%입니다.');
  });
});
