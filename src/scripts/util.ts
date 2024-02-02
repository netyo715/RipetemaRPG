export const getRandomId = (): string => {
  return Math.random().toString(36).slice(-8);
};

export const getRandomValue = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

export const sum = (numbers: number[]): number => {
  return numbers.reduce((pv, cv) => pv + cv, 0);
};
