const fs = require('fs');
const input = fs.readFileSync('day4.sample.input').toString()
const lineInputs = input.split('\n');

const [ rawNumbers, ...rawBoards ] = lineInputs;
const boardNbs = rawBoards.join(' ').replace(/\s+/gm, ' ').split(' ').map(x => [false, parseInt(x)]).slice(1);

const numbers = rawNumbers.split(',').map(x => parseInt(x))
const boards = [];

let board = [];
for (let i = 0; i < boardNbs.length; i += 5) {
    const row = boardNbs.slice(i, i+5);
    board.push(row)
    if (board.length === 5) {
        boards.push(board);
        board = [];
    }
}

const mark = (x) => {
    for (const board of boards) {
        for (const row of board) {
            row.forEach((c) => {
                if (c[1] === x) {
                    c[0] = true;
                }
            })
        }
    }
}

const findWinningBoards = () => {
    let winningBoards = [];
    for (let b = 0 ; b < boards.length; b++) {
        const board = boards[b];
        for (let i = 0; i < board.length; i++) {
            let allMatchRow = true;
            let allMatchColumn = true;
            for (let j = 0; j < board[i].length; j++) {
                if (!board[i][j][0]) {
                    allMatchRow = false;
                }
                if (!board[j][i][0]) {
                    allMatchColumn = false;
                }
            }
            if (allMatchRow || allMatchColumn) {
                winningBoards.push([b, board])
                break;
            }
        }
    }
    return winningBoards;
}

const calculateScore = (board, winnningNumber) => {
    let sum = 0;
    for (const row of board) {
        // console.log(row)
        for (const c of row) {
            if (!c[0]) {
                sum += c[1];
            }
        }
    }
    console.log(sum)
    console.log(winnningNumber)
    return sum * winnningNumber;
}

const winningHistory = [];

for (let i = 0; i < numbers.length; i ++ ) {
    mark(numbers[i]);
    const winningBoards = findWinningBoards();

    for (const winningBoard of winningBoards) {

        if (!winningHistory.find(x => x[0] === winningBoard[0])) {
            const score = calculateScore(winningBoard[1], numbers[i]);
            console.log(`${winningBoard[0]} Won with ${numbers[i]}`)
            winningHistory.push([winningBoard[0], score]);
        }
    }
}

console.log(winningHistory)

// console.log(winningHistory)