const input = await Deno.readTextFile("../inputs/day02.txt");

const leftCode = {
  rock: "A",
  paper: "B",
  scissors: "C",
} as const;
const rightCode = {
  rock: "X",
  paper: "Y",
  scissors: "Z",
} as const;

type Game = [
  typeof leftCode[keyof typeof leftCode],
  typeof rightCode[keyof typeof rightCode],
];

const games = input.split("\n").map((line) => line.split(" ") as Game);

const choiceScore = {
  [rightCode.rock]: 1,
  [rightCode.paper]: 2,
  [rightCode.scissors]: 3,
} as const;

const gameResultScore = {
  lose: 0,
  draw: 3,
  win: 6,
};

const playGame = (
  [left, right]: Game,
): keyof typeof gameResultScore => {
  if (left === leftCode.rock) {
    if (right === rightCode.paper) return "win";
    if (right === rightCode.scissors) return "lose";
  } else if (left === leftCode.paper) {
    if (right === rightCode.scissors) return "win";
    if (right === rightCode.rock) return "lose";
  } else {
    if (right === rightCode.rock) return "win";
    if (right === rightCode.paper) return "lose";
  }
  return "draw";
};

const scoreGamePart1 = (game: Game) =>
  choiceScore[game[1]] + gameResultScore[playGame(game)];

const part1 = games.reduce((sum, game) => sum + scoreGamePart1(game), 0);
console.log(`Part 1: ${part1}`);

const gameResultToCode = {
  lose: "X",
  draw: "Y",
  win: "Z",
} as const;
const codeToGameResult = {
  X: "lose",
  Y: "draw",
  Z: "win",
} as const;

const determineChoice = ([left, right]: Game) => {
  if (right === gameResultToCode.draw) {
    if (left === leftCode.rock) return rightCode.rock;
    if (left === leftCode.paper) return rightCode.paper;
    return rightCode.scissors;
  } else if (right === gameResultToCode.lose) {
    if (left === leftCode.rock) return rightCode.scissors;
    if (left === leftCode.paper) return rightCode.rock;
    return rightCode.paper;
  } else if (right === gameResultToCode.win) {
    if (left === leftCode.rock) return rightCode.paper;
    if (left === leftCode.paper) return rightCode.scissors;
    return rightCode.rock;
  }
  throw new Error("Invalid game result code");
};
const scoreGamePart2 = (game: Game) => {
  const choice = determineChoice(game);
  return choiceScore[choice] + gameResultScore[codeToGameResult[game[1]]];
};

const part2 = games.reduce((sum, game) => sum + scoreGamePart2(game), 0);
console.log(
  `Part 2: ${part2}`,
);
