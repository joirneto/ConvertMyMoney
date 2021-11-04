const { TestWatcher } = require('@jest/core');
const {convert, toMoney} = require('./convert');

test('convert 4 to 4', ()=>{
  expect(convert(4,4)).toBe(16);
})

test('convert 0 to 4', ()=>{
  expect(convert(0,4)).toBe(0);
})

test('toMoney converts float', ()=>{
  expect(toMoney(2)).toBe('2.00')
})

test('toMoney converts float', ()=>{
  expect(toMoney('2')).toBe('2.00')
})