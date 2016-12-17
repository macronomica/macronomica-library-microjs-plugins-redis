import { TAGS_KEY } from './../constants';
import { MODULE_NAME, ACTION_NAME_SET } from '../constants';
import internalError from '../../../errors/internal-error';
import tagsMystBeArrayError from './../errors/tags-must-be-array';
import tagsMustBeNotEmptyArrayError from '../errors/tags-must-be-not-empty-array';

const ERROR_INFO = { module: MODULE_NAME, action: ACTION_NAME_SET };

/**
 * Записывает в ключ TAGS_KEY из кеша переданные теги с новыми значениями
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
  
  try {
    const result = setDateNow(tags);
    return plugin.client.hmset(TAGS_KEY, ...result.keys)
      .then(() => result.tags)
      .catch(err => {
        request.log.error(err);
        return Promise.reject(internalError(request, err, ERROR_INFO));
      });
  } catch (err) {
    request.log.error(err);
    return Promise.reject(internalError(request, err, ERROR_INFO));
  }
};

function setDateNow(tags) {
  return tags.reduce((result, tag) => {
    result.tags[ tag ] = Date.now();
    result.keys.push(tag);
    result.keys.push(result.tags[ tag ]);
    return result;
  }, { keys: [], tags: {} });
}