const fs = require('fs');
const input = fs.readFileSync('day1.input').toString();

const nbs = input.split('\n').map(x => parseInt(x))

let count = 0;
for (let i = 1; i < nbs.length; i++) {
    if (nbs[i] > nbs[i-1]) count++;
}

console.log(count)

// P2
let slidingWindowSize = 3;
let slidingWindowCount = 0;
const sumInWindow = (arr, index, windowSize) => {
    let sum = 0;
    let min = index - windowSize;
    if (min < 0) min = 0;

    for (let j = index; j > index - windowSize; j--){
        sum += arr[j];
    }
    return sum;
}

for (let i = 0; i < nbs.length; i++) {
    const prevSum = sumInWindow(nbs, i-1, slidingWindowSize);        
    const thisSum = sumInWindow(nbs, i, slidingWindowSize);
    if (thisSum > prevSum) {
        slidingWindowCount += 1;
    }
}

console.log(slidingWindowCount)

// Kosta-style
console.log(nbs.slice(3).filter((x, i) => nbs[i] < x).length)

// Kosta-style expanded
let c = 0;
for (let i = 3; i <= nbs.length; i++) {
    if (nbs[i-3] < nbs[i]) {
        c++;
    }
}
console.log(`Kosta expanded: ${c}`);