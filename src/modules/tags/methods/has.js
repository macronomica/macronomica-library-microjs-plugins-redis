import isPlainObject from 'lodash.isplainobject';
import { MODULE_NAME, ACTION_NAME_HAS } from '../constants';
import { PIN_TAGS_GET } from '../pins';
import internalError from '../../../errors/internal-error';
import tagsMystBeObjectError from './../errors/tags-must-be-object';

const ERROR_INFO = { module: MODULE_NAME, action: ACTION_NAME_HAS };

/**
 * Записывает в ключ TAGS_KEY из кеша переданные теги с новыми значениями
 *
 * @param {object} plugin         Экземпляр плагина
 * @returns {function({tags: Array<string>}): Promise}
 */
export default (plugin) => (request) => {
  const { tags:tags = {} } = request;
  if (!isPlainObject(tags)) {
    return Promise.reject(tagsMystBeObjectError(ERROR_INFO));
  }
  
  const tagsKeys = Object.keys(tags);
  
  if (!tagsKeys.length) {
    return Promise.resolve(true);
  }
  
  return request.act({ ...PIN_TAGS_GET, tags: Object.keys(tags) })
    .then(hasTagUpdated(tags))
    .catch(err => {
      request.log.error(err);
      return Promise.reject(internalError(request, err, ERROR_INFO));
    });
};

function hasTagUpdated(tags) {
  return (originalTags) => {
    let originalTagsKeys = Object.keys(originalTags);
    if (Object.keys(tags).length > originalTagsKeys.length) {
      return Promise.resolve(false);
    }

    return Promise.resolve(originalTagsKeys.some(key => originalTags[ key ] === Number(tags[ key ])));
  };
}