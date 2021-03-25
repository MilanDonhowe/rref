/*
    Jest Unit Tests for RowReduce.js

    Intended to make sure our row reduction operates
    as we intend.
*/


import {rref} from "./RowReduce.js"

const Fraction = require('fraction.js');

// some quick matrix transforms so writing the test-cases is a bit easier.
const TRANSFORM = (mat) => mat.map(row => row.map(entry => Fraction(entry)));
const SOLVE = (mat) => rref(TRANSFORM(mat)).map(row => row.map(entry => entry.toFraction()))

let M1 = [
    ['1', '-2', '-1', '3', '0'],
    ['-2', '4', '5', '-5', '3'],
    ['3', '-6', '-6', '8', '2']
];

let M1Solved = [
    ['1', '-2', '0', '10/3', '0'],
    ['0', '0', '1', '1/3', '0'],
    ['0', '0', '0', '0', '1']
]

let M2 = [
    ['1', '0'],
    ['0', '1'],
]

let M2Solved = [
    ['1', '0'],
    ['0', '1']
]

let M3 = [
    ['1', '-3', '-5', '0'],
    ['0', '1', '1', '2']
]

let M3Solved = [
    ['1', '0', '-2', '6'],
    ['0', '1', '1', '2']
]

let M4 = [
    ['0', '-3', '1', '-1'],
    ['-2', '1', '0', '3']
]
let M4Solved = [
    ['1', '0', '-1/6', '-4/3'],
    ['0', '1', '-1/3', '1/3']
]

let M5 = [
    ['8', '1',  '6'],
    ['3', '5',  '7'],
    ['4', '9',  '2']
]

let M5Solved = [
    ['1', '0', '0'],
    ['0', '1', '0'],
    ['0', '0', '1']
]


/* Test Cases */
test('Testing Matrix Reductions with rref()', () => {
    const problems = [M1, M2, M3, M4, M5];
    const solutions = [M1Solved, M2Solved, M3Solved, M4Solved, M5Solved];
    for (const [index, prob] of problems.entries()){
        expect ( SOLVE(prob) ).toStrictEqual(solutions[index]);
    }
});

