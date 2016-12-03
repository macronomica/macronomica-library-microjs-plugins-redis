import { TAGS_KEY } from './../constants';
import { MODULE_NAME, ACTION_NAME_GET_ALL } from '../constants';
import internalError from '../../../errors/internal-error';

const ERROR_INFO = { module: MODULE_NAME, action: ACTION_NAME_GET_ALL };

/**
 * Получает ключ TAGS_KEY из кеша с тегами и их текущими значениями
 *
 * @param {app} app               Экземпляр библиотеки MicroJS
 * @param {object} plugin         Экземпляр плагина
 * @returns {function({tags: Array<string>}): Promise}
 */
export default (app, plugin) => {
  /**
   * @param {Array<string>} [tags]  Список имен тегов для полуения их значений
   *
   * @returns {Promise<null|*|error>}
   */
  return ({ tags = [] }) => {
    if (!Array.isArray(tags)) {
      tags = [];
    }
    
    return new Promise((resolve, reject) => {
      plugin.client.hgetall(TAGS_KEY, callback);
  
      function callback(err, result) {
        if (err) {
          return reject(internalError(app, err, ERROR_INFO));
        }
    
        if (result === null) {
          return resolve(result);
        }
    
        resolve(reduced(tags, result));
      }
    });
  };
};

export function reduced(keys, values) {
  return keys.length > values.length
    ? reduceKeys(keys, values)
    : reduceValues(keys, values);
}

function reduceKeys(keys, values) {
  return keys.reduce((result, key, i) => Object.assign(result, { [ key ]: values[ i ] }), {});
}

function reduceValues(keys, values) {
  return values.reduce((result, value, i) => Object.assign(result, { [ keys[ i ] ]: value }), {});
}