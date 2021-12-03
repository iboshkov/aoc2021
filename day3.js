const fs = require('fs');

const getCommonDigit = (arr) => {
    const numBits = arr[0].length;
    return arr.reduce((acc, x, i) => {
        x.split('').forEach((c, i) => acc[i] += parseInt(c));
        return acc;
    }, new Array(numBits).fill(0));    
}

const calculateHighLowBitCriteria = (candidates) => {
    const newNum = getCommonDigit(candidates);
    const gamma = newNum.map(x => x / candidates.length >= 0.5 ? 1 : 0);
    const epsilon = gamma.map(x => x > 0 ? 0 : 1);
    return [gamma, epsilon];    
}

const filterBitCriteria = (source, highLow) => {
    const numBits = source[0].length;
    let candidates = source;
    let match = null;

    for (let bitIndex = 0; bitIndex < numBits; bitIndex++) {
        const [gamma, epsilon] = calculateHighLowBitCriteria(candidates);

        const localMatch = [epsilon, gamma][highLow];

        candidates = candidates.filter(x =>{
            return x[bitIndex] === localMatch[bitIndex].toString();
        });
        
        if (candidates.length === 1) {
            match = candidates[0];
            break;
        }
    }
    
    return match;
}


const part1 = (lineInputs) => {
    const [gamma, epsilon] = calculateHighLowBitCriteria(lineInputs);
    const gammaDec = parseInt(gamma.join(''), 2);
    const epsilonDec = parseInt(epsilon.join(''), 2);

    console.log(gammaDec * epsilonDec);
}

const part2 = (lineInputs) => {
    const match = filterBitCriteria(lineInputs, 1);
    const match1 = filterBitCriteria(lineInputs, 0);
    console.log(parseInt(match, 2) * parseInt(match1, 2))
}


const input = fs.readFileSync('day3.input').toString()
const lineInputs = input.split('\n');

part1(lineInputs);
part2(lineInputs);