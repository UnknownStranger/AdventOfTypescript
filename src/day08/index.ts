import run from "aocrunner";
const unique = [2, 3, 4, 7];

const parseInput = (rawInput: string) => {
  const regex = /\n|\|/g;
  const input = rawInput.split(regex).filter((x) => x !== "");
  let displays = [];
  for (let i = 0; i < input.length; i += 2) {
    displays.push(new Display(input[i], input[i + 1]));
  }
  return displays;
};

class Display {
  signal: string[];
  out: string[];
  tr = "";
  numberSignal: string[][] = new Array(10);

  constructor(input: string, output: string) {
    this.signal = input.trim().split(" ");
    this.out = output.trim().split(" ");
  }

  parseOutput() {
    let total = "";
    this.out.forEach((string) => {
      this.numberSignal.forEach((code, index) => {
        if (code.sort().join(",") === string.split("").sort().join(",")) {
          total += index;
        }
      });
    });
    return Number(total);
  }

  setNumbers() {
    this.setFixed();
    this.setSix();
    this.setNine();
    this.setZero();
    this.setThree();
    this.setTwo();
    this.setFive();
  }

  setFixed() {
    this.signal.forEach((string) => {
      if (string.length === 2) {
        this.numberSignal[1] = [...string];
      } else if (string.length === 3) {
        this.numberSignal[7] = [...string];
      } else if (string.length === 4) {
        this.numberSignal[4] = [...string];
      } else if (string.length === 7) {
        this.numberSignal[8] = [...string];
      }
    });
    this.removeSignal(this.numberSignal[1]);
    this.removeSignal(this.numberSignal[7]);
    this.removeSignal(this.numberSignal[4]);
    this.removeSignal(this.numberSignal[8]);
  }

  removeSignal(string: string[]) {
    this.signal = this.signal.filter((x) => x !== string.join(""));
  }

  setSix() {
    this.signal.forEach((string) => {
      if (string.length === 6) {
        this.numberSignal[1].forEach((char) => {
          if (string.indexOf(char) === -1) {
            this.tr = char;
            this.numberSignal[6] = [...string];
          }
        });
      }
    });
    this.removeSignal(this.numberSignal[6]);
  }

  setNine() {
    this.signal.forEach((string) => {
      let match = true;
      if (string.length === 6) {
        this.numberSignal[4].forEach((char) => {
          if (string.indexOf(char) === -1) {
            match = false;
          }
        });
        if (match) {
          this.numberSignal[9] = [...string];
        }
      }
    });
    this.removeSignal(this.numberSignal[9]);
  }

  setZero() {
    this.signal.forEach((string) => {
      if (string.length === 6) {
        let s = string.split("");
        if (s !== this.numberSignal[9] && s !== this.numberSignal[6]) {
          this.numberSignal[0] = [...string];
        }
      }
    });
    this.removeSignal(this.numberSignal[0]);
  }

  setThree() {
    this.signal.forEach((string) => {
      let match = true;
      if (string.length === 5) {
        this.numberSignal[1].forEach((char) => {
          if (string.indexOf(char) === -1) {
            match = false;
          }
        });
        if (match) {
          this.numberSignal[3] = string.split("");
        }
      }
    });
    this.removeSignal(this.numberSignal[3]);
  }

  setTwo() {
    this.signal.forEach((string) => {
      if (string.length === 5) {
        if (
          string.indexOf(this.tr) !== -1 &&
          string.split("") !== this.numberSignal[3]
        ) {
          this.numberSignal[2] = [...string];
        }
      }
    });
    this.removeSignal(this.numberSignal[2]);
  }

  setFive() {
    this.numberSignal[5] = [...this.signal[0]];
    this.removeSignal(this.numberSignal[5]);
  }
}

const part1 = (rawInput: string) => {
  const displays = parseInput(rawInput);
  let count = 0;
  displays.forEach((display) => {
    display.out.forEach((string) => {
      if (unique.includes(string.length)) {
        count++;
      }
    });
  });
  return count;
};

const part2 = (rawInput: string) => {
  const displays = parseInput(rawInput);
  let total = 0;
  displays.forEach((display) => {
    display.setNumbers();
    total += display.parseOutput();
  });
  return total;
};

const testInput = `be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb |
fdgacbe cefdb cefbgd gcbe
edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec |
fcgedb cgb dgebacf gc
fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef |
cg cg fdcagb cbg
fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega |
efabcd cedba gadfec cb
aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga |
gecf egdcabf bgf bfgea
fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf |
gebdcfa ecba ca fadegcb
dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf |
cefg dcbef fcge gbcadfe
bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd |
ed bcgafe cdgba cbgef
egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg |
gbdfcae bgc cg cgb
gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc |
fgae cfgab fg bagce`;

run({
  part1: {
    tests: [{ input: testInput, expected: 26 }],
    solution: part1,
  },
  part2: {
    tests: [{ input: testInput, expected: 61229 }],
    solution: part2,
  },
  trimTestInputs: true,
});
