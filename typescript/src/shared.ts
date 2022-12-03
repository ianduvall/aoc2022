export const sumArray = (arr: ReadonlyArray<number>): number =>
  arr.reduce((sum, num) => sum + num, 0);
