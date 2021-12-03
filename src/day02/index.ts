import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

//new class submarine with an x, y and aim
class Submarine {
  x1: number;
  y1: number;
  y2: number;
  aim: number;
  constructor(x: number, y: number, aim: number) {
    this.x1 = x;
    this.y1 = y;
    this.y2 = y;
    this.aim = aim;
  }

  moveForward(distance: number) {
    this.x1 += distance;
    this.y2 += this.aim * distance;
  }
  moveUp(distance: number) {
    this.y1 -= distance;
    this.aim -= distance;
  }
  moveDown(distance: number) {
    this.y1 += distance;
    this.aim += distance;
  }
  distanceFromOrigin() {
    return Math.abs(this.x1) * Math.abs(this.y1);
  }
  distanceUsingAim() {
    return Math.abs(this.x1) * Math.abs(this.y2);
  }
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput).split("\n");
  const sub = new Submarine(0, 0, 0);
  input.forEach((command) => {
    const dir = command.split(" ")[0];
    const distance = command.split(" ")[1];
    switch (dir) {
      case "up":
        sub.moveUp(parseInt(distance));
        break;
      case "down":
        sub.moveDown(parseInt(distance));
        break;
      case "forward":
        sub.moveForward(parseInt(distance));
        break;
    }
  });
  return sub.distanceFromOrigin();
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput).split("\n");
  const sub = new Submarine(0, 0, 0);
  input.forEach((command) => {
    const dir = command.split(" ")[0];
    const distance = command.split(" ")[1];
    switch (dir) {
      case "up":
        sub.moveUp(parseInt(distance));
        break;
      case "down":
        sub.moveDown(parseInt(distance));
        break;
      case "forward":
        sub.moveForward(parseInt(distance));
        break;
    }
  });
  return sub.distanceUsingAim();
};

const testInput = `forward 5
down 5
forward 8
up 3
down 8
forward 2`;
run({
  part1: {
    tests: [{ input: testInput, expected: 150 }],
    solution: part1,
  },
  part2: {
    tests: [
      { input: testInput, expected: 900 },
    ],
    solution: part2,
  },
  trimTestInputs: true,
});
