const debug = require('debug')('microjs:plugins:redis:connect');
import redis from 'redis';
import proxyClient from './proxy';
import retryStrategy from './retry-strategy';
import { EVENTS_CONNECT, EVENTS_CONNECT_ERROR } from './../constants';

export default (app, plugin, settings = {}) => {
  debug('Вызван метод "connect"');
  return new Promise((resolve, reject) => {
    debug('Иницируем клиента с настройками: %O', settings);
    const client = redis.createClient({
      retry_strategy: retryStrategy,
      ...settings
    });
  
    client
      .on("error", error => {
        debug('Ошибка клиента: %O', error);
        return app.log.error(error);
      })
      .on("ready", error => {
        if (error) {
          debug('При подключении клиента ошибка: %O', error);
          app.log.error(`Ошибка подключения к Redis:`, { plugin: { id: plugin.id, ...settings }, error });
          app.emit(EVENTS_CONNECT_ERROR, error);
          return reject(error);
        }
        
        const proxy = proxyClient(client);
        
        debug('Создано подключение к Redis, сообщаем об этом в консоль');
        app.log.info(`Создано подключение к Redis:`, { plugin: { id: plugin.id, ...settings } });
        
        debug('Вызываем событие: %s', EVENTS_CONNECT);
        app.emit(EVENTS_CONNECT, proxy);
  
        debug('Вызываем resolve c proxy');
        resolve(proxy);
      });
  })
};