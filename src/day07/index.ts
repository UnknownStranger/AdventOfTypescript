import run from "aocrunner";

const parseInput = (rawInput: string) => {
  return rawInput.split(",").map(Number);
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
  const target = input.reduce((a, b) => a + b) / input.length;
  const targetFloor = Math.floor(target);
  const targetCeil = Math.ceil(target);
  let fuelUsed = 0;
  let fuelUsedAlternative = 0;
  input.forEach((v) => {
    for (let i = 0; i <= Math.abs(v - targetFloor); i++) {
      fuelUsed += i;
    }
    for (let i = 0; i <= Math.abs(v - targetCeil); i++) {
      fuelUsedAlternative += i;
    }
  });
  return fuelUsed < fuelUsedAlternative ? fuelUsed : fuelUsedAlternative;
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
