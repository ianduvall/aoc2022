import { readCalories } from "./shared.ts";

const calories = readCalories();

console.log(calories.slice(0, 3).reduce((sum, num) => sum + num, 0));
