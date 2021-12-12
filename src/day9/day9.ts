import { assert } from "console";
import { readFileSync } from "fs";
import { all, gt, invoker, lt, map, pipe, unary } from "ramda";

const testInput = [
  "2199943210",
  "3987894921",
  "9856789892",
  "8767896789",
  "9899965678",
];

const split = invoker(1, "split");

const puzzleInput = split("\n")(
  readFileSync("./src/day9/day9.input.txt", "utf8")
);

const parseInput = pipe(
  map<string, string[]>(split("")),
  map(map(unary(parseInt)))
);

/**
 * Finds the risk level of a series of locations
 * @param input a "heightmap"
 * @returns number the sum of the risk levels
 */
function sumOfRiskLevels(input: string[]): number {
  const inputNumbers = parseInput(input);
  let sum = 0;

  for (
    let rowIndex = 0, rowLength = inputNumbers.length;
    rowIndex < rowLength;
    rowIndex++
  ) {
    for (
      let columnIndex = 0, colLength = inputNumbers[rowIndex].length;
      columnIndex < colLength;
      columnIndex++
    ) {
      let adjacentLocations = getAdjacentLocations(
        inputNumbers[rowIndex],
        columnIndex,
        inputNumbers[rowIndex - 1],
        inputNumbers[rowIndex + 1]
      );

      let value = inputNumbers[rowIndex][columnIndex];

      const allGt = all(lt(inputNumbers[rowIndex][columnIndex]));

      if (allGt(adjacentLocations)) {
        sum += value + 1;
      }
    }
  }

  return sum;
}

function getAdjacentLocations(
  row: number[],
  index: number,
  prevRow?: number[],
  nextRow?: number[]
): number[] {
  const adjacentLocationValues: number[] = [];
  if (typeof row[index - 1] !== "undefined") {
    adjacentLocationValues.push(row[index - 1]);
  }
  if (typeof row[index + 1] !== "undefined") {
    adjacentLocationValues.push(row[index + 1]);
  }
  if (prevRow) {
    adjacentLocationValues.push(prevRow[index]);
  }
  if (nextRow) {
    adjacentLocationValues.push(nextRow[index]);
  }
  return adjacentLocationValues;
}

console.log("Test input (15):", sumOfRiskLevels(testInput));
console.log("Puzzle Answer:", sumOfRiskLevels(puzzleInput));
