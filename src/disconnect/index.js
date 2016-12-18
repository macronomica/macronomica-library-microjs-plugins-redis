const debug = require('debug')('microjs:plugins:redis:disconnect');
import { EVENTS_DISCONNECT } from './../constants';

export default (app, plugin, settings) => {
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
        plugin: { id: plugin.id, ...settings }
      });
      
      debug('Вызываем событие: %s', EVENTS_DISCONNECT);
      app.emit(EVENTS_DISCONNECT, null);
      
      debug('Завершаем работу метода');
      resolve(null);
    });
  });
};