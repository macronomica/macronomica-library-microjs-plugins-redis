import config from 'config';
import chai from 'chai';
import Microjs, { LEVEL_WARN } from '@microjs/microjs';
import Plugin, { PIN_CACHE_GET, PIN_CACHE_SET, PIN_CACHE_DEL } from '../index';

const micro = Microjs({
  level  : LEVEL_WARN,
  plugins: [
    Plugin(config.has('redis') ? config.get('redis') : {})
  ]
});
const should = chai.should();
const KEY = 'test-types-key';
let result;

export const DATA = {
  null       : null,
  'undefined': undefined,
  number     : 1,
  string     : 'string',
  boolean    : true,
  date       : new Date(),
  narray     : [ 1, 2, 3 ],
  barray     : [ true, false ],
  sarray     : [ 's1', 's2', 's3' ]
};

before(() => micro.run()
  .then(() => micro.act({ ...PIN_CACHE_SET, key: KEY, value: DATA }))
  .then(() => micro.act({ ...PIN_CACHE_GET, key: KEY }))
  .then(raw => result = raw)
);

after(() => micro.act({ ...PIN_CACHE_DEL, key: KEY })
  .then(() => micro.end())
);

describe('types', function() {

  describe('#null', function() {
    it('should have property', () => result.should.have.property('null'));
    it('should equal null', () => should.equal(result.null, DATA.null));
  });

  describe('#undefined', function() {
    it('should have not property', () => result.should.have.not.property('undefined'));
  });

  describe('#number', function() {
    it('should be a number', () => result.number.should.be.a('number'));
    it('should equal number', () => result.number.should.equal(DATA.number));
  });

  describe('#string', function() {
    it('should be a string', () => result.string.should.be.a('string'));
    it('should equal string', () => result.string.should.equal(DATA.string));
  });

  describe('#boolean', function() {
    it('should be a boolean', () => result.boolean.should.be.a('boolean'));
    it('should equal boolean', () => result.boolean.should.equal(DATA.boolean));
  });

  describe('#date', function() {
    it('should be a date', () => result.date.should.be.a('date'));
    it('should equal date', () => result.date.toString().should.equal(DATA.date.toString()));
  });

  describe('#boolean[]', function() {
    it('should have property', () => result.should.have.property('barray'));
    it('should with length', () => result.barray.should.with.length(DATA.barray.length));

    it('items should be boolean', () => result.barray.forEach((row, i) => row.should.be.a('boolean')));
    it('items should equal', () => result.barray.forEach((row, i) => row.should.equal(DATA.barray[ i ])));
  });

  describe('#number[]', function() {
    it('should have property', () => result.should.have.property('narray'));
    it('should with length', () => result.narray.should.with.length(DATA.narray.length));

    it('items should be number', () => result.narray.forEach((row, i) => row.should.be.a('number')));
    it('items should equal', () => result.narray.forEach((row, i) => row.should.equal(DATA.narray[ i ])));
  });

  describe('#string[]', function() {
    it('should have property', () => result.should.have.property('sarray'));
    it('should with length', () => result.sarray.should.with.length(DATA.sarray.length));
    it('items should be string', () => result.sarray.forEach((row, i) => row.should.be.a('string')));
    it('items should equal', () => result.sarray.forEach((row, i) => row.should.equal(DATA.sarray[ i ])));
    it('items should with length', () => result.sarray.forEach((row, i) => row.should.with.length(DATA.sarray[ i ].length)));
  });

});