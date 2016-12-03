import { TAGS_KEY } from './../constants';
import { MODULE_NAME, ACTION_NAME_SET } from '../constants';
import internalError from '../../../errors/internal-error';
import tagsMystBeArrayError from './../errors/tags-must-be-array';
import tagsMustBeNotEmptyArrayError from '../errors/tags-must-be-not-empty-array';

const ERROR_INFO = { module: MODULE_NAME, action: ACTION_NAME_SET };

/**
 * Записывает в ключ TAGS_KEY из кеша переданные теги с новыми значениями
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
    
    return new Promise((resolve, reject) => {
      const result = setDateNow(tags);
      
      client.hmset(TAGS_KEY, ...result.keys, function(err, res) {
        if (err) {
          return reject(internalError(app, err, ERROR_INFO));
        }
        
        resolve(result.tags);
      });
    });
  };
};

function setDateNow(tags) {
  return tags.reduce((result, tag) => {
    result.tags[ tag ] = Date.now();
    result.keys.push(tag);
    result.keys.push(result.tags[ tag ]);
    return result;
  }, { keys: [], tags: {} });
}