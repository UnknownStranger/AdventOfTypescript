import run from "aocrunner";

const parseInput = (rawInput: string, shouldMarkDiag: boolean = false) => {
  const input = rawInput.split("\n");
  const vectors: Vector2[] = [];

  input.forEach((line) => {
    let p1 = new Point(0, 0);
    let p2 = new Point(0, 0);
    line.split(" -> ").forEach((point, index) => {
      const [x, y] = point.split(",");
      index === 0
        ? (p1 = new Point(Number(x), Number(y)))
        : (p2 = new Point(Number(x), Number(y)));
    });
    if (isStraight(p1, p2)) {
      vectors.push(new Vector2(p1, p2));
    }
    if (shouldMarkDiag && !isStraight(p1, p2)) {
      vectors.push(new Vector2(p1, p2));
    }
  });

  return vectors;
};

function isStraight(p1: Point, p2: Point) {
  return (p1.x === p2.x && p1.y !== p2.y) || (p1.x !== p2.x && p1.y === p2.y);
}

class Point {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

class Vector2 {
  startPoint: Point;
  endPoint: Point;
  distance: number;

  constructor(startPoint: Point, endPoint: Point) {
    this.startPoint = startPoint;
    this.endPoint = endPoint;
    this.distance = this.calculateDistance();
  }

  calculateDistance() {
    if (isDiagonal(this.startPoint, this.endPoint)) {
      return Math.abs(this.startPoint.x - this.endPoint.x);
    }
    return Math.abs(
      Math.abs(this.startPoint.x - this.endPoint.x) +
        Math.abs(this.startPoint.y - this.endPoint.y),
    );
  }
}

function isDiagonal(p1: Point, p2: Point) {
  if (Math.abs(p1.x - p2.x) === Math.abs(p1.y - p2.y)) {
    return true;
  }
  return false;
}

class Grid {
  grid = new Array(1000).fill(0).map(() => new Array(1000).fill(0));

  markPoint(point: Point) {
    this.grid[point.y][point.x] += 1;
    return this.grid[point.y][point.x] === 2 ? true : false;
  }
}

const part1 = (rawInput: string) => {
  const vectors = parseInput(rawInput);

  let count = 0;
  const grid = new Grid();
  vectors.forEach((v) => {
    for (let i = 0; i <= v.distance; i++) {
      const point = new Point(
        v.startPoint.x +
          Math.floor((i * (v.endPoint.x - v.startPoint.x)) / v.distance),
        v.startPoint.y +
          Math.floor((i * (v.endPoint.y - v.startPoint.y)) / v.distance),
      );
      grid.markPoint(point) === true ? count++ : null;
    }
  });
  return count;
};

const part2 = (rawInput: string) => {
  const vectors = parseInput(rawInput, true);

  let count = 0;
  const grid = new Grid();
  vectors.forEach((v) => {
    for (let i = 0; i <= v.distance; i++) {
      const point = new Point(
        v.startPoint.x +
          Math.floor((i * (v.endPoint.x - v.startPoint.x)) / v.distance),
        v.startPoint.y +
          Math.floor((i * (v.endPoint.y - v.startPoint.y)) / v.distance),
      );
      grid.markPoint(point) === true ? count++ : null;
    }
  });

  return count;
};

const testInput = `0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2`;

run({
  part1: {
    tests: [{ input: testInput, expected: 5 }],
    solution: part1,
  },
  part2: {
    tests: [{ input: testInput, expected: 12 }],
    solution: part2,
  },
  trimTestInputs: true,
});
