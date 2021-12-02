import { readFileSync } from "fs";

function numberOfIncreases(i: Iterable<number>): number {
  const iter = i[Symbol.iterator]();
  let a = iter.next();
  let b = iter.next();
  let count = 0;

  while (!b.done) {
    if (a.value < b.value) {
      count += 1;
    }
    a = b;
    b = iter.next();
  }

  return count;
}

console.log(
  numberOfIncreases([199, 200, 208, 210, 200, 207, 240, 269, 260, 263]),
  "should be 7"
);

const input = readFileSync("./src/day1.input.txt", "utf8")
  .split("\n")
  .map((n) => parseInt(n));

console.log(numberOfIncreases(input));
