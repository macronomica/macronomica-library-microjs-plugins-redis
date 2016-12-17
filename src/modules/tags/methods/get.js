import { TAGS_KEY } from './../constants';
import { MODULE_NAME, ACTION_NAME_GET } from '../constants';
import internalError from '../../../errors/internal-error';
import tagsMystBeArrayError from './../errors/tags-must-be-array';
import tagsMustBeNotEmptyArrayError from '../errors/tags-must-be-not-empty-array';

const ERROR_INFO = { module: MODULE_NAME, action: ACTION_NAME_GET };

/**
 * Получает ключ TAGS_KEY из кеша с тегами и их текущими значениями
 *
 * @param {object} plugin         Экземпляр плагина
 * @returns {function({tags: Array<string>}): Promise}
 */
export default (plugin) => (request) => {
  const { tags = [] } = request;
  if (!Array.isArray(tags)) {
    return Promise.reject(tagsMystBeArrayError(ERROR_INFO));
  }
  
  if (!tags.length) {
    return Promise.reject(tagsMustBeNotEmptyArrayError(ERROR_INFO));
  }
  
  return plugin.client.hmget(TAGS_KEY, ...tags)
    .then(result => result === null ? result : reduced(tags, result))
    .catch(err => {
      request.log.error(err);
      return Promise.reject(internalError(request, err, ERROR_INFO));
    });
};


export function reduced(keys, values) {
  return keys.length > values.length
    ? reduceKeys(keys, values)
    : reduceValues(keys, values);
}

function reduceKeys(keys, values) {
  return keys
    .reduce((result, key, i) => {
      result = Object.assign(result, { [ key ]: Number(values[ i ]) });

      if (result[ key ] === 0) {
        result[ key ] = null;
      }

      return result;
    }, {});
}

function reduceValues(keys, values) {
  return values
    .reduce((result, value, i) => {
      result = Object.assign(result, { [ keys[ i ] ]: Number(value) });

      if (result[ keys[ i ] ] === 0) {
        result[ keys[ i ] ] = null;
      }

      return result;
    }, {});
}