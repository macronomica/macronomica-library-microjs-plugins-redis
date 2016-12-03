'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reduced = reduced;

var _constants = require('./../constants');

var _constants2 = require('../constants');

var _internalError = require('../../../errors/internal-error');

var _internalError2 = _interopRequireDefault(_internalError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ERROR_INFO = { module: _constants2.MODULE_NAME, action: _constants2.ACTION_NAME_GET_ALL };

/**
 * Получает ключ TAGS_KEY из кеша с тегами и их текущими значениями
 *
 * @param {app} app               Экземпляр библиотеки MicroJS
 * @param {object} plugin         Экземпляр плагина
 * @returns {function({tags: Array<string>}): Promise}
 */

exports.default = (app, plugin) => {
  /**
   * @param {Array<string>} [tags]  Список имен тегов для полуения их значений
   *
   * @returns {Promise<null|*|error>}
   */
  return (_ref) => {
    var _ref$tags = _ref.tags;
    let tags = _ref$tags === undefined ? [] : _ref$tags;

    if (!Array.isArray(tags)) {
      tags = [];
    }

    return new Promise((resolve, reject) => {
      plugin.client.hgetall(_constants.TAGS_KEY, callback);

      function callback(err, result) {
        if (err) {
          return reject((0, _internalError2.default)(app, err, ERROR_INFO));
        }

        if (result === null) {
          return resolve(result);
        }

        resolve(reduced(tags, result));
      }
    });
  };
};

function reduced(keys, values) {
  return keys.length > values.length ? reduceKeys(keys, values) : reduceValues(keys, values);
}

function reduceKeys(keys, values) {
  return keys.reduce((result, key, i) => Object.assign(result, { [key]: values[i] }), {});
}

function reduceValues(keys, values) {
  return values.reduce((result, value, i) => Object.assign(result, { [keys[i]]: value }), {});
}
//# sourceMappingURL=get-all.js.map