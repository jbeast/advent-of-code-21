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

function recursiveNumberOfIncreases(i: Iterable<number>): number {
  const iterate = (arr: Array<number>, count: number): number => {
    if (arr.length < 2) {
      return count;
    } else {
      if (arr[0] < arr[1]) count++;
      return iterate(arr.slice(1), count);
    }
  };

  return iterate(Array.from(i), 0);
}

console.log(
  recursiveNumberOfIncreases([
    199,
    200,
    208,
    210,
    200,
    207,
    240,
    269,
    260,
    263,
  ]),
  "should be 7"
);

const input = readFileSync("./src/day1.input.txt", "utf8")
  .split("\n")
  .map((n) => parseInt(n));

console.log(recursiveNumberOfIncreases(input));
