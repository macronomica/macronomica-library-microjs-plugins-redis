'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _microjs = require('@microjs/microjs');

var _microjs2 = _interopRequireDefault(_microjs);

var _index = require('../index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const should = _chai2.default.should();
const CONNECT_OPTIONS = {
  driver: 'sqlite3',
  filename: ':memory:'
};

describe('lifecicle', function () {

  it('#connect', () => new Promise((resolve, reject) => {
    const micro = (0, _microjs2.default)({
      level: _microjs.LEVEL_ERROR,
      plugins: [(0, _index2.default)(CONNECT_OPTIONS)]
    });
    let __client;

    micro.on(_index.EVENTS_CONNECT, result => should.exist(__client = result));

    return micro.run().then(() => micro.act(_index.PIN_CONNECTION)).then(client => should.equal(__client, client)).then(() => micro.end()).then(() => __client = null).then(resolve).catch(reject);
  }));

  it('#disconnect', () => new Promise((resolve, reject) => {
    const micro = (0, _microjs2.default)({
      level: _microjs.LEVEL_ERROR,
      plugins: [(0, _index2.default)(CONNECT_OPTIONS)]
    });

    micro.on(_index.EVENTS_DISCONNECT, result => should.equal(null, result));

    return micro.run().then(() => micro.end()).then(() => micro.act(_index.PIN_CONNECTION)).catch(error => Promise.all([should.equal(error.code, 'error.common/act.not.found'), should.equal(error.message, 'Вызов не существующего маршрута')])).then(resolve).catch(reject);
  }));
});
//# sourceMappingURL=lifecicle.spec.js.map