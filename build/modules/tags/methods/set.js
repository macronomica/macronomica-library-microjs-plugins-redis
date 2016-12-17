'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _constants = require('./../constants');

var _constants2 = require('../constants');

var _internalError = require('../../../errors/internal-error');

var _internalError2 = _interopRequireDefault(_internalError);

var _tagsMustBeArray = require('./../errors/tags-must-be-array');

var _tagsMustBeArray2 = _interopRequireDefault(_tagsMustBeArray);

var _tagsMustBeNotEmptyArray = require('../errors/tags-must-be-not-empty-array');

var _tagsMustBeNotEmptyArray2 = _interopRequireDefault(_tagsMustBeNotEmptyArray);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ERROR_INFO = { module: _constants2.MODULE_NAME, action: _constants2.ACTION_NAME_SET };

/**
 * Записывает в ключ TAGS_KEY из кеша переданные теги с новыми значениями
 *
 * @param {object} plugin         Экземпляр плагина
 * @returns {function({tags: Array<string>}): Promise}
 */

exports.default = plugin => request => {
  var _request$tags = request.tags;
  const tags = _request$tags === undefined ? [] : _request$tags;


  if (!Array.isArray(tags)) {
    return Promise.reject((0, _tagsMustBeArray2.default)(ERROR_INFO));
  }

  if (!tags.length) {
    return Promise.reject((0, _tagsMustBeNotEmptyArray2.default)(ERROR_INFO));
  }

  try {
    const result = setDateNow(tags);
    return plugin.client.hmset(_constants.TAGS_KEY, ...result.keys).then(() => result.tags).catch(err => {
      request.log.error(err);
      return Promise.reject((0, _internalError2.default)(request, err, ERROR_INFO));
    });
  } catch (err) {
    request.log.error(err);
    return Promise.reject((0, _internalError2.default)(request, err, ERROR_INFO));
  }
};

function setDateNow(tags) {
  return tags.reduce((result, tag) => {
    result.tags[tag] = Date.now();
    result.keys.push(tag);
    result.keys.push(result.tags[tag]);
    return result;
  }, { keys: [], tags: {} });
}
//# sourceMappingURL=set.js.map