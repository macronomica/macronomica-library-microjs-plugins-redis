'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PIN_CACHE_DEL = exports.PIN_CACHE_HAS = exports.PIN_CACHE_SET = exports.PIN_CACHE_GET = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _constants = require('./constants');

const PIN_CACHE = { role: 'plugin', module: _constants.MODULE_NAME };

const PIN_CACHE_GET = exports.PIN_CACHE_GET = _extends({}, PIN_CACHE, { cmd: _constants.ACTION_NAME_GET, key: '*' });
const PIN_CACHE_SET = exports.PIN_CACHE_SET = _extends({}, PIN_CACHE, { cmd: _constants.ACTION_NAME_SET, key: '*', value: '*' });
const PIN_CACHE_HAS = exports.PIN_CACHE_HAS = _extends({}, PIN_CACHE, { cmd: _constants.ACTION_NAME_HAS, key: '*' });
const PIN_CACHE_DEL = exports.PIN_CACHE_DEL = _extends({}, PIN_CACHE, { cmd: _constants.ACTION_NAME_DEL, key: '*' });
//# sourceMappingURL=pins.js.map