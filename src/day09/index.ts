import run from "aocrunner";

const parseInput = (rawInput: string) => {
  const splitInput = rawInput.split("\n").map((x) => x.split(""));
  return splitInput;
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const total = input.reduce((totalAcc, rowNumbers, rowIndex) => {
    return (
      totalAcc +
      rowNumbers.reduce((rowAcc, targetNumber, colIndex) => {
        const t = Number(targetNumber);
        let lowest = false;

        const greaterThanLeft =
          colIndex > 0 ? t < Number(rowNumbers[colIndex - 1]) : true;

        const greaterThanRight =
          colIndex < rowNumbers.length - 1
            ? t < Number(rowNumbers[colIndex + 1])
            : true;

        const greaterThanAbove =
          rowIndex > 0 ? t < Number(input[rowIndex - 1][colIndex]) : true;

        const greaterThanBelow =
          rowIndex < input.length - 1
            ? t < Number(input[rowIndex + 1][colIndex])
            : true;

        if (
          greaterThanLeft &&
          greaterThanRight &&
          greaterThanBelow &&
          greaterThanAbove
        ) {
          lowest = true;
        }

        if (lowest) {
          return (rowAcc += t + 1);
        }

        return rowAcc;
      }, 0)
    );
  }, 0);

  return total;
};

const part2 = (rawInput: string) => {
  return;
};

const testInput = `2199943210
3987894921
9856789892
8767896789
9899965678`;

run({
  part1: {
    tests: [{ input: testInput, expected: 15 }],
    solution: part1,
  },
  part2: {
    tests: [
      // { input: testInput, expected: "" },
    ],
    solution: part2,
  },
  trimTestInputs: true,
});
