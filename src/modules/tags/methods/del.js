import { TAGS_KEY } from './../constants';
import { MODULE_NAME, ACTION_NAME_DEL } from '../constants';
import internalError from '../../../errors/internal-error';
import tagsMystBeArrayError from './../errors/tags-must-be-array';
import tagsMustBeNotEmptyArrayError from '../errors/tags-must-be-not-empty-array';

const ERROR_INFO = { module: MODULE_NAME, action: ACTION_NAME_DEL };

/**
 * Удаляет значения тегов из общего списка
 *
 * @param {app} app               Экземпляр библиотеки MicroJS
 * @param {object} plugin         Экземпляр плагина
 * @returns {function({tags: Array<string>}): Promise}
 */
export default (app, plugin) => {
  /**
   * @param {Array<string>} tags  Список имен тегов для удаления
   *
   * @returns {Promise<null|*|error>}
   */
    return ({ tags = [] }) => {
      if (!Array.isArray(tags)) {
        return Promise.reject(tagsMystBeArrayError(ERROR_INFO));
      }

      if (!tags.length) {
        return Promise.reject(tagsMustBeNotEmptyArrayError(ERROR_INFO));
      }

      return plugin.client.hdel(TAGS_KEY, ...tags)
        .catch(err => Promise.reject(internalError(app, err, ERROR_INFO)));
    };
};