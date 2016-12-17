import { EVENTS_DISCONNECT } from './../constants';

export default (app, plugin, settings) => new Promise((resolve, reject) => {
  const client = plugin.client;
  
  if (!client || client.closing) {
    return resolve();
  }
  
  client.quit(() => {
    app.log.info(`Подключение к Redis разорвано`, {
      plugin: { id: plugin.id, ...settings }
    });

    app.emit(EVENTS_DISCONNECT, null);
    resolve(null);
  });
});