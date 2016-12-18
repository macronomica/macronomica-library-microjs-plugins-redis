const debug = require('debug')('microjs:plugins:redis:cache:get');
import isString from 'lodash.isstring';
import isFunction from 'lodash.isfunction';
import { MODULE_NAME, ACTION_NAME_GET } from '../constants';
import { PIN_CACHE_SET } from '../pins';
import { PIN_TAGS_HAS } from '../../pins';
import internalError from '../../../errors/internal-error';
import propertyIsRequiredError from '../../../errors/property-is-required-error';
import tagsMustBeFunctionOrUndefinedError from './../errors/setCb-must-be-function-or-undefined';
import tagsMustBeArrayOrUndefinedError from './../errors/tags-must-be-array-or-undefined';

const ERROR_INFO = { module: MODULE_NAME, action: ACTION_NAME_GET };

/**
 * Получает значение ключа из кеша
 * - если передан метод setCb вызовет получение нового значения ключа если такового нет
 *
 * @param {object} plugin         Экземпляр плагина
 * @returns {function({key?: *, setCb?: *, tags?: *}): Promise}
 */
export default (plugin) => (request) => {
  const { key, setCb, tags } = request;
  debug('Вызван метод: "cache.get" с параметрами: %O', { key, setCb, tags });
  
  debug(`Проверка свойства "key": !isString(key) || key === ''|| key === '*'`);
  if (!isString(key) || key === ''|| key === '*') {
    debug([
      '[error] Результаты:',
      `$1 => ${ !isString(key) }`,
      `$2 => ${ key === '' }`,
      `$3 => ${ key === '*' }`
    ].join('\n'));
    return Promise.reject(propertyIsRequiredError({ ...ERROR_INFO, property: 'key' }));
  }
  
  debug(`Проверка свойства "setCb": !isFunction(setCb) && setCb !== undefined`);
  if (!isFunction(setCb) && setCb !== undefined) {
    debug([
      '[error] Результаты:',
      `$1 => ${ !isFunction(setCb) }`,
      `$2 => ${ setCb !== undefined }`,
    ].join('\n'));
    return Promise.reject(tagsMustBeFunctionOrUndefinedError(ERROR_INFO));
  }
  
  debug(`Проверка свойства "tags": !Array.isArray(tags) && tags !== undefined`);
  if (!Array.isArray(tags) && tags !== undefined) {
    debug([
      '[error] Результаты:'
      `$1 => ${ !Array.isArray(tags) }`,
      `$2 => ${ tags !== undefined }`,
    ].join('\n'));
    return Promise.reject(tagsMustBeArrayOrUndefinedError(ERROR_INFO));
  }
  
  return plugin.client.hgetall(key)
    .then(__success)
    .catch(err => {
      debug(`Поймали ошибку вызова метода "hgetall": `, err);
      request.log.error(err);
      throw internalError(request, err, ERROR_INFO);
    });
  
  function __success(res) {
    if (res === null) {
      debug(`Запрашиваемый ключ "%s" отсутвует: %s === null`, key, res);
      return callSetIfCallbackExists(request, { key, setCb, tags });
    }
    
    debug(`Проверим актуальность тегов`);
    return request.act({ ...PIN_TAGS_HAS, tags: JSON.parse(res.tags) })
      .then(
        () => {
          debug(`Теги актуальны - парсим и возвращаем результат`);
          return JSON.parse(res.value, parseReviver);
        },
        () => {
          debug(`Теги не актуальны`);
          return callSetIfCallbackExists(request, { key, setCb, tags });
        }
      );
  }
};

/**
 * Вызывает функцию setCb если он был передан для установки нового значения ключа в кеше
 *
 * @param {app} app               Экземпляр библиотеки MicroJS
 * @param {string} key            Ключ кеша
 * @param {function} [setCb]      Функция получения нового значения
 * @param {Array<string>} [tags]  Список тегов для установки нового значения
 *
 * @returns {Promise<null|*>}     Вернет новое значение для ключа
 */
function callSetIfCallbackExists(app, { key, setCb, tags }) {
  debug('Начинаем выполнение проверки на обновление по setCb');
  return new Promise((resolve, reject) => {
    
    if (!!setCb) {
      debug('Вызываем получение результата "setCb"');
      let promise = setCb(key);
    
      if (!promise || !('then' in promise && isFunction(promise.then))) {
        debug('Результат не Promise - обернем его в Promise');
        promise = Promise.resolve(promise);
      }
    
      return promise
        .then(value => {
          debug('Результат "setCb" получен, ' +
            'вызываем установку нового значения для ключа "%s": %O',
            key, { ...PIN_CACHE_SET, key, value, tags }
          );
          return app
            .act({ ...PIN_CACHE_SET, key, value, tags })
            .then(() => {
              debug('Новое значение ключа "%s" утсановлено, возвращаем его', key);
              return value;
            })
            .catch(error => {
              debug('[error] Установка нового значения ключа "%s" вернуло ошибку: %O', key, error);
              throw error;
            });
        })
        .then(resolve)
        .catch(error => {
          debug('[error] Вызов метода "setCb" вернул ошибку: %O', error);
          reject(error);
        });
    }
    
    debug('Метод "setCb" не передан, вернем null');
    return resolve(null);
  });
}

/**
 * Функция вызывается для каждой пары ключ / значение при JSON.parse
 * - нужны чтобы корректно распарсить и восстановить дату в виде объекта Date
 *
 * @param {string} key
 * @param {*} value
 * @returns {*}
 */
function parseReviver(key, value) {
  if (!!value && !!value.search && !!~value.search(/^[0-9]{4}[-]{1}[0-9]{2}[-]{1}[0-9]{2}[A-Z]{1}[0-9]{2}[:]{1}[0-9]{2}[:]{1}[0-9]{2}[\.]{1}[0-9]{3}[A-Z]{1}$/)) {
    return new Date(value);
  }
  return value;
}