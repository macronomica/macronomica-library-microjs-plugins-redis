import { TAGS_KEY } from './../constants';
import { MODULE_NAME, ACTION_NAME_GET_ALL } from '../constants';
import internalError from '../../../errors/internal-error';

const ERROR_INFO = { module: MODULE_NAME, action: ACTION_NAME_GET_ALL };

/**
 * Получает ключ TAGS_KEY из кеша с тегами и их текущими значениями
 *
 * @param {app} app               Экземпляр библиотеки MicroJS
 * @param {object} plugin         Экземпляр плагина
 * @returns {function({tags?: Array<string>}): Promise}
 */
export default (app, plugin) => {
  /**
   * @param {Array<string>} [tags]  Список имен тегов для получения их значений
   *
   * @returns {Promise<null|*|error>}
   */
  return ({ }) => {
    
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
      .catch(err => Promise.reject(internalError(app, err, ERROR_INFO)));
  };
};
