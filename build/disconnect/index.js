'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _constants = require('./../constants');

const debug = require('debug')('microjs:plugins:redis:disconnect');

exports.default = (app, plugin, settings) => {
  debug('Вызван метод "disconnect"');
  return new Promise((resolve, reject) => {
    const client = plugin.client;

    if (!client || client.closing) {
      debug('Подключение к Redis было разорвано ранее, завершаем работу метода');
      return resolve();
    }

    debug('Вызываем метод: client.quit');
    client.quit(() => {
      debug('Подключение к Redis было разорвано, сообщаем об этом в консоль');
      app.log.info(`Подключение к Redis разорвано`, {
        plugin: _extends({ id: plugin.id }, settings)
      });

      debug('Вызываем событие: %s', _constants.EVENTS_DISCONNECT);
      app.emit(_constants.EVENTS_DISCONNECT, null);

      debug('Завершаем работу метода');
      resolve(null);
    });
  });
};
//# sourceMappingURL=index.js.map