import run from "aocrunner";
const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput).split("\n");
  let counter = 0;
  let previous: number | null = null;
  input.forEach((val) => {
    if (previous && parseInt(val) > previous) {
      counter++;
    }
    previous = parseInt(val);
  });

  return counter;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput).split("\n");
  let previous: number[] = new Array(3).fill(0);
  const current: number[] = new Array(3).fill(0);
  let counter = 0;
  input.forEach((value, index) => {
    current.push(parseInt(value));
    current.shift();
    if (index >= 3) {
      if (current.reduce((a, b) => a + b) > previous.reduce((a, b) => a + b)) {
        counter++;
      }
    }
    previous = [...current];
  });
  return counter;
};

const testInput = `199
200
208
210
200
207
240
269
260
263
`;

run({
  part1: {
    tests: [{ input: testInput, expected: 7 }],
    solution: part1,
  },
  part2: {
    tests: [{ input: testInput, expected: 5 }],
    solution: part2,
  },
  trimTestInputs: true,
});
