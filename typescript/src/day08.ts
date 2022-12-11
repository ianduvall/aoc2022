const _input = await Deno.readTextFile("../inputs/day08.txt");

const grid = _input.split("\n").map((line) =>
  line.split("").map((c) => Number(c))
);

const visiblePoints = new Set<`${number},${number}`>();

const isPointVisible = (x: number, y: number, max: number): boolean => {
  return grid[y][x] > max;
};
const countVisiblePoint = (x: number, y: number) => {
  if (!visiblePoints.has(`${x},${y}`)) {
    visiblePoints.add(`${x},${y}`);
  }
};

const countVisiblePointsFromWest = () => {
  for (let y = 0; y < grid.length; y++) {
    let max = -1;
    for (let x = 0; x < grid[y].length; x++) {
      const point = grid[y][x];
      if (isPointVisible(x, y, max)) {
        max = point;
        countVisiblePoint(x, y);
      }
    }
  }
};
const countVisiblePointsFromEast = () => {
  for (let y = 0; y < grid.length; y++) {
    let max = -1;
    for (let x = grid[y].length - 1; x > -1; x--) {
      const point = grid[y][x];
      if (isPointVisible(x, y, max)) {
        max = point;
        countVisiblePoint(x, y);
      }
    }
  }
};
const countVisiblePointsFromNorth = () => {
  for (let x = 0; x < grid[0].length; x++) {
    let max = -1;
    for (let y = 0; y < grid.length; y++) {
      const point = grid[y][x];
      if (isPointVisible(x, y, max)) {
        max = point;
        countVisiblePoint(x, y);
      }
    }
  }
};
const countVisiblePointsFromSouth = () => {
  for (let x = grid[0].length - 1; x > -1; x--) {
    let max = -1;
    for (let y = grid.length - 1; y > -1; y--) {
      const point = grid[y][x];
      if (isPointVisible(x, y, max)) {
        max = point;
        countVisiblePoint(x, y);
      }
    }
  }
};

countVisiblePointsFromWest();
countVisiblePointsFromEast();
countVisiblePointsFromNorth();
countVisiblePointsFromSouth();

const part1 = visiblePoints.size;
console.log(`Part 1: ${part1}`);

const countWestTreesVisible = (x: number, y: number): number => {
  const point = grid[y][x];
  let count = 0;
  for (let i = x - 1; i > -1; i--) {
    count++;
    if (grid[y][i] >= point) {
      break;
    }
  }
  return count;
};
const countEastTreesVisible = (x: number, y: number): number => {
  const point = grid[y][x];
  let count = 0;
  for (let i = x + 1; i < grid[y].length; i++) {
    count++;
    if (grid[y][i] >= point) {
      break;
    }
  }
  return count;
};
const countNorthTreesVisible = (x: number, y: number): number => {
  const point = grid[y][x];
  let count = 0;
  for (let i = y - 1; i > -1; i--) {
    count++;
    if (grid[i][x] >= point) {
      break;
    }
  }
  return count;
};
const countSouthTreesVisible = (x: number, y: number): number => {
  const point = grid[y][x];
  let count = 0;
  for (let i = y + 1; i < grid.length; i++) {
    count++;
    if (grid[i][x] >= point) {
      break;
    }
  }
  return count;
};

const multiplyArray = (arr: number[]) => arr.reduce((acc, cur) => acc * cur, 1);
const calcScenicScore = (x: number, y: number) => {
  const directionalScenicScores = [
    countNorthTreesVisible(x, y),
    countEastTreesVisible(x, y),
    countSouthTreesVisible(x, y),
    countWestTreesVisible(x, y),
  ];
  return multiplyArray(directionalScenicScores);
};
let maxScenicScore = 0;
for (let y = 0; y < grid.length; y++) {
  for (let x = 0; x < grid[y].length; x++) {
    const scenicScore = calcScenicScore(x, y);
    if (scenicScore > maxScenicScore) {
      maxScenicScore = scenicScore;
    }
  }
}

const part2 = maxScenicScore;
console.log(`Part 2: ${part2}`);
