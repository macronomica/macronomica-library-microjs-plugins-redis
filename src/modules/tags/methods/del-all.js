import { TAGS_KEY } from './../constants';
import { MODULE_NAME, ACTION_NAME_DEL_ALL } from '../constants';
import internalError from '../../../errors/internal-error';

const ERROR_INFO = { module: MODULE_NAME, action: ACTION_NAME_DEL_ALL };

/**
 * Удаляет все теги
 *
 * @param {object} plugin         Экземпляр плагина
 * @returns {function({tags: Array<string>}): Promise}
 */
export default (plugin) => (request) => {
  return plugin.client.del(TAGS_KEY)
    .catch(err => {
      request.log.error(err);
      return Promise.reject(internalError(request, err, ERROR_INFO));
    });
};