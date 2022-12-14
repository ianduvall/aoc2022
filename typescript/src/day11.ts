const _input = await Deno.readTextFile("../inputs/day11.txt");

interface Monkey {
  index: number;
  items: number[];
  operation: (input: number) => number;
  divisor: number;
  test: (input: number) => boolean;
  trueMonkey: number;
  falseMonkey: number;
}
const parseMonkey = (line: string, index: number): Monkey => {
  const [
    _name,
    itemsInput,
    operationInput,
    testInput,
    trueMonkeyInput,
    falseMonkeyInput,
  ] = line.split("\n");

  const items: Monkey["items"] = itemsInput.split(": ")[1].split(", ").map(
    (n) => Number(n),
  );
  const [left, operand, right] = operationInput.split("new = ")[1].split(" ");
  const operation: Monkey["operation"] = (input) => {
    let a: number;
    let b: number;
    if (left === "old") {
      a = input;
    } else {
      a = Number(left);
    }
    if (right === "old") {
      b = input;
    } else {
      b = Number(right);
    }
    switch (operand) {
      case "+":
        return a + b;
      case "-":
        return a - b;
      case "*":
        return a * b;
      case "/":
        return a / b;
      default:
        throw new Error("Unknown operand " + operand);
    }
  };
  const divisor = Number(testInput.split("divisible by ")[1]);
  const test: Monkey["test"] = (input: number) => input % divisor === 0;
  const trueMonkey: Monkey["trueMonkey"] = Number(
    trueMonkeyInput.split("throw to monkey ")[1],
  );
  const falseMonkey: Monkey["falseMonkey"] = Number(
    falseMonkeyInput.split("throw to monkey ")[1],
  );

  return {
    index,
    items,
    operation,
    divisor,
    test,
    trueMonkey,
    falseMonkey,
  };
};
const parseMonkeys = (input: string) => input.split("\n\n").map(parseMonkey);

const runRound = (
  monkeys: ReadonlyArray<Monkey>,
  runTurn: (monkey: Monkey) => void,
) => {
  monkeys.forEach((monkey) => {
    runTurn(monkey);
  });
};

let monkeys: ReadonlyArray<Monkey> = parseMonkeys(_input);
let counts = monkeys.map(() => 0);

const runTurnPart1 = (monkey: Monkey) => {
  counts[monkey.index] += monkey.items.length;
  const items = [...monkey.items];
  monkey.items = [];

  for (const item of items) {
    const worryLevel = Math.floor(monkey.operation(item) / 3);
    const throwTo = monkey.test(worryLevel)
      ? monkey.trueMonkey
      : monkey.falseMonkey;
    monkeys[throwTo].items.push(worryLevel);
  }
};

for (let round = 1, rounds = 20; round <= rounds; round++) {
  runRound(monkeys, runTurnPart1);
}

let sortedCounts = [...counts].sort((a, b) => b - a);
const part1 = sortedCounts[0] * sortedCounts[1];
console.log(`Part 1: ${part1}`);

monkeys = parseMonkeys(_input);
counts = monkeys.map(() => 0);

const commonDivisor = monkeys.reduce((acc, monkey) => {
  return acc * monkey.divisor;
}, 1);

const runTurnPart2 = (monkey: Monkey) => {
  counts[monkey.index] += monkey.items.length;
  const items = monkey.items;
  monkey.items = [];

  for (const item of items) {
    const worryLevel = monkey.operation(item) % commonDivisor;
    const throwTo = monkey.test(worryLevel)
      ? monkey.trueMonkey
      : monkey.falseMonkey;
    const monkeyToThrowTo = monkeys[throwTo];
    monkeyToThrowTo.items.push(worryLevel);
  }
};

for (let round = 1, rounds = 10_000; round <= rounds; round++) {
  runRound(monkeys, runTurnPart2);
}

sortedCounts = [...counts].sort((a, b) => b - a);
const part2 = sortedCounts[0] * sortedCounts[1];
console.log(`Part 2: ${part2}`);
