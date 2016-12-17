import redis from 'redis';
import isFunction from 'lodash.isfunction';
import retryStrategy from './retry-strategy';
import { EVENTS_CONNECT, EVENTS_CONNECT_ERROR } from './../constants';

export default (app, plugin, settings = {}) => new Promise((resolve, reject) => {
  const client = redis.createClient({
    retry_strategy: retryStrategy,
    ...settings
  });
  
  client
    .on("error", app.log.error)
    .on("ready", error => {
      if (error) {
        app.log.error(`Ошибка подключения к Redis:`, { plugin: { id: plugin.id, ...settings }, error });
        app.emit(EVENTS_CONNECT_ERROR, error);
        return reject(error);
      }

      const proxy = new Proxy(client, {
        get(target, property) {
          if (isFunction(target[ property ])) {
            return (...rest) => new Promise((resolve, reject) =>
              target[ property ](...rest, (err, result) => err ? reject(err) : resolve(result)));
          }

          return target[ property ];
        }
      });

      app.log.info(`Создано подключение к Redis:`, { plugin: { id: plugin.id, ...settings } });
      app.emit(EVENTS_CONNECT, proxy);
      resolve(proxy);
    });
});