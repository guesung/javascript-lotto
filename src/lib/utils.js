export const generateRandomNumber = (start, end) => Math.floor(Math.random() * (end + 1 - start)) + start;

export const generateUniqueRandomValue = (array, { start, end }) => {
  const randomNumber = generateRandomNumber(start, end);
  if (array.includes(randomNumber)) return generateUniqueRandomValue(array, { start, end });

  return randomNumber;
};

export const generateUniqueNumbers = ({ start, end }, length) =>
  new Array(length).fill(null).reduce((prev) => {
    const uniqueRandomValue = generateUniqueRandomValue(prev, { start, end });

    return [...prev, uniqueRandomValue];
  }, []);

export const calculateProfitRate = (profit, price) => Number(((profit / price) * 100).toFixed(1));

export const checkUniqueArray = (array) => array.length === new Set(array).size;

export const getIntersectCount = (array1, array2) => array1.filter((value) => array2.includes(value)).length;

export const retryUntilSuccess = async (callbackFunction, onError) => {
  try {
    return await callbackFunction();
  } catch (error) {
    onError?.(error);
    return retryUntilSuccess(callbackFunction, onError);
  }
};

export const calculateMatchCount = (array, number) => array.filter((item) => item === number).length;

export const formatMessage = (message, ...args) => {
  return args.reduce((prev, cur, index) => prev.replace(`{${index}}`, cur), message);
};
