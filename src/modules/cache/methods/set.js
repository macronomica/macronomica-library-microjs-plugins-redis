import isString from 'lodash.isstring';
import { PIN_TAGS_GET } from '../../pins';
import { MODULE_NAME, ACTION_NAME_SET } from '../constants';
import internalError from '../../../errors/internal-error';
import propertyIsRequiredError from '../../../errors/property-is-required-error';
import tagsMustBeArrayOrUndefinedError from './../errors/tags-must-be-array-or-undefined';

const ERROR_INFO = { module: MODULE_NAME, action: ACTION_NAME_SET };

/**
 * Устанавливает значения ключа в кеш
 *
 * @param {object} plugin         Экземпляр плагина
 * @returns {function({key?: *, setCb?: *, tags?: *}): Promise}
 */
export default (plugin) => (request) => {
  const { key, value, tags = [] } = request;
  
  if (!isString(key) || key === ''|| key === '*') {
    return Promise.reject(propertyIsRequiredError({ ...ERROR_INFO, property: 'key' }));
  }
  
  if (value === undefined) {
    return Promise.reject(propertyIsRequiredError({ ...ERROR_INFO, property: 'value' }));
  }
  
  if (!Array.isArray(tags) && tags !== undefined) {
    return Promise.reject(tagsMustBeArrayOrUndefinedError(ERROR_INFO));
  }
  
  if (!tags.length) {
    return Promise.resolve().then(__exec);
  }
  
  // Получим текущие значения переданных тегов
  return request.act({ ...PIN_TAGS_GET, tags }).then(__exec);
  
  function __exec(tagsValues = {}) {
    const hash = [
      'value', JSON.stringify(value),
      'tags', JSON.stringify(tagsValues)
    ];
    
    return plugin.client
      .hmset(key, ...hash)
      .catch(err => {
        request.log.error(err);
        return Promise.reject(internalError(request, err, ERROR_INFO));
      });
  }
};