import { TAGS_KEY } from './../constants';
import { MODULE_NAME, ACTION_NAME_DEL } from '../constants';
import internalError from '../../../errors/internal-error';
import tagsMystBeArrayError from './../errors/tags-must-be-array';
import tagsMustBeNotEmptyArrayError from '../errors/tags-must-be-not-empty-array';

const ERROR_INFO = { module: MODULE_NAME, action: ACTION_NAME_DEL };

/**
 * Удаляет значения тегов из общего списка
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
  
  return plugin.client.hdel(TAGS_KEY, ...tags)
    .catch(err => {
      request.log.error(err);
      return Promise.reject(internalError(request, err, ERROR_INFO));
    });
};