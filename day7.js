const fs = require('fs');
const input = fs.readFileSync('day7.sample.input').toString().split(',').map(Number)

const max = input.sort((a, b) => b-a)[0];

const sumBack = (x) => {
    let sum = 0;
    while (x > 0) sum += x--;
    return sum;
}

let minPart1 = null;
let minPart2 = null;

for (let i = 0; i <= max; i++) {
    const fuelPart1 = input.map(x => Math.abs(i - x)).reduce((prev, x) => prev+x, 0);
    const fuelPart2 = input.map(x => sumBack(Math.abs(i - x))).reduce((prev, x) => prev+x, 0);
    if (minPart1 === null || fuelPart1 < minPart1) {
        minPart1 = fuelPart1;
    }
    if (minPart2 === null || fuelPart2 < minPart2) {
        minPart2 = fuelPart2;
    }
}

console.log(minPart1);
console.log(minPart2);