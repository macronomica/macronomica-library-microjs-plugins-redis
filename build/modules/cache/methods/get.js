'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _lodash = require('lodash.isstring');

var _lodash2 = _interopRequireDefault(_lodash);

var _lodash3 = require('lodash.isfunction');

var _lodash4 = _interopRequireDefault(_lodash3);

var _constants = require('../constants');

var _pins = require('../pins');

var _pins2 = require('../../pins');

var _internalError = require('../../../errors/internal-error');

var _internalError2 = _interopRequireDefault(_internalError);

var _propertyIsRequiredError = require('../../../errors/property-is-required-error');

var _propertyIsRequiredError2 = _interopRequireDefault(_propertyIsRequiredError);

var _setCbMustBeFunctionOrUndefined = require('./../errors/setCb-must-be-function-or-undefined');

var _setCbMustBeFunctionOrUndefined2 = _interopRequireDefault(_setCbMustBeFunctionOrUndefined);

var _tagsMustBeArrayOrUndefined = require('./../errors/tags-must-be-array-or-undefined');

var _tagsMustBeArrayOrUndefined2 = _interopRequireDefault(_tagsMustBeArrayOrUndefined);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ERROR_INFO = { module: _constants.MODULE_NAME, action: _constants.ACTION_NAME_GET };

/**
 * Получает значение ключа из кеша
 * - если передан метод setCb вызовет получение нового значения ключа если такового нет
 *
 * @param {app} app               Экземпляр библиотеки MicroJS
 * @param {object} plugin         Экземпляр плагина
 * @returns {function({key?: *, setCb?: *, tags?: *}): Promise}
 */

exports.default = (app, plugin) => {
  /**
   * @param {string} key            Ключ кеша
   * @param {function} [setCb]      Функция получения нового значения
   * @param {Array<string>} [tags]  Список тегов для установки нового значения
   *
   * @returns {Promise<null|*|error>}
   */
  return (_ref) => {
    let key = _ref.key,
        setCb = _ref.setCb,
        tags = _ref.tags;

    if (!(0, _lodash2.default)(key) || key === '') {
      return Promise.reject((0, _propertyIsRequiredError2.default)(_extends({}, ERROR_INFO, { property: 'key' })));
    }

    if (!(0, _lodash4.default)(setCb) || setCb !== undefined) {
      return Promise.reject((0, _setCbMustBeFunctionOrUndefined2.default)(ERROR_INFO));
    }

    if (!Array.isArray(tags) || tags !== undefined) {
      return Promise.reject((0, _tagsMustBeArrayOrUndefined2.default)(ERROR_INFO));
    }

    return plugin.client.hgetall(key).then(__success).catch(err => Promise.reject((0, _internalError2.default)(app, err, ERROR_INFO)));

    function __success(res) {
      // Запрашиваемый ключ отсутвует
      if (res === null) {
        // запустим проверку на обновление по setCb
        return callSetIfCallbackExists(app, { key, setCb, tags });
      }

      // Проверим актуальность тегов
      return app.act(_extends({}, _pins2.PIN_TAGS_HAS, { tags: res.tags })).then(
      // Если теги актуальны - вернем результат
      () => resolve(JSON.parse(res.value, parseReviver)),
      // Иначе запустим проверку на обновление
      () => callSetIfCallbackExists(app, { key, setCb, tags }));
    }
  };
};

/**
 * Вызывает функцию setCb если он был передан для установки нового значения ключа в кеше
 *
 * @param {app} app               Экземпляр библиотеки MicroJS
 * @param {string} key            Ключ кеша
 * @param {function} [setCb]      Функция получения нового значения
 * @param {Array<string>} [tags]  Список тегов для установки нового значения
 *
 * @returns {Promise<null|*>}     Вернет новое значение для ключа
 */


function callSetIfCallbackExists(app, _ref2) {
  let key = _ref2.key,
      setCb = _ref2.setCb,
      tags = _ref2.tags;

  return new Promise((resolve, reject) => {
    if ((0, _lodash4.default)(setCb)) {
      let promise = setCb(key);

      if (!promise || !('then' in promise && (0, _lodash4.default)(promise.then))) {
        promise = Promise.resolve(promise);
      }

      return promise.then(value => app.act(_extends({}, _pins.PIN_CACHE_SET, { key, value, tags }))).then(resolve, reject);
    }

    return resolve(null);
  });
}

/**
 * Функция вызывается для каждой пары ключ / значение при JSON.parse
 * - нужны чтобы корректно распарсить и восстановить дату в виде объекта Date
 *
 * @param {string} key
 * @param {*} value
 * @returns {*}
 */
function parseReviver(key, value) {
  if (!!value && !!value.search && !!~value.search(/^[0-9]{4}[-]{1}[0-9]{2}[-]{1}[0-9]{2}[A-Z]{1}[0-9]{2}[:]{1}[0-9]{2}[:]{1}[0-9]{2}[\.]{1}[0-9]{3}[A-Z]{1}$/)) {
    return new Date(value);
  }
  return value;
}
//# sourceMappingURL=get.js.map