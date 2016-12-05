'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _lodash = require('lodash.isstring');

var _lodash2 = _interopRequireDefault(_lodash);

var _constants = require('../constants');

var _internalError = require('../../../errors/internal-error');

var _internalError2 = _interopRequireDefault(_internalError);

var _propertyIsRequiredError = require('../../../errors/property-is-required-error');

var _propertyIsRequiredError2 = _interopRequireDefault(_propertyIsRequiredError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ERROR_INFO = { module: _constants.MODULE_NAME, action: _constants.ACTION_NAME_DEL };

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
   *
   * @returns {Promise<null|*|error>}
   */
  return (_ref) => {
    let key = _ref.key;

    if (!(0, _lodash2.default)(key) || key === '') {
      return Promise.reject((0, _propertyIsRequiredError2.default)(_extends({}, ERROR_INFO, { property: 'key' })));
    }

    return plugin.client.hdel(key).catch(err => Promise.reject((0, _internalError2.default)(app, err, ERROR_INFO)));
  };
};
//# sourceMappingURL=del.js.map