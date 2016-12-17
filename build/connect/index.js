'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _redis = require('redis');

var _redis2 = _interopRequireDefault(_redis);

var _lodash = require('lodash.isfunction');

var _lodash2 = _interopRequireDefault(_lodash);

var _retryStrategy = require('./retry-strategy');

var _retryStrategy2 = _interopRequireDefault(_retryStrategy);

var _constants = require('./../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (app, plugin) {
  let settings = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return new Promise((resolve, reject) => {
    const client = _redis2.default.createClient(_extends({
      retry_strategy: _retryStrategy2.default
    }, settings));

    client.on("error", app.log.error).on("ready", error => {
      if (error) {
        app.log.error(`Ошибка подключения к Redis:`, { plugin: _extends({ id: plugin.id }, settings), error });
        app.emit(_constants.EVENTS_CONNECT_ERROR, error);
        return reject(error);
      }

      const proxy = new Proxy(client, {
        get(target, property) {
          if ((0, _lodash2.default)(target[property])) {
            return function () {
              for (var _len = arguments.length, rest = Array(_len), _key = 0; _key < _len; _key++) {
                rest[_key] = arguments[_key];
              }

              return new Promise((resolve, reject) => target[property](...rest, (err, result) => err ? reject(err) : resolve(result)));
            };
          }

          return target[property];
        }
      });

      app.log.info(`Создано подключение к Redis:`, { plugin: _extends({ id: plugin.id }, settings) });
      app.emit(_constants.EVENTS_CONNECT, proxy);
      resolve(proxy);
    });
  });
};
//# sourceMappingURL=index.js.map