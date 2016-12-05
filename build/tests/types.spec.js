'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DATA = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _microjs = require('@microjs/microjs');

var _microjs2 = _interopRequireDefault(_microjs);

var _index = require('../index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const micro = (0, _microjs2.default)({
  level: _microjs.LEVEL_WARN,
  plugins: [(0, _index2.default)({})]
});
const should = _chai2.default.should();
const KEY = 'test-types-key';
let result;

const DATA = exports.DATA = {
  null: null,
  'undefined': undefined,
  number: 1,
  string: 'string',
  boolean: true,
  date: new Date(),
  narray: [1, 2, 3],
  barray: [true, false],
  sarray: ['s1', 's2', 's3']
};

before(() => micro.run().then(() => micro.act(_extends({}, _index.PIN_CACHE_SET, { key: KEY, value: DATA }))).then(() => micro.act(_extends({}, _index.PIN_CACHE_GET, { key: KEY }))).then(raw => result = raw));

after(() => micro.act(_extends({}, _index.PIN_CACHE_DEL, { key: KEY })).then(() => micro.end()));

describe('types', function () {

  describe('#null', function () {
    it('should have property', () => result.should.have.property('null'));
    it('should equal null', () => should.equal(result.null, DATA.null));
  });

  describe('#undefined', function () {
    it('should have not property', () => result.should.have.not.property('undefined'));
  });

  describe('#number', function () {
    it('should be a number', () => result.number.should.be.a('number'));
    it('should equal number', () => result.number.should.equal(DATA.number));
  });

  describe('#string', function () {
    it('should be a string', () => result.string.should.be.a('string'));
    it('should equal string', () => result.string.should.equal(DATA.string));
  });

  describe('#boolean', function () {
    it('should be a boolean', () => result.boolean.should.be.a('boolean'));
    it('should equal boolean', () => result.boolean.should.equal(DATA.boolean));
  });

  describe('#date', function () {
    it('should be a date', () => result.date.should.be.a('date'));
    it('should equal date', () => result.date.toString().should.equal(DATA.date.toString()));
  });

  describe('#boolean[]', function () {
    it('should have property', () => result.should.have.property('barray'));
    it('should with length', () => result.barray.should.with.length(DATA.barray.length));

    it('items should be boolean', () => result.barray.forEach((row, i) => row.should.be.a('boolean')));
    it('items should equal', () => result.barray.forEach((row, i) => row.should.equal(DATA.barray[i])));
  });

  describe('#number[]', function () {
    it('should have property', () => result.should.have.property('narray'));
    it('should with length', () => result.narray.should.with.length(DATA.narray.length));

    it('items should be number', () => result.narray.forEach((row, i) => row.should.be.a('number')));
    it('items should equal', () => result.narray.forEach((row, i) => row.should.equal(DATA.narray[i])));
  });

  describe('#string[]', function () {
    it('should have property', () => result.should.have.property('sarray'));
    it('should with length', () => result.sarray.should.with.length(DATA.sarray.length));
    it('items should be string', () => result.sarray.forEach((row, i) => row.should.be.a('string')));
    it('items should equal', () => result.sarray.forEach((row, i) => row.should.equal(DATA.sarray[i])));
    it('items should with length', () => result.sarray.forEach((row, i) => row.should.with.length(DATA.sarray[i].length)));
  });
});
//# sourceMappingURL=types.spec.js.map