'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DATA = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _microjs = require('@microjs/microjs');

var _microjs2 = _interopRequireDefault(_microjs);

var _index = require('../index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const micro = (0, _microjs2.default)({
  level: _microjs.LEVEL_WARN,
  plugins: [(0, _index2.default)(_config2.default.has('redis') ? _config2.default.get('redis') : {})]
});

const should = _chai2.default.should();
const key = 'test-key';
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

before(() => micro.run().then(() => micro.act(_extends({}, _index.PIN_CACHE_DEL, { key }))));

after(() => micro.act(_extends({}, _index.PIN_CACHE_DEL, { key })).then(() => micro.end()));

describe('cache', function () {

  it('#plugin.get -> должен вернуть null', () => micro.act(_extends({}, _index.PIN_CACHE_GET, { key })).then(result => should.equal(null, result)));

  it('#plugin.set + plugin.get -> должен вернуть объект', () => micro.act(_extends({}, _index.PIN_CACHE_SET, { key, value: DATA })).then(() => micro.act(_extends({}, _index.PIN_CACHE_GET, { key }))).then(result => result.should.be.a('object')).then(() => micro.act(_extends({}, _index.PIN_CACHE_DEL, { key }))).then(() => micro.act(_extends({}, _index.PIN_CACHE_GET, { key }))).then(result => should.equal(null, result)).then(() => micro.act(_extends({}, _index.PIN_CACHE_DEL, { key }))));

  it('#plugin.read + callback -> должен вернуть объект', () => micro.act(_extends({}, _index.PIN_CACHE_GET, { key, setCb: () => DATA })).then(result => should.equal(result, DATA)).then(() => micro.act(_extends({}, _index.PIN_CACHE_GET, { key }))).then(result => Promise.all([should.not.equal(null, result), result.should.be.a('object')])).then(() => micro.act(_extends({}, _index.PIN_CACHE_DEL, { key }))));

  it('#plugin.read + callback():Promise -> должен вернуть объект', () => micro.act(_extends({}, _index.PIN_CACHE_GET, { key, setCb: () => Promise.resolve(DATA) })).then(result => should.equal(result, DATA)).then(() => micro.act(_extends({}, _index.PIN_CACHE_GET, { key }))).then(result => Promise.all([should.not.equal(null, result), result.should.be.a('object')])).then(() => micro.act(_extends({}, _index.PIN_CACHE_DEL, { key }))));
});
//# sourceMappingURL=cache.spec.js.map