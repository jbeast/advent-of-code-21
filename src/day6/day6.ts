import * as R from "ramda";

const puzzleInput = [
  1,
  1,
  1,
  3,
  3,
  2,
  1,
  1,
  1,
  1,
  1,
  4,
  4,
  1,
  4,
  1,
  4,
  1,
  1,
  4,
  1,
  1,
  1,
  3,
  3,
  2,
  3,
  1,
  2,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  3,
  4,
  1,
  1,
  4,
  3,
  1,
  2,
  3,
  1,
  1,
  1,
  5,
  2,
  1,
  1,
  1,
  1,
  2,
  1,
  2,
  5,
  2,
  2,
  1,
  1,
  1,
  3,
  1,
  1,
  1,
  4,
  1,
  1,
  1,
  1,
  1,
  3,
  3,
  2,
  1,
  1,
  3,
  1,
  4,
  1,
  2,
  1,
  5,
  1,
  4,
  2,
  1,
  1,
  5,
  1,
  1,
  1,
  1,
  4,
  3,
  1,
  3,
  2,
  1,
  4,
  1,
  1,
  2,
  1,
  4,
  4,
  5,
  1,
  3,
  1,
  1,
  1,
  1,
  2,
  1,
  4,
  4,
  1,
  1,
  1,
  3,
  1,
  5,
  1,
  1,
  1,
  1,
  1,
  3,
  2,
  5,
  1,
  5,
  4,
  1,
  4,
  1,
  3,
  5,
  1,
  2,
  5,
  4,
  3,
  3,
  2,
  4,
  1,
  5,
  1,
  1,
  2,
  4,
  1,
  1,
  1,
  1,
  2,
  4,
  1,
  2,
  5,
  1,
  4,
  1,
  4,
  2,
  5,
  4,
  1,
  1,
  2,
  2,
  4,
  1,
  5,
  1,
  4,
  3,
  3,
  2,
  3,
  1,
  2,
  3,
  1,
  4,
  1,
  1,
  1,
  3,
  5,
  1,
  1,
  1,
  3,
  5,
  1,
  1,
  4,
  1,
  4,
  4,
  1,
  3,
  1,
  1,
  1,
  2,
  3,
  3,
  2,
  5,
  1,
  2,
  1,
  1,
  2,
  2,
  1,
  3,
  4,
  1,
  3,
  5,
  1,
  3,
  4,
  3,
  5,
  1,
  1,
  5,
  1,
  3,
  3,
  2,
  1,
  5,
  1,
  1,
  3,
  1,
  1,
  3,
  1,
  2,
  1,
  3,
  2,
  5,
  1,
  3,
  1,
  1,
  3,
  5,
  1,
  1,
  1,
  1,
  2,
  1,
  2,
  4,
  4,
  4,
  2,
  2,
  3,
  1,
  5,
  1,
  2,
  1,
  3,
  3,
  3,
  4,
  1,
  1,
  5,
  1,
  3,
  2,
  4,
  1,
  5,
  5,
  1,
  4,
  4,
  1,
  4,
  4,
  1,
  1,
  2,
];

type Count = { [key: string]: number };

const emptyCounts = R.reduce<number, Count>((memo, value) => {
  memo[value] = 0;
  return memo;
}, {})(R.range(0, 9));

const createInitial = R.mergeRight(emptyCounts);

const sampleInput = createInitial(R.countBy(R.identity, [3, 4, 3, 1, 2]));
const input = createInitial(R.countBy(R.identity, puzzleInput));

function simulate(count: Count, days: number): Count {
  if (days === 0) {
    return count;
  } else {
    const newCount = R.reduce<number, Count>((memo, value) => {
      memo[value] = count[value + 1];
      return memo;
    }, {})(R.range(0, 8));

    newCount[8] = count[0];
    newCount[6] += count[0];

    return simulate(newCount, days - 1);
  }
}

const answer = R.pipe(simulate, R.values, R.sum);

console.log("Answer should be 26: ", answer(sampleInput, 18));

console.log("Answer: ", answer(input, 80));
console.log("Answer: ", answer(input, 256));