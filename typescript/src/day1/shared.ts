export const readCalories = () => {
  const input = Deno.readTextFileSync("inputs/day1.txt");

  const calories = input.split("\n\n").map((elf) => {
    return elf.split("\n").reduce((sum, str) => {
      return sum + Number(str);
    }, 0);
  });

  // sort descending
  calories.sort((a, b) => b - a);

  return calories;
};
