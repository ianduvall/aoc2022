import { sumArray } from "./shared.ts";
const _input = await Deno.readTextFile("../inputs/day10.txt");

type Instruction = { op: "addx"; x: number } | { op: "noop" };
const instructions: Instruction[] = _input.split("\n").map((line) => {
  const [op, arg] = line.split(" ");
  if (op === "addx") {
    return { op, x: Number(arg) };
  }
  return { op: "noop" };
});

const part1Solution = () => {
  const cyclesToTrack = [
    { cycle: 20, signalStrength: 0 },
    { cycle: 60, signalStrength: 0 },
    { cycle: 100, signalStrength: 0 },
    { cycle: 140, signalStrength: 0 },
    { cycle: 180, signalStrength: 0 },
    { cycle: 220, signalStrength: 0 },
  ];
  let cycle = 1;
  let X = 1;

  const incrementCycle = () => {
    cyclesToTrack.forEach((cycleToTrack) => {
      if (cycleToTrack.cycle === cycle) {
        cycleToTrack.signalStrength = X * cycle;
      }
    });

    ++cycle;
  };

  const noop = () => {
    incrementCycle();
  };

  const addX = (x: number) => {
    incrementCycle();
    incrementCycle();
    X += x;
  };

  for (const instruction of instructions) {
    if (instruction.op === "noop") {
      noop();
    } else {
      addX(instruction.x);
    }
  }
  return sumArray(
    cyclesToTrack.map((cycleToTrack) => cycleToTrack.signalStrength),
  );
};

const part1 = part1Solution();
console.log(`Part 1: ${part1}`);

const part2Solution = () => {
  const screen: ("." | "#")[] = [];
  let cycle = 1;
  let X = 1;

  const paint = () => {
    const isPixelOn = [X - 1, X, X + 1].some((x) => x === (cycle % 40 - 1));
    screen.push(isPixelOn ? "#" : ".");
  };

  const incrementCycle = () => {
    paint();
    ++cycle;
  };

  const noop = () => {
    incrementCycle();
  };

  const addX = (x: number) => {
    incrementCycle();
    incrementCycle();
    X += x;
  };

  for (const instruction of instructions) {
    if (instruction.op === "noop") {
      noop();
    } else {
      addX(instruction.x);
    }
  }

  let result = "";
  for (let i = 0; i < screen.length; i += 40) {
    result += screen.slice(i, i + 40).join("") + "\n";
  }
  return result;
};

const part2 = part2Solution();
console.log(`Part 2: \n${part2}`);
