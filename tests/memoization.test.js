'use strict';

const expect = require('chai').expect;
const memoization = require('./memoization')

const stickers = [
  'BQADAgADwQEAAhlgSwTFGD3TrpTVcAI',
  'BQADAgADfwEAAksODwABX50lGXzKqSsC',
  'BQADAgADrQEAAksODwAB4ac6Jt5y74UC',
  'BQADAgADgwEAAksODwABss0TWyMJO_YC'
];

let _returns = [];

describe('Testando memoization', () => {
  it('não pode retornar igual a última', () => {
    _returns.push(memoization.execute());
    expect(_returns[_returns.length-1]).to.not.equal(memoization.execute());
  })
});

// console.log('_returns',_returns[_returns.length-1])
// console.log('memoization.execute()', memoization.execute())

// assert.notEqual(memoization.execute(), _returns[_returns.length-1])

// _returns.push(memoization.execute());
// console.log('_returns',_returns)
// _returns.push(memoization.execute());
// console.log('_returns',_returns)
// _returns.push(memoization.execute());
// console.log('_returns',_returns)