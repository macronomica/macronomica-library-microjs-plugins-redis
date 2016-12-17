'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _constants = require('./../constants');

exports.default = (app, plugin, settings) => new Promise((resolve, reject) => {
  const client = plugin.client;

  if (!client || client.closing) {
    return resolve();
  }

  client.quit(() => {
    app.log.info(`Подключение к Redis разорвано`, {
      plugin: _extends({ id: plugin.id }, settings)
    });

    app.emit(_constants.EVENTS_DISCONNECT, null);
    resolve(null);
  });
});
//# sourceMappingURL=index.js.map