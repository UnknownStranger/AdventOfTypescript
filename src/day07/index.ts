import run from "aocrunner";

const parseInput = (rawInput: string) => {
  return rawInput.split(",").map(Number);
};

const sumDistance = (input: number[], target: number) => {
  return input.reduce((a, b) => {
    const delta = Math.abs(b - target);
    return a + Math.floor((delta * (delta + 1)) / 2);
  }, 0);
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput).sort((a, b) => a - b);
  const target = input[input.length / 2];
  let fuelUsed = 0;
  input.forEach((v) => {
    fuelUsed += Math.abs(v - target);
  });
  return fuelUsed;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput).sort((a, b) => a - b);
  const target = Math.floor(input.reduce((a, b) => a + b) / input.length);
  let fuelUsed = sumDistance(input, target);
  let fuelUsedAlt = sumDistance(input, target + 1);
  return fuelUsed < fuelUsedAlt ? fuelUsed : fuelUsedAlt;
};

const testInput = `16,1,2,0,4,2,7,1,2,14`;
run({
  part1: {
    tests: [{ input: testInput, expected: 37 }],
    solution: part1,
  },
  part2: {
    tests: [{ input: testInput, expected: 168 }],
    solution: part2,
  },
  trimTestInputs: true,
});
