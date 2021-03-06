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

const debug = require('debug')('microjs:plugins:redis:cache:get');


const ERROR_INFO = { module: _constants.MODULE_NAME, action: _constants.ACTION_NAME_GET };

/**
 * Получает значение ключа из кеша
 * - если передан метод setCb вызовет получение нового значения ключа если такового нет
 *
 * @param {object} plugin         Экземпляр плагина
 * @returns {function({key?: *, setCb?: *, tags?: *}): Promise}
 */

exports.default = plugin => request => {
  const key = request.key,
        setCb = request.setCb,
        tags = request.tags;

  debug('Вызван метод: "cache.get" с параметрами: %O', { key, setCb, tags });

  debug(`Проверка свойства "key": !isString(key) || key === ''|| key === '*'`);
  if (!(0, _lodash2.default)(key) || key === '' || key === '*') {
    debug(['[error] Результаты:', `$1 => ${ !(0, _lodash2.default)(key) }`, `$2 => ${ key === '' }`, `$3 => ${ key === '*' }`].join('\n'));
    request.log.warn(`Проверка свойства "key" провалилась`);
    return Promise.reject((0, _propertyIsRequiredError2.default)(_extends({}, ERROR_INFO, { property: 'key' })));
  }

  debug(`Проверка свойства "setCb": !isFunction(setCb) && setCb !== undefined`);
  if (!(0, _lodash4.default)(setCb) && setCb !== undefined) {
    debug(['[error] Результаты:', `$1 => ${ !(0, _lodash4.default)(setCb) }`, `$2 => ${ setCb !== undefined }`].join('\n'));
    request.log.warn(`Проверка свойства "setCb" провалилась`);
    return Promise.reject((0, _setCbMustBeFunctionOrUndefined2.default)(ERROR_INFO));
  }

  debug(`Проверка свойства "tags": !Array.isArray(tags) && tags !== undefined`);
  if (!Array.isArray(tags) && tags !== undefined) {
    debug(['[error] Результаты:'`$1 => ${ !Array.isArray(tags) }`, `$2 => ${ tags !== undefined }`].join('\n'));
    request.log.warn(`Проверка свойства "tags" провалилась`);
    return Promise.reject((0, _tagsMustBeArrayOrUndefined2.default)(ERROR_INFO));
  }

  return plugin.client.hgetall(key).then(__success).catch(err => {
    debug(`Поймали ошибку вызова метода "hgetall": `, err);
    request.log.error('Поймали ошибку вызова метода "hgetall"', err);
    throw (0, _internalError2.default)(request, err, ERROR_INFO);
  });

  function __success(res) {
    if (res === null) {
      debug(`Запрашиваемый ключ "%s" отсутвует: %s === null`, key, res);
      return callSetIfCallbackExists(request, { key, setCb, tags });
    }

    debug(`Проверим актуальность тегов`);
    return request.act(_extends({}, _pins2.PIN_TAGS_HAS, { tags: JSON.parse(res.tags) })).then(() => {
      debug(`Теги актуальны - парсим и возвращаем результат`);
      return JSON.parse(res.value, parseReviver);
    }, () => {
      debug(`Теги не актуальны`);
      return callSetIfCallbackExists(request, { key, setCb, tags });
    });
  }
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


function callSetIfCallbackExists(app, _ref) {
  let key = _ref.key,
      setCb = _ref.setCb,
      tags = _ref.tags;

  debug('Начинаем выполнение проверки на обновление по setCb');
  return new Promise((resolve, reject) => {

    if (!!setCb) {
      debug('Вызываем получение результата "setCb"');
      let promise = setCb(key);

      if (!promise || !('then' in promise && (0, _lodash4.default)(promise.then))) {
        debug('Результат не Promise - обернем его в Promise');
        promise = Promise.resolve(promise);
      }

      return promise.then(value => {
        debug('Результат "setCb" получен, ' + 'вызываем установку нового значения для ключа "%s": %O', key, _extends({}, _pins.PIN_CACHE_SET, { key, value, tags }));
        return app.act(_extends({}, _pins.PIN_CACHE_SET, { key, value, tags })).then(() => {
          debug('Новое значение ключа "%s" установлено, возвращаем его: %O', key, value);
          return value;
        }).catch(error => {
          debug('[error] Установка нового значения ключа "%s" вернуло ошибку: %O', key, error);
          app.log.error(`Установка нового значения ключа "${ key }" вернуло ошибку`, error);
          reject(error);
        });
      }).then(resolve).catch(error => {
        debug('[error] Вызов метода "setCb" вернул ошибку: %O', error);
        app.log.error('Вызов метода "setCb" вернул ошибку', error);
        reject(error);
      });
    }

    debug('Метод "setCb" не передан, вернем null');
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