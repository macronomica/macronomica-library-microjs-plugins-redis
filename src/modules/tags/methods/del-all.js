import { TAGS_KEY } from './../constants';
import { MODULE_NAME, ACTION_NAME_DEL_ALL } from '../constants';
import internalError from '../../../errors/internal-error';

const ERROR_INFO = { module: MODULE_NAME, action: ACTION_NAME_DEL_ALL };

/**
 * Удаляет все теги
 *
 * @param {app} app               Экземпляр библиотеки MicroJS
 * @param {object} plugin         Экземпляр плагина
 * @returns {function({tags: Array<string>}): Promise}
 */
export default (app, plugin) => {
  /**
   * @returns {Promise<null|*|error>}
   */
    return ({ }) => {
      return plugin.client.del(TAGS_KEY)
        .catch(err => Promise.reject(internalError(app, err, ERROR_INFO)));
    };
};