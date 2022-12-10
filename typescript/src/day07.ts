import { sumArray } from "./shared.ts";
const _input = await Deno.readTextFile("../inputs/day07.txt");

interface File {
  type: "file";
  name: string;
  size: number;
}
interface Dir {
  type: "dir";
  name: string;
  children: (Dir | File)[];
  parent: Dir | null;
}

const lines = _input.split("\n");
const rootDir: Dir = { type: "dir", name: "~", children: [], parent: null };
rootDir.children.push({
  type: "dir",
  name: "/",
  children: [],
  parent: rootDir,
});
let currentDir: Dir = rootDir;

lines.forEach((line) => {
  if (line.startsWith("$ ls")) {
    return;
  } else if (line.startsWith("$ cd ..")) {
    currentDir = currentDir.parent!;
    return;
  } else if (line.startsWith("$ cd")) {
    const dirName = line.split(" ")[2];
    const nextDir = currentDir.children.find((child) =>
      child.type === "dir" && child.name === dirName
    ) as Dir;
    currentDir = nextDir;
    return;
  } else if (line.startsWith("dir ")) {
    const dirName = line.split(" ")[1];
    currentDir.children.push({
      type: "dir",
      name: dirName,
      children: [],
      parent: currentDir,
    });
    return;
  }
  const [size, name] = line.split(" ");
  currentDir.children.push({ type: "file", name, size: Number(size) });
});

const dirSizes: number[] = [];
const getDirSizes = (dir: Dir): number => {
  const dirSize = dir.children.reduce((acc, child) => {
    if (child.type === "file") {
      return acc + child.size;
    }

    return acc + getDirSizes(child);
  }, 0);
  dirSizes.push(dirSize);
  return dirSize;
};
const rootDirSize = getDirSizes(rootDir);

const part1 = sumArray(dirSizes.filter((size) => size <= 100000));
console.log(`Part 1: ${part1}`);

const diskSpace = 70000000;
const unusedSpaceNeeded = 30000000;
const unusedDiskSpace = diskSpace - rootDirSize;
const diskSpaceToDelete = unusedSpaceNeeded - unusedDiskSpace;

const part2 = dirSizes.reduce((smallestDirSizeToDelete, dirSize) => {
  if (dirSize > diskSpaceToDelete && dirSize < smallestDirSizeToDelete) {
    return dirSize;
  }
  return smallestDirSizeToDelete;
}, Infinity);
console.log(`Part 2: ${part2}`);
