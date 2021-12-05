import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput).split("\n");
  const calledNumbers = input.shift()!.split(",");
  const boards: string[] | null = [];

  const checkForBingo = (board: string[]) => {
    let bingo = false;
    const size = Math.sqrt(board.length);

    const toCheck = [
      board[0],
      board[1 + 1 * size],
      board[2 + 2 * size],
      board[3 + 3 * size],
      board[4 + 4 * size],
    ];

    const checkRow = (rowNumber: number) => {
      const modifier = rowNumber * size;
      const numbers = [
        board[0 + modifier],
        board[1 + modifier],
        board[2 + modifier],
        board[3 + modifier],
        board[4 + modifier],
      ];
      bingo =
        numbers.filter((n) => n !== null && n !== undefined).flat().length ===
        0;
    };

    const checkColumn = (columnNumber: number) => {
      const numbers = [
        board[columnNumber],
        board[columnNumber + size],
        board[columnNumber + size * 2],
        board[columnNumber + size * 3],
        board[columnNumber + size * 4],
      ];
      bingo =
        numbers.filter((n) => n !== null && n !== undefined).flat().length ===
        0;
    };

    // const checkDiagonal = () => {
    //   bingo =
    //     toCheck.filter((n) => n !== null && n !== undefined).flat().length ===
    //     0;
    // };

    // const checkAntiDiagonal = () => {
    //   const numbers = [
    //     board[0 * size + 4],
    //     board[1 * size + 3],
    //     board[2 * size + 2],
    //     board[3 * size + 1],
    //     board[4 * size + 0],
    //   ];
    //   bingo =
    //     numbers.filter((n) => n !== null && n !== undefined).flat().length ===
    //     0;
    // };

    toCheck.forEach((val, i) => {
      if (val === null) {
        // if (i === 2) {
        //   checkDiagonal();
        //   checkAntiDiagonal();
        // }
        checkColumn(i);
        checkRow(i);
      }
    });

    console.log(board);
    return bingo;
  };

  let tempArr: any = [];
  input.forEach((line) => {
    line.split("\n").forEach((row) => {
      if (line !== "") {
        tempArr = [...tempArr, ...row.split(" ").filter((n) => n !== "")];
      } else {
        if (tempArr.length > 0) {
          boards.push(tempArr);
          tempArr = [];
        }
      }
    });
  });

  const bingoBoard: string[] = [];
  let finalCalledNumber = 0;
  let calledNumberIndex = 0;
  while (bingoBoard.length < 1) {
    const calledNumber = calledNumbers[calledNumberIndex];
    boards.forEach((board) => {
      if (board.includes(calledNumber)) {
        // @ts-ignore
        board[board.indexOf(calledNumber)] = null;
        if (checkForBingo(board as unknown as string[])) {
          bingoBoard.push(board);
          finalCalledNumber = parseInt(calledNumber);
        }
      }
    });
    calledNumberIndex++;
  }

  return bingoBoard;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return;
};

// const testInput = `7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

// 22 13 17 11  0
//  8  2 23  4 24
// 21  9 14 16  7
//  6 10  3 18  5
//  1 12 20 15 19

//  3 15  0  2 22
//  9 18 13 17  5
// 19  8  7 25 23
// 20 11 10 24  4
// 14 21 16 12  6

// 14 21 17 24  4
// 10 16 15  9 19
// 18  8 23 26 20
// 22 11 13  6  5
//  2  0 12  3  7`;
const testInput = `7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
 2  0 12  3  7`;

run({
  part1: {
    tests: [{ input: testInput, expected: 4512 }],
    solution: part1,
  },
  part2: {
    tests: [
      // { input: ``, expected: "" },
    ],
    solution: part2,
  },
  trimTestInputs: true,
});
