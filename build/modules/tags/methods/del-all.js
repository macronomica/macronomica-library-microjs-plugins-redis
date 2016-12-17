'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _constants = require('./../constants');

var _constants2 = require('../constants');

var _internalError = require('../../../errors/internal-error');

var _internalError2 = _interopRequireDefault(_internalError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ERROR_INFO = { module: _constants2.MODULE_NAME, action: _constants2.ACTION_NAME_DEL_ALL };

/**
 * Удаляет все теги
 *
 * @param {object} plugin         Экземпляр плагина
 * @returns {function({tags: Array<string>}): Promise}
 */

exports.default = plugin => request => {
  return plugin.client.del(_constants.TAGS_KEY).catch(err => {
    request.log.error(err);
    return Promise.reject((0, _internalError2.default)(request, err, ERROR_INFO));
  });
};
//# sourceMappingURL=del-all.js.map