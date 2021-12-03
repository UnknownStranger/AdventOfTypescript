import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput).split("\n");
  const bitsCount = new Array(input[0].length).fill(0);

  input.forEach((line) => {
    line.split("").forEach((char, index) => {
      if (char === "1") {
        bitsCount[index]++;
      } else {
        bitsCount[index]--;
      }
    });
  });

  const gamma: number[] = [];
  const epsilon: number[] = [];

  bitsCount.forEach((count, index) => {
    gamma[index] = count >= 0 ? 1 : 0;
    epsilon[index] = count >= 0 ? 0 : 1;
  });

  return parseInt(gamma.join(""), 2) * parseInt(epsilon.join(""), 2);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput).split("\n");

  const oxygen = [...input];
  const carbon = [...input];

  const calculateBits = (
    index: number,
    type: string[],
    isOxygen: boolean,
  ): string => {
    let count = 0;
    type.forEach((line) => {
      if (line[index] === "1") {
        isOxygen ? count++ : count--;
      } else {
        isOxygen ? count-- : count++;
      }
    });

    if (count === 0) {
      isOxygen ? count++ : count--;
    }

    return count > 0 ? "1" : "0";
  };

  const mainLoop = (type: string[], isOxygen: boolean) => {
    let index = 0;
    while (type.length > 1) {
      let bit = calculateBits(index, type, isOxygen).toString();

      for (let i = type.length - 1; i >= 0; i--) {
        if (type[i][index] === bit) {
          type.splice(i, 1);
        }
      }
      index++;
    }
  };

  mainLoop(oxygen, true);
  mainLoop(carbon, false);

  return parseInt(carbon.join(""), 2) * parseInt(oxygen.join(""), 2);
};

const testInput = `00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010
`;
run({
  part1: {
    tests: [{ input: testInput, expected: 198 }],
    solution: part1,
  },
  part2: {
    tests: [{ input: testInput, expected: 230 }],
    solution: part2,
  },
  trimTestInputs: true,
});
