import isString from 'lodash.isstring';
import { MODULE_NAME, ACTION_NAME_DEL } from '../constants';
import internalError from '../../../errors/internal-error';
import propertyIsRequiredError from '../../../errors/property-is-required-error';

const ERROR_INFO = { module: MODULE_NAME, action: ACTION_NAME_DEL };

/**
 * Устанавливает значения ключа в кеш
 *
 * @param {object} plugin         Экземпляр плагина
 * @returns {function({key?: *, setCb?: *, tags?: *}): Promise}
 */
export default (plugin) => (request) => {
  const { key } = request;
  if (!isString(key) || key === ''|| key === '*') {
    return Promise.reject(propertyIsRequiredError({ ...ERROR_INFO, property: 'key' }));
  }
  
  return plugin.client.del(key)
    .catch(err => {
      request.log.error(err);
      return Promise.reject(internalError(request, err, ERROR_INFO));
    });
};