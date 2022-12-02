const readCalories = () => {
  const input = Deno.readTextFileSync("../inputs/day01.txt");

  const calories = input.split("\n\n").map((elf) => {
    return elf.split("\n").reduce((sum, str) => {
      return sum + Number(str);
    }, 0);
  });

  return calories;
};

const calories = readCalories();

// sort descending
calories.sort((a, b) => b - a);

const max = calories[0];
console.log(`Part 1: ${max}`);

const top3 = calories.slice(0, 3).reduce((sum, num) => sum + num, 0);
console.log(
  `Part 2: ${top3}`,
);
