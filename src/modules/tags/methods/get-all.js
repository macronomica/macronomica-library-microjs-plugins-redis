import { TAGS_KEY } from './../constants';
import { MODULE_NAME, ACTION_NAME_GET_ALL } from '../constants';
import internalError from '../../../errors/internal-error';

const ERROR_INFO = { module: MODULE_NAME, action: ACTION_NAME_GET_ALL };

/**
 * Получает ключ TAGS_KEY из кеша с тегами и их текущими значениями
 *
 * @param {object} plugin         Экземпляр плагина
 * @returns {function({tags?: Array<string>}): Promise}
 */
export default (plugin) => (request) => {
  return plugin.client.hgetall(TAGS_KEY)
    .then(result => {
      if (result === null) {
        return result;
      }
      
      return Object
        .keys(result)
        .reduce((tags, tag) => Object
          .assign(tags, { [ tag ]: Number(result[ tag ]) }), {});
    })
    .catch(err => {
      request.log.error(err);
      return Promise.reject(internalError(request, err, ERROR_INFO));
    });
};
