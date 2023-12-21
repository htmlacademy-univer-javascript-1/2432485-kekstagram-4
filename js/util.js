const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getUniqNumber = (min, max, array) => {
  let currentValue = getRandomInteger(min, max);
  if (array.length >= (max - min + 1)) {
    return null;
  }
  while (array.includes(currentValue)) {
    currentValue = getRandomInteger(min, max);
  }
  array.push(currentValue);
  return currentValue;
};

const pressEscape = (evt) => evt.key === 'Escape';

export {getUniqNumber};
export {getRandomInteger};
export {pressEscape};

