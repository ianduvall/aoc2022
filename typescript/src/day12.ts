const _input = await Deno.readTextFile("../inputs/day12.txt");

interface Point {
  dir: null | "left" | "right" | "up" | "down";
  x: number;
  y: number;
}
type Visited = Set<ReturnType<typeof stringifyPoint>>;

const findStartAndEnd = () => {
  const start: Point = { dir: null, x: 0, y: 0 };
  const end: Point = { dir: null, x: 0, y: 0 };

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (grid[y][x] === "S") {
        start.x = x;
        start.y = y;
        grid[y][x] = "a";
      }
      if (grid[y][x] === "E") {
        end.x = x;
        end.y = y;
        grid[y][x] = "z";
      }
    }
  }
  return [start, end] as const;
};

const grid = _input.split("\n").map((line) => line.split(""));
const width = grid[0].length;
const height = grid.length;
const [start, end] = findStartAndEnd();

const stringifyPoint = (p: Point) => `${p.x},${p.y}` as const;
const hasAlreadyVisited = (visited: Set<string>, p: Point) =>
  visited.has(`${p.x},${p.y}`);
const isInbounds = (p: Point) =>
  p.x > -1 && p.x < width && p.y > -1 && p.y < height;
const getCharCode = (p: Point) => grid[p.y][p.x].charCodeAt(0);
const canClimbTo = (from: Point, to: Point): boolean => {
  const currentChar = getCharCode(from);
  const nextChar = getCharCode(to);
  return currentChar - 1 <= nextChar;
};
const arePointsEqual = (a: Point, b: Point) => a.x === b.x && a.y === b.y;
const getNeighbors = (p: Point, visited: Visited): Point[] => {
  const neighbors: Point[] = [
    { dir: "left", x: p.x - 1, y: p.y },
    { dir: "right", x: p.x + 1, y: p.y },
    { dir: "up", x: p.x, y: p.y - 1 },
    { dir: "down", x: p.x, y: p.y + 1 },
  ];
  return neighbors.filter((neighbor) =>
    isInbounds(neighbor) && canClimbTo(p, neighbor) &&
    !hasAlreadyVisited(visited, neighbor)
  );
};

const reverseBreadthFirstSearch = (
  reachedGoal: (p: Point) => boolean,
): number => {
  // bfs
  // starting from end, search for start
  const queue: [Point, number][] = [[end, 1]];
  const visited: Visited = new Set([stringifyPoint(end)]);

  while (queue.length) {
    const [point, steps] = queue.shift()!;

    const neighbors = getNeighbors(point, visited);
    for (const neighbor of neighbors) {
      if (reachedGoal(neighbor)) {
        return steps;
      }
      queue.push([neighbor, steps + 1]);
      visited.add(stringifyPoint(neighbor));
    }
  }

  throw new Error("No path found");
};

const part1 = reverseBreadthFirstSearch((p: Point) => arePointsEqual(p, start));
console.log(`Part 1: ${part1}`);

const part2 = reverseBreadthFirstSearch((p: Point) =>
  getCharCode(p) === "a".charCodeAt(0)
);
console.log(`Part 2: ${part2}`);
