'use strict';

const expect = require('chai').expect;
const memoization = require('./memoization');
const stickers = [
  'BQADAgADwQEAAhlgSwTFGD3TrpTVcAI',
  'BQADAgADfwEAAksODwABX50lGXzKqSsC',
  'BQADAgADrQEAAksODwAB4ac6Jt5y74UC',
  'BQADAgADgwEAAksODwABss0TWyMJO_YC'
];

describe('Testando memoization', () => {
  let _returns = [];
  it('não pode retornar igual a última', () => {
    _returns.push(memoization.execute());
    console.log('_returns', _returns);
    console.log('_returns[_returns.length-1]', _returns[_returns.length - 1]);
    expect(_returns[_returns.length - 1]).to.not.equal(memoization.execute());
  });
  it('não pode retornar igual a última', () => {
    _returns.push(memoization.execute());
    console.log('_returns', _returns);
    console.log('_returns[_returns.length-1]', _returns[_returns.length - 1]);
    expect(_returns[_returns.length - 1]).to.not.equal(memoization.execute());
  });
  it('não pode retornar igual a última', () => {
    _returns.push(memoization.execute());
    console.log('_returns', _returns);
    console.log('_returns[_returns.length-1]', _returns[_returns.length - 1]);
    expect(_returns[_returns.length - 1]).to.not.equal(memoization.execute());
  })
});