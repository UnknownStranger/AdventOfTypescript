import run from "aocrunner";

const parseInput = (rawInput: string) => {
  return rawInput.split(",");
};

function initializeFish(values: string[]) {
  const tempArr = new Array(9).fill(0);
  values.forEach((value) => {
    tempArr[Number(value)] += 1;
  });
  return tempArr;
}

function spawnFish(fishTank: number[], targetDay: number){
    let day = 0;
    while (day < targetDay) {
      let fishBag = fishTank.shift();
      fishBag === undefined ? (fishBag = 0) : (fishBag = fishBag);
      fishTank[6] += fishBag;
      fishTank.push(fishBag);
      day++;
    }
  
    const fishCount = fishTank.reduce((acc, curr) => acc + curr);
    return fishCount;
  
}

const part1 = (rawInput: string) => {
  const values = parseInput(rawInput);
  const fishTank = initializeFish(values);
  return spawnFish(fishTank, 80);
};

const part2 = (rawInput: string) => {
  const values = parseInput(rawInput);
  const fishTank = initializeFish(values);
  return spawnFish(fishTank, 256);
};

const testInput = "3,4,3,1,2";

run({
  part1: {
    tests: [{ input: testInput, expected: 5934 }],
    solution: part1,
  },
  part2: {
    tests: [
      { input: testInput, expected: 26984457539 },
    ],
    solution: part2,
  },
  trimTestInputs: true,
});
