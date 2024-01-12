export const getRandomId: () => string = () => {
  return Math.random().toString(36).slice(-8);
};
