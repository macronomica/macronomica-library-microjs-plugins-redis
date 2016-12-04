import isString from 'lodash.isstring';
import { MODULE_NAME, ACTION_NAME_HAS } from '../constants';
import internalError from '../../../errors/internal-error';
import propertyIsRequiredError from '../../../errors/property-is-required-error';

const ERROR_INFO = { module: MODULE_NAME, action: ACTION_NAME_HAS };

/**
 * Устанавливает значения ключа в кеш
 *
 * @param {app} app               Экземпляр библиотеки MicroJS
 * @param {object} plugin         Экземпляр плагина
 * @returns {function({key?: *, setCb?: *, tags?: *}): Promise}
 */
export default (app, plugin) => {
  /**
   * @param {string} key            Ключ кеша
   *
   * @returns {Promise<null|*|error>}
   */
    return ({ key }) => {
      if (!isString(key) || key === '') {
        return Promise.reject(propertyIsRequiredError({ ...ERROR_INFO, property: 'key' }));
      }
      
      return plugin.client.hexists(key)
        .then(exists => exists === 1)
        .catch(err => Promise.reject(internalError(app, err, ERROR_INFO)));
    };
};