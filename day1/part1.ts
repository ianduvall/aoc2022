import { readCalories } from "./shared.ts";

const input = Deno.readTextFileSync("./day1/input.txt");

const calories = readCalories(input);

console.log(calories[0]);
