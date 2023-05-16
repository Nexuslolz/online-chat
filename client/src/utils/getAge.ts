export const getAge = (date: string) => {
  return Math.floor((+new Date() - +new Date(date)) / (24 * 3600 * 365.25 * 1000));
};
