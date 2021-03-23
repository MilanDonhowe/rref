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




/* Test Cases */
test('Testing Matrix Reduction 1... (reduced form has fractions)', () => {
    expect( SOLVE(M1) ).toStrictEqual(M1Solved);
});
test('Testing Matrix Reduction 2... (identity matrix)', () => {
    expect( SOLVE(M2) ).toStrictEqual(M2Solved);
});
test('Testing Matrix Reduction 3... (reduced form is integers)', () => {
    expect( SOLVE(M3) ).toStrictEqual(M3Solved);
});
