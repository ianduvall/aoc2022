const _input = await Deno.readTextFile("../inputs/day09.txt");

const Directions = {
  up: "U",
  down: "D",
  left: "L",
  right: "R",
} as const;

const moves = _input.split("\n").map((line) => {
  const move = line.split(" ");
  return [
    move[0] as typeof Directions[keyof typeof Directions],
    Number(move[1]),
  ] as const;
});
interface Point {
  x: number;
  y: number;
}
type StringifiedPoint = ReturnType<typeof stringifyPoint>;
const stringifyPoint = (point: Point) => `${point.x},${point.y}`;
const head: Point = { x: 0, y: 0 };
const tail: Point = { x: 0, y: 0 };
const tailPointsVisited = new Set<StringifiedPoint>();
const tailVisitedPoint = (point: Point) =>
  tailPointsVisited.add(stringifyPoint(point));
tailVisitedPoint(tail);

const moveHead = (direction: string, H: Point) => {
  switch (direction) {
    case Directions.up:
      H.y++;
      break;
    case Directions.right:
      H.x++;
      break;
    case Directions.down:
      H.y--;
      break;
    case Directions.left:
      H.x--;
      break;
  }
};
const moveTail = (direction: string, H: Point, T: Point) => {
  switch (direction) {
    case Directions.up:
      if (Math.abs(H.y - T.y) === 2) {
        T.y++;
        if (T.x < H.x) {
          // diagonal up right
          T.x++;
        } else if (T.x > H.x) {
          // diagonal up left
          T.x--;
        }
      }
      break;
    case Directions.right:
      if (Math.abs(H.x - T.x) === 2) {
        T.x++;
        if (T.y < H.y) {
          // diagonal up right
          T.y++;
        } else if (T.y > H.y) {
          // diagonal down right
          T.y--;
        }
      }
      break;
    case Directions.down:
      if (Math.abs(H.y - T.y) === 2) {
        T.y--;
        if (T.x < H.x) {
          // diagonal down right
          T.x++;
        } else if (T.x > H.x) {
          // diagonal down left
          T.x--;
        }
      }
      break;
    case Directions.left:
      if (Math.abs(H.x - T.x) === 2) {
        T.x--;
        if (T.y < H.y) {
          // diagonal up left
          T.y++;
        } else if (T.y > H.y) {
          // diagonal down left
          T.y--;
        }
      }
      break;
  }
};

moves.forEach(([direction, amount]) => {
  for (let i = 0; i < amount; i++) {
    moveHead(direction, head);
    moveTail(direction, head, tail);
    tailVisitedPoint(tail);
  }
});

const part1 = tailPointsVisited.size;
console.log(`Part 1: ${part1}`);

tailPointsVisited.clear();
const points = Array.from({ length: 10 }, (): Point => ({ x: 0, y: 0 }));
const Head = points[0];
const Tail = points.at(-1)!;
tailVisitedPoint(Tail);

const moveFollower = (H: Readonly<Point>, T: Point) => {
  if (Math.abs(H.x - T.x) === 2) {
    // horizontal
    if (T.x < H.x) {
      // right
      T.x++;
      if (T.y < H.y) {
        // diagonal up right
        T.y++;
      } else if (T.y > H.y) {
        // diagonal down right
        T.y--;
      }
    } else {
      // left
      T.x--;
      if (T.y < H.y) {
        // diagonal up left
        T.y++;
      } else if (T.y > H.y) {
        // diagonal down left
        T.y--;
      }
    }
  } else if (Math.abs(H.y - T.y) === 2) {
    // vertical
    if (T.y < H.y) {
      // up
      T.y++;
      if (T.x < H.x) {
        // diagonal up right
        T.x++;
      } else if (T.x > H.x) {
        // diagonal up left
        T.x--;
      }
    } else {
      // down
      T.y--;
      if (T.x < H.x) {
        // diagonal down right
        T.x++;
      } else if (T.x > H.x) {
        // diagonal down left
        T.x--;
      }
    }
  }
};

moves.forEach(([direction, amount]) => {
  for (let i = 0; i < amount; i++) {
    moveHead(direction, Head);
    for (let pointIndex = 1; pointIndex < points.length; pointIndex++) {
      const ahead = points[pointIndex - 1];
      const behind = points[pointIndex];
      moveFollower(ahead, behind);
    }
    tailVisitedPoint(Tail);
  }
});

const part2 = tailPointsVisited.size;
console.log(`Part 2: ${part2}`);
