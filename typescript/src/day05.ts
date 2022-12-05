const input = await Deno.readTextFile("../inputs/day05.txt");

type Char = string;
type Stacks = Char[][];
interface Procedure {
  // The number of crates to move.
  crates: number;
  // The stack to move crates from.
  from: number;
  // The stack to move crates to.
  to: number;
}

const [stacksString, proceduresString] = input.split("\n\n");

const stacksLines = stacksString.split("\n");

const numStacks = Math.ceil(stacksLines.pop()!.length / 4);

const initialStacks: Stacks = stacksLines.reduce(
  (stacks, line) => {
    for (
      let stackIndex = 0, end = numStacks;
      stackIndex < end;
      stackIndex++
    ) {
      const charIndex = stackIndex * 4 + 1;
      const char: Char = line[charIndex];
      if (char !== " ") {
        stacks[stackIndex].unshift(char);
      }
    }
    return stacks;
  },
  new Array(
    numStacks,
  ).fill(null).map(() => []) as Stacks,
);

const procedures: Procedure[] = proceduresString.split("\n").map(
  (line) => {
    const splitLine = line.split(" ");
    return {
      crates: Number(splitLine[1]),
      from: Number(splitLine[3]) - 1,
      to: Number(splitLine[5]) - 1,
    };
  },
);

const getTopCrates = (stacks: Stacks): string =>
  stacks.reduce((topCratesString, stack) => {
    return topCratesString + stack[stack.length - 1];
  }, "");

const runProcedurePart1 = (stacks: Stacks, procedure: Procedure) => {
  const { crates, from, to } = procedure;
  for (let i = 0; i < crates; i++) {
    const char = stacks[from].pop();
    if (!char) {
      return;
    }
    stacks[to].push(char);
  }
};

const stacksPart1 = structuredClone(initialStacks);
procedures.forEach((procedure) => runProcedurePart1(stacksPart1, procedure));

const part1 = getTopCrates(stacksPart1);
console.log(`Part 1: ${part1}`);

const runProcedurePart2 = (stacks: Stacks, procedure: Procedure) => {
  const { crates, from, to } = procedure;
  const cratesMoving = stacks[from].splice(-crates, crates);
  stacks[to].push(...cratesMoving);
};

const stacksPart2 = structuredClone(initialStacks);
procedures.forEach((procedure) => runProcedurePart2(stacksPart2, procedure));

const part2 = getTopCrates(stacksPart2);
console.log(`Part 2: ${part2}`);
