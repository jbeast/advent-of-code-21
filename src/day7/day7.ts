import { curry, map, max, range, sum, unary } from "ramda";
import { readFileSync } from "fs";

const difference = curry(function (a: number, b: number): number {
  if (a >= b) {
    return a - b;
  } else {
    return b - a;
  }
});

/**
 * Finds the cheapest horizontal position for crabs to align on
 * @param list a list of horizontal positions
 */
function findCheapestOutcome(list: Array<number>): number {
  const minHorizontalPosition = Math.min(...list);
  const maxHorizontalPosition = Math.max(...list);

  const startingPoint = [minHorizontalPosition, Infinity];

  return range(minHorizontalPosition, maxHorizontalPosition).reduce(
    (memo, value) => {
      const total = sum(map<number, number>(difference(value))(list));
      return total < memo[1] ? [value, total] : memo;
    },
    startingPoint
  )[1];
}

const sampleInput = [16, 1, 2, 0, 4, 2, 7, 1, 2, 14];

const input = readFileSync("./src/day7/input.txt", "utf8")
  .split(",")
  .map(unary(parseInt));

console.log("Sample Answer: ", findCheapestOutcome(sampleInput));
console.log("Answer: ", findCheapestOutcome(input));
