'use strict';

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

before(() => micro.run().then(() => micro.act(_extends({}, _index.PIN_TAGS_DEL_ALL))));

after(() => micro.act(_extends({}, _index.PIN_TAGS_DEL_ALL)).then(() => micro.end()));

describe('tags', function () {
  describe('#set', function () {

    it('should set one tag', () => micro.act(_extends({}, _index.PIN_TAGS_SET, { tags: ['user-1'] })).then(tags => tags.should.have.property('user-1')).then(() => micro.act(_extends({}, _index.PIN_TAGS_DEL_ALL))));

    it('вернет объект с тегами и новыми значениями', () => micro.act(_extends({}, _index.PIN_TAGS_SET, {
      tags: ['user-1', 'user-2']
    })).then(tags => Promise.all([tags.should.be.a('object').have.all.keys('user-1', 'user-2'), tags['user-1'].should.be.a('number'), tags['user-2'].should.be.a('number')])).then(() => micro.act(_extends({}, _index.PIN_TAGS_DEL_ALL))));
  });

  describe('#has', function () {

    it('вернет true', () => micro.act(_extends({}, _index.PIN_TAGS_SET, { tags: ['user-1'] })).then(tags => micro.act(_extends({}, _index.PIN_TAGS_HAS, { tags }))).then(exist => exist.should.be.a('boolean').equal(true)).then(() => micro.act(_extends({}, _index.PIN_TAGS_DEL_ALL))));

    it('вернет false', () => micro.act(_extends({}, _index.PIN_TAGS_SET, { tags: ['user-1'] })).then(tags => micro.act(_extends({}, _index.PIN_TAGS_HAS, { tags: Object.assign(tags, { 'user-1': tags + 10 }) }))).then(exist => exist.should.be.a('boolean').equal(false)).then(() => micro.act(_extends({}, _index.PIN_TAGS_DEL_ALL))));
  });

  describe('#get', function () {

    it('вернет объект со значениями null для переданных тегов', () => micro.act(_extends({}, _index.PIN_TAGS_GET, { tags: ['user-1', 'user-2', 'user-3'] })).then(tags => tags.should.to.contain.all.keys({ 'user-1': null, 'user-2': null, 'user-3': null })));

    it('вернет объект со значениями для переданных тегов', () => micro.act(_extends({}, _index.PIN_TAGS_SET, { tags: ['user-1', 'user-2'] })).then(tags => micro.act(_extends({}, _index.PIN_TAGS_GET, { tags: ['user-1', 'user-2'] })).then(result => Promise.all([result.should.to.contain.all.keys(['user-1', 'user-2']), result['user-1'].should.equal(tags['user-1']), result['user-2'].should.equal(tags['user-2'])]))).then(() => micro.act(_extends({}, _index.PIN_TAGS_DEL_ALL))));
  });

  describe('#del', function () {

    it('вернет объект со значениtv null для переданных тегов', () => micro.act(_extends({}, _index.PIN_TAGS_SET, { tags: ['user-1', 'user-2'] })).then(tags => micro.act(_extends({}, _index.PIN_TAGS_DEL, { tags: ['user-1'] })).then(() => micro.act(_extends({}, _index.PIN_TAGS_GET, { tags: ['user-1'] }))).then(result => Promise.all([result.should.to.contain.all.keys(['user-1']), result.should.have.property('user-1').equal(null)]))).then(() => micro.act(_extends({}, _index.PIN_TAGS_DEL_ALL))));
  });

  describe('#get-all', function () {

    it('вернет объект со значениями для переданных тегов', () => micro.act(_extends({}, _index.PIN_TAGS_SET, { tags: ['user-1', 'user-2'] })).then(tags => micro.act(_extends({}, _index.PIN_TAGS_GET_ALL)).then(result => Promise.all([result.should.to.contain.all.keys(['user-1', 'user-2']), result['user-1'].should.equal(tags['user-1']), result['user-2'].should.equal(tags['user-2'])]))).then(() => micro.act(_extends({}, _index.PIN_TAGS_DEL_ALL))));
  });

  describe('#del-all', function () {

    it('вернет объект со значениями для переданных тегов', () => micro.act(_extends({}, _index.PIN_TAGS_SET, { tags: ['user-1', 'user-2'] })).then(() => micro.act(_extends({}, _index.PIN_TAGS_DEL_ALL))).then(tags => micro.act(_extends({}, _index.PIN_TAGS_GET_ALL)).then(result => should.equal(null, result))));
  });
});
//# sourceMappingURL=tags.spec.js.map