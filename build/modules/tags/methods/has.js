'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _lodash = require('lodash.isplainobject');

var _lodash2 = _interopRequireDefault(_lodash);

var _constants = require('../constants');

var _pins = require('../pins');

var _internalError = require('../../../errors/internal-error');

var _internalError2 = _interopRequireDefault(_internalError);

var _tagsMustBeObject = require('./../errors/tags-must-be-object');

var _tagsMustBeObject2 = _interopRequireDefault(_tagsMustBeObject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ERROR_INFO = { module: _constants.MODULE_NAME, action: _constants.ACTION_NAME_HAS };

/**
 * Записывает в ключ TAGS_KEY из кеша переданные теги с новыми значениями
 *
 * @param {app} app               Экземпляр библиотеки MicroJS
 * @param {object} plugin         Экземпляр плагина
 * @returns {function({tags: Array<string>}): Promise}
 */

exports.default = (app, plugin) => {
  /**
   * @param {Object<string, number>} tags  Список имен тегов со значениями
   *
   * @returns {Promise<null|*|error>}
   */
  return (_ref) => {
    var _ref$tags = _ref.tags;
    let tags = _ref$tags === undefined ? {} : _ref$tags;

    if (!(0, _lodash2.default)(tags)) {
      return Promise.reject((0, _tagsMustBeObject2.default)(ERROR_INFO));
    }

    const tagsKeys = Object.keys(tags);

    if (!tagsKeys.length) {
      return Promise.resolve(true);
    }

    return app.act(_extends({}, _pins.PIN_TAGS_GET, { tags: Object.keys(tags) })).then(hasTagUpdated(tags)).catch(err => Promise.reject((0, _internalError2.default)(app, err, ERROR_INFO)));
  };
};

function hasTagUpdated(tags) {
  return originalTags => {
    let originalTagsKeys = Object.keys(originalTags);
    if (Object.keys(tags).length > originalTagsKeys.length) {
      return Promise.resolve(false);
    }

    return Promise.resolve(originalTagsKeys.some(key => originalTags[key] === Number(tags[key])));
  };
}
//# sourceMappingURL=has.js.map