import { readFileSync } from "fs";

class Point {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  static fromString(str: string) {
    const [x, y] = str.trim().split(",");
    return new Point(parseInt(x), parseInt(y));
  }

  toString() {
    return `${this.x},${this.y}`;
  }
}

type Line = {
  from: Point;
  to: Point;
};

// A map of points to the number of lines that overlap that point
type Grid = Map<string, number>;

function between(x: number, y: number): number[] {
  const start = x < y ? x : y;
  const end = start === x ? y : x;

  let _range = [];
  for (let i = start; i <= end; i++) {
    _range.push(i);
  }
  return _range;
}

function path(line: Line): Array<Point> {
  if (line.from.x === line.to.x) {
    return between(line.from.y, line.to.y).map(
      (y) => new Point(line.from.x, y)
    );
  } else if (line.from.y === line.to.y) {
    return between(line.from.x, line.to.x).map(
      (x) => new Point(x, line.from.y)
    );
  } else {
    return [];
  }
}

const input = readFileSync("./src/day5/day5.input.txt", "utf8").split("\n");

const lines: Array<Line> = input
  .map((line) => line.replace(/\s/g, ""))
  .map((line) => line.split("->"))
  .map((points) => ({
    from: Point.fromString(points[0]),
    to: Point.fromString(points[1]),
  }));

console.log("Lines", lines);

const grid: Grid = new Map();

lines.forEach((line) => {
  const points = path(line);

  for (let point of points) {
    if (grid.get(point.toString())) {
      grid.set(point.toString(), grid.get(point.toString())! + 1);
    } else {
      grid.set(point.toString(), 1);
    }
  }
});

console.log("Answer: ", Array.from(grid.values()).filter((n) => n >= 2).length);
