import { readFileSync } from "fs";
import {
  equals,
  invoker,
  map,
  pipe,
  prop,
  curry,
  __,
  find,
  allPass,
  not,
  sum,
} from "ramda";

const split = invoker(1, "split");
const size = prop("size");
const sizeIs = curry(<T>(n: number, input: Set<T>) => equals(n, size(input)));

const isSuperset = curry(function (set: Set<string>, subset: Set<string>) {
  for (let elem of subset) {
    if (!set.has(elem)) {
      return false;
    }
  }
  return true;
});

const eqSet = curry(function (a: Set<string>, b: Set<string>) {
  if (a.size !== b.size) return false;
  for (let item of a) {
    if (!b.has(item)) {
      return false;
    }
  }
  return true;
});

type InputMap = Map<number, Set<string>>;

function deduceInputMap(inputs: Set<string>[]): InputMap {
  const m: InputMap = new Map<number, Set<string>>();

  m.set(1, find(sizeIs(2), inputs)!);
  m.set(7, find(sizeIs(3), inputs)!);
  m.set(4, find(sizeIs(4), inputs)!);
  m.set(8, find(sizeIs(7), inputs)!);

  // 9 has a length of 6 and is a superset of 4
  const nine = allPass([sizeIs(6), isSuperset(__, m.get(4)!)]);
  m.set(9, find(nine, inputs)!);

  // 0 has length 6 and is superset of 1 and isn't equal to 9
  const zero = allPass([
    sizeIs(6),
    isSuperset(__, m.get(1)!),
    pipe(eqSet(m.get(9)!), not),
  ]);
  m.set(0, find(zero, inputs)!);

  // 3 has length 5 and is a superset of 1 and 7
  const three = allPass([
    sizeIs(5),
    isSuperset(__, m.get(1)!),
    isSuperset(__, m.get(7)!),
  ]);
  m.set(3, find(three, inputs)!);

  // 5 has length 5 and is a subset of 9 and is not equal to 3
  const five = allPass([
    sizeIs(5),
    isSuperset(m.get(9)!, __),
    pipe(eqSet(m.get(3)!), not),
  ]);
  m.set(5, find(five, inputs)!);

  // 2 is the only one with length 5 left
  const two = allPass([
    sizeIs(5),
    pipe(eqSet(m.get(3)!), not),
    pipe(eqSet(m.get(5)!), not),
  ]);
  m.set(2, find(two, inputs)!);

  // 6 is the only one with length 6 left
  const six = allPass([
    sizeIs(6),
    pipe(eqSet(m.get(0)!), not),
    pipe(eqSet(m.get(9)!), not),
  ]);
  m.set(6, find(six, inputs)!);

  return m;
}

function findDigit(inputMap: InputMap, a: Set<string>): number {
  for (let i of inputMap) {
    if (eqSet(i[1], a)) {
      return i[0];
    }
  }
  console.error(inputMap, a);
  throw new Error(`No match for ${a}`);
}

const testInput = [
  "acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf",
];

function getOutputValue(line: string): number {
  const [input, output] = split(" | ")(line);
  const toSets = pipe(
    split(" "),
    map((n: string) => new Set(n))
  );
  const inputSets = toSets(input);
  const outputSets = toSets(output);

  const inputMap = deduceInputMap(inputSets);

  const outputDigits = map((outputSet: Set<string>) =>
    findDigit(inputMap, outputSet)
  )(outputSets);

  return parseInt(outputDigits.map(String).join(""));
}

console.log("Test answer (5353): ", getOutputValue(testInput[0]));

const lines = readFileSync("./src/day8/input.txt", "utf8");

console.log("Answer: ", pipe(split("\n"), map(getOutputValue), sum)(lines));
