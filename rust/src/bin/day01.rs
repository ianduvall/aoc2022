fn main() {
    let input = std::fs::read_to_string("../inputs/day01.txt").expect("Failed to read input file");

    let elves = input.split("\n\n");

    let mut calories = elves
        .map(|elf| {
            return elf
                .split("\n")
                .map(|line| line.parse::<u32>().expect("Failed to parse line"))
                .sum::<u32>();
        })
        .collect::<Vec<u32>>();

    let max = calories.iter().max().expect("Failed to find max");

    println!("Part 1: {:?}", max);

    calories.sort_by(|a, b| b.cmp(a));
    let top3 = calories.iter().take(3).sum::<u32>();

    println!("Part 2: {:?}", top3);
}
