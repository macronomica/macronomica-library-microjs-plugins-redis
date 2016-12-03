'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _lodash = require('lodash.isstring');

var _lodash2 = _interopRequireDefault(_lodash);

var _pins = require('../../pins');

var _constants = require('../constants');

var _internalError = require('../../../errors/internal-error');

var _internalError2 = _interopRequireDefault(_internalError);

var _propertyIsRequiredError = require('../../../errors/property-is-required-error');

var _propertyIsRequiredError2 = _interopRequireDefault(_propertyIsRequiredError);

var _tagsMustBeArrayOrUndefined = require('./../errors/tags-must-be-array-or-undefined');

var _tagsMustBeArrayOrUndefined2 = _interopRequireDefault(_tagsMustBeArrayOrUndefined);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ERROR_INFO = { module: _constants.MODULE_NAME, action: _constants.ACTION_NAME_SET };

/**
 * Устанавливает значения ключа в кеш
 *
 * @param {app} app               Экземпляр библиотеки MicroJS
 * @param {object} plugin         Экземпляр плагина
 * @returns {function({key?: *, setCb?: *, tags?: *}): Promise}
 */

exports.default = (app, plugin) => {
  /**
   * @param {string} key            Ключ кеша
   * @param {*} value               Значение ключа в кеше
   * @param {Array<string>} [tags]  Список тегов для установки нового значения
   *
   * @returns {Promise<null|*|error>}
   */
  return (_ref) => {
    let key = _ref.key,
        value = _ref.value;
    var _ref$tags = _ref.tags;
    let tags = _ref$tags === undefined ? [] : _ref$tags;

    if (!(0, _lodash2.default)(key) || key === '') {
      return Promise.reject((0, _propertyIsRequiredError2.default)(_extends({}, ERROR_INFO, { property: 'key' })));
    }

    if (value === undefined) {
      return Promise.reject((0, _propertyIsRequiredError2.default)(_extends({}, ERROR_INFO, { property: 'value' })));
    }

    if (!Array.isArray(tags) || tags !== undefined) {
      return Promise.reject((0, _tagsMustBeArrayOrUndefined2.default)(ERROR_INFO));
    }

    // Получим текущие значения переданных тегов
    return app.act({ PIN_TAGS_GET: _pins.PIN_TAGS_GET, tags }).then(tagsValues => new Promise((resolve, reject) => {
      const hash = ['value', JSON.stringify(value), 'tags', JSON.stringify(tagsValues)];

      plugin.client.hmset(key, ...hash, (err, res) => {
        if (err) {
          return reject((0, _internalError2.default)(app, err, ERROR_INFO));
        }

        resolve(value);
      });
    }));
  };
};
//# sourceMappingURL=set.js.map