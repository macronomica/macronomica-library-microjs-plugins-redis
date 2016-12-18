'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _redis = require('redis');

var _redis2 = _interopRequireDefault(_redis);

var _proxy = require('./proxy');

var _proxy2 = _interopRequireDefault(_proxy);

var _retryStrategy = require('./retry-strategy');

var _retryStrategy2 = _interopRequireDefault(_retryStrategy);

var _constants = require('./../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const debug = require('debug')('microjs:plugins:redis:connect');

exports.default = function (app, plugin) {
  let settings = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  debug('Вызван метод "connect"');
  return new Promise((resolve, reject) => {
    debug('Иницируем клиента с настройками: %O', settings);
    const client = _redis2.default.createClient(_extends({
      retry_strategy: _retryStrategy2.default
    }, settings));

    client.on("error", error => {
      debug('Ошибка клиента: %O', error);
      return app.log.error(error);
    }).on("ready", error => {
      if (error) {
        debug('При подключении клиента ошибка: %O', error);
        app.log.error(`Ошибка подключения к Redis:`, { plugin: _extends({ id: plugin.id }, settings), error });
        app.emit(_constants.EVENTS_CONNECT_ERROR, error);
        return reject(error);
      }

      const proxy = (0, _proxy2.default)(client);

      debug('Создано подключение к Redis, сообщаем об этом в консоль');
      app.log.info(`Создано подключение к Redis:`, { plugin: _extends({ id: plugin.id }, settings) });

      debug('Вызываем событие: %s', _constants.EVENTS_CONNECT);
      app.emit(_constants.EVENTS_CONNECT, proxy);

      debug('Вызываем resolve c proxy');
      resolve(proxy);
    });
  });
};
//# sourceMappingURL=index.js.map