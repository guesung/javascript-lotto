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

function mockRandomValue() {
  jest
    .spyOn(utils, 'generateUniqueNumbers')
    .mockReturnValueOnce([1, 2, 3, 4, 5, 6])
    .mockReturnValueOnce([1, 2, 3, 4, 5, 6])
    .mockReturnValueOnce([1, 2, 3, 4, 5, 6])
    .mockReturnValueOnce([1, 2, 3, 4, 5, 6])
    .mockReturnValueOnce([1, 2, 3, 4, 5, 6]);
}

describe('Application', () => {
  test('정상 실행', async () => {
    const spy = jest.spyOn(console, 'log');

    mockInput();
    mockRandomValue();

    const app = new App();
    await app.run();

    console.log(expect(spy).toHaveBeenCalledWith('5개를 구매했습니다.'));
  });
});
