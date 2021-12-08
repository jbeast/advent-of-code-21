import { readFileSync } from "fs";

type Board = Array<Set<number>>;

function isSubset<T>(setA: Set<T>, setB: Set<T>): boolean {
  for (let item of setB) {
    if (!setA.has(item)) {
      return false;
    }
  }
  return true;
}

function difference<T>(setA: Set<T>, setB: Set<T>) {
  let _difference = new Set<T>(setA);
  for (let elem of setB) {
    _difference.delete(elem);
  }
  return _difference;
}

function getDrawnNumbers(lines: ReadonlyArray<string>): Array<number> {
  const drawnNumbersRow = lines[0];
  if (!drawnNumbersRow) {
    throw new Error("Can not find drawn numbers");
  }
  return drawnNumbersRow.split(",").map((n) => parseInt(n, 10));
}

function createBoard(rows: Array<Array<number>>): Board {
  const board: Board = [];

  board.push(...rows.map((row) => new Set(row)));

  for (let i = 0; i < rows.length; i++) {
    board.push(new Set(rows.map((row) => row[i])));
  }

  return board;
}

function getBoards(lines: ReadonlyArray<string>): Array<Board> {
  const boards: Array<Board> = [];
  const iter = lines[Symbol.iterator]();
  // First line is the drawn numbers, so discard
  iter.next();
  iter.next();

  let row = iter.next();
  let boardNumbers: Array<Array<number>> = [];

  while (!row.done) {
    if (row.value !== "") {
      let x = row.value
        .trim()
        .replace(/\s+/g, ",")
        .split(",")
        .map((n) => parseInt(n));

      boardNumbers.push(x);
    } else {
      boards.push(createBoard(boardNumbers));
      boardNumbers = [];
    }
    row = iter.next();
  }

  return boards;
}

function isWinner(board: Board, s: Set<number>): boolean {
  return board.some((b) => isSubset(s, b));
}

const sampleInput = readFileSync("./src/day4/input.txt", "utf8").split("\n");
const drawnNumbers = getDrawnNumbers(sampleInput);
let boards = getBoards(sampleInput);

let winner: Board | null = null;
const drawnNumbersSet = new Set<number>();
let lastDrawnNumber = 0;
let winningNumbers = new Set<number>();

for (let i of drawnNumbers) {
  drawnNumbersSet.add(i);
  boards = boards.filter((b) => !isWinner(b, drawnNumbersSet));

  if (boards.length === 1) {
    winner = boards[0];
  }

  if (boards.length === 0) {
    lastDrawnNumber = i;
    winningNumbers = new Set(drawnNumbersSet);
    break;
  }
}

if (winner) {
  const winnerSet = winner.reduce((memo, value) => {
    value.forEach((v) => memo.add(v));
    return memo;
  }, new Set<number>());

  const unmarkedNumbers = difference(winnerSet, winningNumbers);
  const unmarkedNumbersSum = Array.from(unmarkedNumbers).reduce(
    (memo, value) => memo + value,
    0
  );

  console.log("Answer: ", lastDrawnNumber * unmarkedNumbersSum);
}
