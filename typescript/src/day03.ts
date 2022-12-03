import { sumArray } from "./shared.ts";

const input = await Deno.readTextFile("../inputs/day03.txt");

const rucksacks = input.split("\n");

const getCharPriority = (char: string): number => {
  const charCode = char.charCodeAt(0);
  if (charCode > 96) {
    // Lowercase item types a through z have priorities 1 through 26
    return charCode - 97 + 1;
  }
  // Uppercase item types A through Z have priorities 27 through 52
  return charCode - 65 + 27;
};

const priorities = rucksacks.map<number>((rucksack) => {
  const rightStartIndex = Math.floor(rucksack.length / 2);

  const leftChars = new Set<string>(
    rucksack.slice(0, rightStartIndex).split(""),
  );

  for (const char of rucksack.slice(rightStartIndex)) {
    if (leftChars.has(char)) {
      return getCharPriority(char);
    }
  }

  throw new Error("Common char not found");
});

const part1 = sumArray(priorities);
console.log(`Part 1: ${part1}`);

type Group = [string, string, string];

const groups: Group[] = [];
for (let i = 0; i < rucksacks.length; i += 3) {
  const group: Group = [rucksacks[i], rucksacks[i + 1], rucksacks[i + 2]];
  groups.push(group);
}

const prioritiesPart2 = groups.map<number>(([one, two, three]) => {
  const set1 = new Set<string>(one.split(""));
  const set2 = new Set<string>(two.split(""));

  for (const char of three) {
    if (set1.has(char) && set2.has(char)) {
      return getCharPriority(char);
    }
  }
  throw new Error("Common char not found");
});

const part2 = sumArray(prioritiesPart2);
console.log(`Part 2: ${part2}`);
