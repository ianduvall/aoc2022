const _input = await Deno.readTextFile("../inputs/day06.txt");

const findMarkerPosition = (input: string, markerLength: number) => {
  let markerPosition = Infinity;
  for (let i = 0, end = input.length - markerLength; i < end; i++) {
    const markerSet = new Set(input.slice(i, i + markerLength));
    if (markerSet.size === markerLength) {
      markerPosition = i;
      break;
    }
  }
  return markerPosition;
};

const startOfPacketMarkerLength = 4;
const part1 = findMarkerPosition(_input, startOfPacketMarkerLength) +
  startOfPacketMarkerLength;
console.log(`Part 1: ${part1}`);

const startOfMessageMarkerLength = 14;
const part2 = findMarkerPosition(_input, startOfMessageMarkerLength) +
  startOfMessageMarkerLength;
console.log(`Part 2: ${part2}`);
