'use strict';

const expect = require('chai').expect;
const s = require('../modules/utils/regexutils');

describe('Regex Utils', () => {
  describe('Filtrar evals maliciosos', ()=> {
    it('Espera que nenhum comando prejudicial possa ser executado', () => {
      expect(s.isInputOK('5+5;let exec = require("child_process").exec;')).to.be.false;
      expect(s.isInputOK('5+5;process.env.API_TOKEN;')).to.be.false;
      expect(s.isInputOK('5+5;process.exit();')).to.be.false;
      expect(s.isInputOK('5+5;process.env')).to.be.false;
      expect(s.isInputOK('5+5;new Date();')).to.be.true;
      expect(s.isInputOK('5+5;')).to.be.true;
      expect(s.isInputOK('Math.sqrt(25);')).to.be.true
    });
  });
});