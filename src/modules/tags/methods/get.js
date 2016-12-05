import { TAGS_KEY } from './../constants';
import { MODULE_NAME, ACTION_NAME_GET } from '../constants';
import { reduced } from './get-all';
import internalError from '../../../errors/internal-error';
import tagsMystBeArrayError from './../errors/tags-must-be-array';
import tagsMustBeNotEmptyArrayError from '../errors/tags-must-be-not-empty-array';

const ERROR_INFO = { module: MODULE_NAME, action: ACTION_NAME_GET };

/**
 * Получает ключ TAGS_KEY из кеша с тегами и их текущими значениями
 *
 * @param {app} app               Экземпляр библиотеки MicroJS
 * @param {object} plugin         Экземпляр плагина
 * @returns {function({tags: Array<string>}): Promise}
 */
export default (app, plugin) => {
  /**
   * @param {Array<string>} tags  Список имен тегов для полуения их значений
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

    return plugin.client.hmget(TAGS_KEY, ...tags)
      .then(result => result === null ? result : reduced(tags, result))
      .catch(err => Promise.reject(internalError(app, err, ERROR_INFO)));
  };
};