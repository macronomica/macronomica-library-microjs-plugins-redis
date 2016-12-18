'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash.isfunction');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const debug = require('debug')('microjs:plugins:redis:proxy');

exports.default = client => {
  debug('Создаем Proxy для методов клиента');
  return new Proxy(client, {
    get(target, property) {
      if ((0, _lodash2.default)(target[property])) {
        return function () {
          for (var _len = arguments.length, rest = Array(_len), _key = 0; _key < _len; _key++) {
            rest[_key] = arguments[_key];
          }

          return new Promise((resolve, reject) => {

            debug('Вызываем оригинальный метод "%s" клиента', property);
            target[property](...rest, (error, result) => {
              if (error) {
                debug('error: %O', error);
                return reject(error);
              }

              debug('success: %O', result);
              resolve(result);
            });
          });
        };
      }

      debug('Возвращаем оригинальное значение клиента: %s', property);
      return target[property];
    }
  });
};
//# sourceMappingURL=proxy.js.map