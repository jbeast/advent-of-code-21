import { readFileSync } from "fs";

type HorizontalPosition = number;
type Depth = number;
type Aim = number;
type Position = [HorizontalPosition, Depth, Aim];

function move(commands: Array<string>, position: Position): Position {
  if (commands.length === 0) {
    return position;
  } else {
    const [hzp, depth, aim] = position;
    const command = commands[0];
    const [direction, value] = command.split(" ");
    const valueInt = parseInt(value);

    if (direction === "forward") {
      return move(commands.slice(1), [
        hzp + valueInt,
        depth + aim * valueInt,
        aim,
      ]);
    } else if (direction === "down") {
      return move(commands.slice(1), [hzp, depth, aim + valueInt]);
    } else if (direction === "up") {
      return move(commands.slice(1), [hzp, depth, aim - valueInt]);
    } else {
      throw new Error(`We don't know how to move ${direction}!`);
    }
  }
}

const test = [
  "forward 5",
  "down 5",
  "forward 8",
  "up 3",
  "down 8",
  "forward 2",
];

const testMove = move(test, [0, 0, 0]);
console.log(testMove[0] * testMove[1], "should equal 900");

const input = readFileSync("./src/day2.input.txt", "utf8").split("\n");

const position = move(input, [0, 0, 0]);

console.log("Answer: ", position[0] * position[1]);
