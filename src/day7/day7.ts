import { curry, map, max, min, pipe, range, sum, unary } from "ramda";
import { readFileSync } from "fs";

/**
 * Find the difference between 2 numbers
 * @returns the difference between 2 numbers
 */
function _difference(): (a: number, b: number) => number {
  return function (a: number, b: number): number {
    return max(a, b) - min(a, b);
  };
}

const difference = curry(_difference());

/**
 * Find the sum of the integers between two integers
 * @param a an integer
 * @param b an integer
 * @returns the sum of the integers between a and b
 */
function _sum_between(a: number, b: number): number {
  const minimum = min(a, b);
  const maximum = max(a, b);
  return ((maximum - minimum + 1) * (minimum + maximum)) / 2;
}

const sumBetween = curry(_sum_between);

/**
 * Finds the cheapest horizontal position for crabs to align on
 * @param list a list of horizontal positions
 */
function findCheapestOutcome(list: Array<number>): number {
  const minHorizontalPosition = Math.min(...list);
  const maxHorizontalPosition = Math.max(...list);

  return range(minHorizontalPosition, maxHorizontalPosition).reduce(
    (memo, value) => {
      return pipe(
        map<number, number>(difference(value)),
        map<number, number>(sumBetween(1)),
        sum,
        min(memo)
      )(list);
    },
    Infinity
  );
}

const sampleInput = [16, 1, 2, 0, 4, 2, 7, 1, 2, 14];

const input = readFileSync("./src/day7/input.txt", "utf8")
  .split(",")
  .map(unary(parseInt));

console.log("Sample Answer: ", findCheapestOutcome(sampleInput));
console.log("Answer: ", findCheapestOutcome(input));
