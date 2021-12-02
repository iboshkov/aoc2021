const fs = require('fs');
const input = fs.readFileSync('day2.input').toString();

const Orientations = {
    Horizontal: 0,
    Depth: 1,
    Aim: 2
};

const final = input.split('\n').map(x => x.split(' ')).reduce((acc, x) => {
    const [ orientation, speed ] = x;
    
    let multiplier = 1;
    if (orientation === 'up') multiplier = -1;

    if (orientation === 'up' || orientation === 'down') {
        acc[Orientations.Aim] += parseInt(speed) * multiplier;
    }

    if (orientation === 'forward') {
        acc[Orientations.Horizontal] += parseInt(speed) * multiplier;
        acc[Orientations.Depth] += acc[Orientations.Aim] * parseInt(speed);
    }

    return acc;
}, [0, 0, 0]); // horizontal, depth, aim

console.log(final[Orientations.Horizontal] * final[Orientations.Depth])