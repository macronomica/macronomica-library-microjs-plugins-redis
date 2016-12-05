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

const ERROR_INFO = { module: _constants2.MODULE_NAME, action: _constants2.ACTION_NAME_DEL };

/**
 * Удаляет значения тегов из общего списка
 *
 * @param {app} app               Экземпляр библиотеки MicroJS
 * @param {object} plugin         Экземпляр плагина
 * @returns {function({tags: Array<string>}): Promise}
 */

exports.default = (app, plugin) => {
  /**
   * @param {Array<string>} tags  Список имен тегов для удаления
   *
   * @returns {Promise<null|*|error>}
   */
  return (_ref) => {
    var _ref$tags = _ref.tags;
    let tags = _ref$tags === undefined ? [] : _ref$tags;

    if (!Array.isArray(tags)) {
      return Promise.reject((0, _tagsMustBeArray2.default)(ERROR_INFO));
    }

    if (!tags.length) {
      return Promise.reject((0, _tagsMustBeNotEmptyArray2.default)(ERROR_INFO));
    }

    return plugin.client.hdel(_constants.TAGS_KEY, ...tags).catch(err => Promise.reject((0, _internalError2.default)(app, err, ERROR_INFO)));
  };
};
//# sourceMappingURL=del.js.map