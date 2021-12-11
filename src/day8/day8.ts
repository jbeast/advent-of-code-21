import { readFileSync } from "fs";
import {
  filter,
  flatten,
  head,
  invoker,
  map,
  nth,
  pipe,
  prop,
  splitEvery,
  __,
} from "ramda";

const lines = readFileSync("./src/day8/input.txt", "utf8");

const split = invoker(1, "split");
const splitLines = split("\n");

const length = prop("length");
const includes = invoker(1, "includes");
const getLengths = map(length);

const uniqueSegmentNumbers = [2, 3, 4, 7];
const hasUniqueSegment = includes(__, uniqueSegmentNumbers);

const outputs = pipe(
  splitLines,
  map<string, string[]>(split(" | ")),
  map(nth(1)),
  map(split(" ")),
  flatten
)(lines);

const outputLengths = getLengths(outputs as string[]);

console.log(length(filter(hasUniqueSegment)(outputLengths)));
