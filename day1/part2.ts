import { readCalories } from "./shared.ts";

const input = Deno.readTextFileSync("./day1/input.txt");

const calories = readCalories(input);

console.log(calories.slice(0, 3).reduce((sum, num) => sum + num, 0));
