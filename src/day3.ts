import { readFileSync } from "fs";

// Assume that all inputs are the same length
// Assume there will not be the same number of 1s and 0s at the same position
function mostCommonBits(input: Array<string>): string {
  const iterate = (
    _input: Array<string>,
    currentTotal: Array<number>
  ): string => {
    if (_input.length === 0) {
      return currentTotal.map((n) => (n < 0 ? "0" : "1")).join("");
    } else {
      _input[0].split("").forEach((zeroOrOne, index) => {
        currentTotal[index] =
          zeroOrOne === "0" ? currentTotal[index] - 1 : currentTotal[index] + 1;
      });
      return iterate(_input.slice(1), currentTotal);
    }
  };

  return iterate(input, new Array(input[0].length).fill(0));
}

function invert(input: string): string {
  return input
    .split("")
    .map((s) => (s === "1" ? "0" : "1"))
    .join("");
}

const testInput = [
  "00100",
  "11110",
  "10110",
  "10111",
  "10101",
  "01111",
  "00111",
  "11100",
  "10000",
  "11001",
  "00010",
  "01010",
];

const mostCommon = mostCommonBits(testInput);
const leastCommon = invert(mostCommon);
console.log(parseInt(mostCommon, 2), " should equal 22");
console.log(parseInt(leastCommon, 2), " should equal 9");

const input = readFileSync("./src/day3.input.txt", "utf8").split("\n");

const gammaRateStr = mostCommonBits(input);
const epsilonRateStr = invert(gammaRateStr);

const gammaRate = parseInt(gammaRateStr, 2);
const epsilonRate = parseInt(epsilonRateStr, 2);

console.log(gammaRate * epsilonRate, " is the answer");

function filterValues(
  input: Array<string>,
  mostCommon: boolean = true
): string {
  const iterate = (_input: Array<string>, bitIndex: number): string => {
    if (_input.length === 1) {
      return _input[0];
    }

    const i = _input
      .map((s) => s[bitIndex])
      .reduce((memo, value) => {
        return value === "0" ? --memo : ++memo;
      }, 0);

    const filter = (n: string) => n[bitIndex] === (i < 0 ? "0" : "1");

    return iterate(
      _input.filter((n) => (mostCommon ? filter(n) : !filter(n))),
      ++bitIndex
    );
  };

  return iterate(input, 0);
}

console.log(filterValues(testInput, true), "should be 10111");
console.log(filterValues(testInput, false), "should be 01010");

const oxygenRatingStr = filterValues(input, true);
const oxygenRating = parseInt(oxygenRatingStr, 2);

const co2ScrubberRatingStr = filterValues(input, false);
const co2ScrubberRating = parseInt(co2ScrubberRatingStr, 2);

console.log("Answer: ", oxygenRating * co2ScrubberRating);
