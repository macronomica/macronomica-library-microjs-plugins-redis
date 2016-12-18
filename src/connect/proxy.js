const debug = require('debug')('microjs:plugins:redis:proxy');
import isFunction from 'lodash.isfunction';

export default client => {
  debug('Создаем Proxy для методов клиента');
  return new Proxy(client, {
    get(target, property) {
      if (isFunction(target[ property ])) {
        return (...rest) => {
          return new Promise((resolve, reject) => {
          
            debug('Вызываем оригинальный метод "%s" клиента', property);
            target[ property ](...rest, (error, result) => {
              if (error) {
                debug('error: %O', error);
                return reject(error);
              }
            
              debug('success: %O', result);
              resolve(result);
            });
          });
        };
      }
      
      debug('Возвращаем оригинальное значение клиента: %s', property);
      return target[ property ];
    }
  });
};