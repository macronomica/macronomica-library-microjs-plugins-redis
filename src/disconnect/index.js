import { EVENTS_DISCONNECT } from './../constants';

export default (app, plugin, client) => new Promise((resolve, reject) => {
  if (!client || client.closing) {
    return resolve();
  }
  
  client.quit(() => {
    app.log.info(`Подключение к Redis разорвано`, {
      id: plugin.id
    });

    app.emit(EVENTS_DISCONNECT, null);
    resolve(null);
  });
});