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
 * @param {app} app               Экземпляр библиотеки MicroJS
 * @param {object} plugin         Экземпляр плагина
 * @returns {function({key?: *, setCb?: *, tags?: *}): Promise}
 */
export default (app, plugin) => {
  /**
   * @param {string} key            Ключ кеша
   * @param {function} [setCb]      Функция получения нового значения
   * @param {Array<string>} [tags]  Список тегов для установки нового значения
   *
   * @returns {Promise<null|*|error>}
   */
  return ({ key, setCb, tags }) => {
    if (!isString(key) || key === '') {
      return Promise.reject(propertyIsRequiredError({ ...ERROR_INFO, property: 'key' }));
    }
  
    if (!isFunction(setCb) || setCb !== undefined) {
      return Promise.reject(tagsMustBeFunctionOrUndefinedError(ERROR_INFO));
    }
  
    if (!Array.isArray(tags) || tags !== undefined) {
      return Promise.reject(tagsMustBeArrayOrUndefinedError(ERROR_INFO));
    }
    
    return new Promise((resolve, reject) => {
      plugin.client.hgetall(key, __get);
  
      function __get(err, res) {
        if (err) {
          return reject(internalError(app, err, ERROR_INFO));
        }
    
        // Запрашиваемый ключ отсутвует
        if (res === null) {
          // запустим проверку на обновление по setCb
          return callSetIfCallbackExists(app, { key, setCb, tags })
            .then(resolve, reject);
        }
    
        // Проверим актуальность тегов
        app.act({ ...PIN_TAGS_HAS, tags: res.tags })
          .then(
            // Если теги актуальны - вернем результат
            () => resolve(JSON.parse(res.value, parseReviver)),
            // Иначе запустим проверку на обновление
            () => callSetIfCallbackExists(app, { key, setCb, tags })
          );
      }
    });
  };
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
  return new Promise((resolve, reject) => {
    if (isFunction(setCb)) {
      let promise = setCb(key);
    
      if (!promise || !('then' in promise && isFunction(promise.then))) {
        promise = Promise.resolve(promise);
      }
    
      return promise
        .then(value => app.act({ ...PIN_CACHE_SET, key, value, tags }))
        .then(resolve, reject);
    }
  
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