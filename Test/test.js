'use strict'

var chai = require('chai');
var expect = chai.expect;

chai.should();

function returnsName(name) {
  return name;
};

describe('1st unit test', function() {
  it('returns the name passed to the function', function() {
    returnsName('Ali').should.equal('Ali');
  });
});
