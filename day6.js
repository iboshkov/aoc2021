const fs = require('fs');
const input = fs.readFileSync('day6.sample.input').toString().split(',').map(Number)

const counters = new Array(9).fill(0);

for (let i = 0; i < input.length; i++) {
    counters[input[i]] += 1;
}

for (let i = 0; i < 256; i++) {
    const initial0 = counters[0];

    for (let j = 0; j < counters.length; j++) {
        counters[j] = counters[j+1];
    }

    counters[6] += initial0;
    counters[8] = initial0;
}


console.log(counters.reduce((prev, x) => prev + x, 0));