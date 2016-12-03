'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _constants = require('./../constants');

exports.default = (app, plugin) => new Promise((resolve, reject) => {
  const client = plugin.client;

  if (!client || client.closing) {
    return resolve();
  }

  client.quit(() => {
    app.log.info(`Подключение к Redis разорвано`, {
      id: plugin.id
    });

    app.emit(_constants.EVENTS_DISCONNECT, null);
    resolve(null);
  });
});
//# sourceMappingURL=index.js.map