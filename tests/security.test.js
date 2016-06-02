'use strict';

const expect = require('chai').expect;
const s = require('../modules/security');

describe('Segurança', () => {
  describe('Filtrar mensagens maliciosas, apenas se forem eval', ()=> {
    it('Espera que evals mailiciosos sejam barrados', () => {
      expect(s.isSecure({text: '5+5;process.env.API_KEY'}, true)).to.be.false;
      expect(s.isSecure({text: 'new Date();require("anything");'}, true)).to.be.false;
      expect(s.isSecure({text: '5+5'}, true)).to.be.true;
      expect(s.isSecure({text: 'process.env.API_KEY'}, false)).to.be.true;
      expect(s.isSecure({text: 'new Date()'}, true)).to.be.true;
    });
  });
});