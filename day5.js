const fs = require('fs');
const input = fs.readFileSync('day5.sample.input').toString()

let max = [-1, -1];

const coords = input.split('\n').map(x => x.split(' -> ').map(x => x.split(',').map((y, i) => {
    const val = parseInt(y);
    if (val > max[i]) {
        max[i] = val;
    }
    return val;
})));

max = max.map(x => x+1) 

const board = [];
for (let i = 0; i < max[1]; i++) {
    const row = new Array(max[0]).fill(0);
    board.push(row)
}

const printBoard = (board) => {
    console.log('  ' + new Array(board[0].length).fill(0).map((_, i) => i).join(''))
    for (let i = 0; i < board.length; i++) {
        const row = board[i];
        console.log(`${i} ${row.map(x => x == 0 ? '.' : x).join('')}`);
    }
}

for (const coord of coords) { //.filter(x => x[0][0] === x[1][0] || x[0][1] === x[1][1])) { // Part 1
    const [ start, end ] = coord;
    const multiplierX = start[0] < end[0] ? 1 : -1;
    const multiplierY = start[1] < end[1] ? 1 : -1;

    let i = start[0];
    let j = start[1];
    while (true) {
        board[j][i] += 1;
        if (i == end[0] && j == end[1]) break;
        if (i != end[0]) i += multiplierX;
        if (j != end[1]) j += multiplierY;
    }
}


printBoard(board);
const nb = board.reduce((acc, x) => acc + x.filter(x => x >= 2).length, 0);
console.log(nb)
