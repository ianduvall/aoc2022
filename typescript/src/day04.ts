const input = await Deno.readTextFile("../inputs/day04.txt");

type Range = [number, number];
const parseRange = (range: string): Range => {
  const [min, max] = range.split("-").map(Number);
  return [min, max];
};

const rangePairs: [Range, Range][] = input.split("\n").map((line) => {
  const [left, right] = line.split(",");
  return [
    parseRange(left),
    parseRange(right),
  ];
});

const isRangeContaining = (a: Range, b: Range): boolean => {
  return a[0] <= b[0] && a[1] >= b[1];
};
const numContainingPairs = rangePairs.reduce<number>((acc, [a, b]) => {
  return acc + Number(isRangeContaining(a, b) || isRangeContaining(b, a));
}, 0);

const part1 = numContainingPairs;
console.log(`Part 1: ${part1}`);

const isRangeOverlapping = (a: Range, b: Range): boolean => {
  return a[0] <= b[0] && a[1] >= b[0] || b[0] <= a[0] && b[1] >= a[0];
};

const numOverlappingPairs = rangePairs.reduce<number>((acc, [a, b]) => {
  return acc + Number(isRangeOverlapping(a, b) || isRangeOverlapping(b, a));
}, 0);

const part2 = numOverlappingPairs;
console.log(`Part 2: ${part2}`);
