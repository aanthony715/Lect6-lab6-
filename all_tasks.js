const syncRequest = require('sync-request');
const fs = require('fs');

console.log('=== ЛАБОРАТОРНАЯ РАБОТА 4 ===\n');


// TASK 1

console.log('TASK 1');
console.log('='.repeat(40));

const url1 = 'http://perm.1gb.ru/txt/labrab04-1.txt';
const file1 = './files/labrab04-1.txt';

console.log('Скачиваем файл для task 1...');
const response1 = syncRequest('GET', url1);

if (!fs.existsSync('./files')) {
    fs.mkdirSync('./files');
}

fs.writeFileSync(file1, response1.getBody('utf8'));
console.log('Файл сохранен: ' + file1 + '\n');

const content1 = fs.readFileSync(file1, 'utf8');
const lines1 = content1.split('\n').filter(line => line.trim());

console.log('Прочитано чисел: ' + lines1.length);

const findMaxTwoDigitForIndex = (numbers) => {
    let max = -1;
    for (let i = 0; i < numbers.length; i++) {
        const num = parseInt(numbers[i]);
        if (num >= 10 && num <= 99 && num > max) {
            max = num;
        }
    }
    return max > 0 ? max : null;
};

const findMaxTwoDigitForOf = (numbers) => {
    let max = -1;
    for (const line of numbers) {
        const num = parseInt(line);
        if (num >= 10 && num <= 99 && num > max) {
            max = num;
        }
    }
    return max > 0 ? max : null;
};

const findMaxTwoDigitWhile = (numbers) => {
    let max = -1;
    let i = 0;
    while (i < numbers.length) {
        const num = parseInt(numbers[i]);
        if (num >= 10 && num <= 99 && num > max) {
            max = num;
        }
        i++;
    }
    return max > 0 ? max : null;
};

const findMaxTwoDigitReduce = (numbers) => {
    const result = numbers.reduce((max, line) => {
        const num = parseInt(line);
        if (num >= 10 && num <= 99 && num > max) {
            return num;
        }
        return max;
    }, -1);
    return result > 0 ? result : null;
};

const findMaxTwoDigitMathMax = (numbers) => {
    const twoDigitNumbers = numbers
        .map(line => parseInt(line))
        .filter(num => num >= 10 && num <= 99);

    if (twoDigitNumbers.length === 0) return null;
    return Math.max(...twoDigitNumbers);
};


const result1_1 = findMaxTwoDigitForIndex(lines1);
const result1_2 = findMaxTwoDigitForOf(lines1);
const result1_3 = findMaxTwoDigitWhile(lines1);
const result1_4 = findMaxTwoDigitReduce(lines1);
const result1_5 = findMaxTwoDigitMathMax(lines1);

console.log('1.1 for index:    ' + result1_1);
console.log('1.2 for of:       ' + result1_2);
console.log('1.3 while:        ' + result1_3);
console.log('1.4 reduce:       ' + result1_4);
console.log('1.5 Math.max:     ' + result1_5);


const twoDigitNums = lines1
    .map(n => parseInt(n))
    .filter(n => n >= 10 && n <= 99);
console.log('\nДвузначные числа: ' + twoDigitNums.sort((a, b) => a - b).join(', '));

console.log('\n' + '='.repeat(40) + '\n');

// TASK 2


console.log('TASK 2');
console.log('='.repeat(40));

const url2 = 'http://perm.1gb.ru/txt/labrab04-2.txt';
const file2 = './files/labrab04-2.txt';

console.log('Скачиваем файл для task 2...');
const response2 = syncRequest('GET', url2);
fs.writeFileSync(file2, response2.getBody('utf8'));
console.log('Файл сохранен: ' + file2 + '\n');

const content2 = fs.readFileSync(file2, 'utf8');
const allLines2 = content2.split('\n').filter(line => line.trim());

const matrix = allLines2.map(line => {
    return line.trim()
        .split(/\s+/)
        .map(num => parseInt(num))
        .filter(num => !isNaN(num));
});

console.log('Прочитано строк: ' + matrix.length);

let countAllOddRows = 0;
for (let i = 0; i < matrix.length; i++) {
    const row = matrix[i];
    if (row.length === 0) continue;

    let allOdd = true;
    for (let j = 0; j < row.length; j++) {
        if (row[j] % 2 === 0) {
            allOdd = false;
            break;
        }
    }

    if (allOdd) {
        countAllOddRows++;
    }
}

console.log('\n2.1 Строк со всеми нечетными числами: ' + countAllOddRows);

let maxSum = -1;
let firstIndex = -1;

for (let i = 0; i < matrix.length; i++) {
    const row = matrix[i];

    let sumOdds = 0;
    for (let j = 0; j < row.length; j++) {
        if (row[j] % 2 !== 0) {
            sumOdds += row[j];
        }
    }

    if (sumOdds > maxSum) {
        maxSum = sumOdds;
        firstIndex = i;
    }
}

console.log('2.2 Первый индекс строки с макс. суммой нечетных: ' + firstIndex);

if (firstIndex >= 0) {
    const row = matrix[firstIndex];
    console.log('   Строка ' + firstIndex + ': [' + row.join(', ') + ']');
    console.log('   Сумма нечетных: ' + maxSum);
}

console.log('\n' + '='.repeat(40) + '\n');

// TASK 3

console.log('TASK 3');
console.log('='.repeat(40));

const url3 = 'http://perm.1gb.ru/txt/labrab04-3.txt';
const file3 = './files/labrab04-3.txt';

console.log('Скачиваем файл для task 3...');
const response3 = syncRequest('GET', url3);
fs.writeFileSync(file3, response3.getBody('utf8'));
console.log('Файл сохранен: ' + file3 + '\n');

const content3 = fs.readFileSync(file3, 'utf8');
const allLines3 = content3.split('\n').filter(line => line.trim());

const languages = [];
for (const line of allLines3) {
    const parts = line.split(';');
    if (parts.length >= 3) {
        languages.push({
            name: parts[0].trim(),
            rating: parseFloat(parts[1]),
            year: parseInt(parts[2])
        });
    }
}

console.log('Прочитано языков: ' + languages.length);


console.log('\n1. Языки по алфавиту (по возрастанию):');
const sortedAlphabetically = [...languages].sort((a, b) =>
    a.name.localeCompare(b.name)
);

sortedAlphabetically.forEach(lang => {
    console.log('   ' + lang.name);
});


console.log('\n2. Языки по убыванию рейтинга:');
console.log('Рейтинг  |  Название');
console.log('-'.repeat(30));

const sortedByRating = [...languages].sort((a, b) => b.rating - a.rating);

sortedByRating.forEach(lang => {
    const ratingStr = lang.rating.toFixed(2).padStart(6);
    console.log(ratingStr + '  |  ' + lang.name);
});



