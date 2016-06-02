'use strict';

const stickers = [
  'BQADAgADwQEAAhlgSwTFGD3TrpTVcAI',
  'BQADAgADfwEAAksODwABX50lGXzKqSsC',
  'BQADAgADrQEAAksODwAB4ac6Jt5y74UC',
  'BQADAgADgwEAAksODwABss0TWyMJO_YC'
];
let counter = 0;
let memoization = [];

const memoize = (rand) => {
  if (rand !== memoization[memoization.length - 1])
    memoization.push(rand);
  else {
    rand = _rand(stickers);
    memoization.push(rand);
  }
};
const testMemoization = (stckr) => {
  console.log('stckr', stckr);
  if (memoization[memoization.length - 1] === stckr) return _rand(stickers);
  return stckr;
};
const _rand = (stickers) => Math.floor(Math.random() * stickers.length);
const execute = () => {
  let stckr = testMemoization(_rand(stickers));
  console.log('memoize', memoize(stckr));
  return memoize(stckr);
};
module.exports = {
  execute: execute
};
