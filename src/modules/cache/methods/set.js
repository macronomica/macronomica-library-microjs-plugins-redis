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
 * @param {app} app               Экземпляр библиотеки MicroJS
 * @param {object} plugin         Экземпляр плагина
 * @returns {function({key?: *, setCb?: *, tags?: *}): Promise}
 */
export default (app, plugin) => {
  /**
   * @param {string} key            Ключ кеша
   * @param {*} value               Значение ключа в кеше
   * @param {Array<string>} [tags]  Список тегов для установки нового значения
   *
   * @returns {Promise<null|*|error>}
   */
    return ({ key, value, tags = [] }) => {
      if (!isString(key) || key === '') {
        return Promise.reject(propertyIsRequiredError({ ...ERROR_INFO, property: 'key' }));
      }
      
      if (value === undefined) {
        return Promise.reject(propertyIsRequiredError({ ...ERROR_INFO, property: 'value' }));
      }
            
      if (!Array.isArray(tags) || tags !== undefined) {
        return Promise.reject(tagsMustBeArrayOrUndefinedError(ERROR_INFO));
      }
      
      // Получим текущие значения переданных тегов
      return app.act({ PIN_TAGS_GET, tags })
        .then(tagsValues => {
          const hash = [
            'value', JSON.stringify(value),
            'tags', JSON.stringify(tagsValues)
          ];
    
          return plugin.client
            .hmset(key, ...hash)
            .catch(err => Promise.reject(internalError(app, err, ERROR_INFO)));
        });
    };
};