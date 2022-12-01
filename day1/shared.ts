export const readCalories = (input: string) => {
  const calories = input.split("\n\n").map((elf) => {
    return elf.split("\n").reduce((sum, str) => {
      return sum + Number(str);
    }, 0);
  });

  // sort descending
  calories.sort((a, b) => b - a);

  return calories;
};
