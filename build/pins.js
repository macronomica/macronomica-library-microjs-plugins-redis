'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PIN_TAGS_DEL_ALL = exports.PIN_TAGS_GET_ALL = exports.PIN_TAGS_DEL = exports.PIN_TAGS_HAS = exports.PIN_TAGS_SET = exports.PIN_TAGS_GET = exports.PIN_CACHE_DEL = exports.PIN_CACHE_HAS = exports.PIN_CACHE_SET = exports.PIN_CACHE_GET = exports.PIN_CONNECTION = exports.PIN_OPTIONS = exports.PIN_PLUGIN = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _pins = require('./modules/pins');

const PIN_PLUGIN = exports.PIN_PLUGIN = { role: 'plugin', module: 'redis-common' };
const PIN_OPTIONS = exports.PIN_OPTIONS = _extends({}, PIN_PLUGIN, { cmd: 'options' });
const PIN_CONNECTION = exports.PIN_CONNECTION = _extends({}, PIN_PLUGIN, { cmd: 'connection' });

exports.PIN_CACHE_GET = _pins.PIN_CACHE_GET;
exports.PIN_CACHE_SET = _pins.PIN_CACHE_SET;
exports.PIN_CACHE_HAS = _pins.PIN_CACHE_HAS;
exports.PIN_CACHE_DEL = _pins.PIN_CACHE_DEL;
exports.PIN_TAGS_GET = _pins.PIN_TAGS_GET;
exports.PIN_TAGS_SET = _pins.PIN_TAGS_SET;
exports.PIN_TAGS_HAS = _pins.PIN_TAGS_HAS;
exports.PIN_TAGS_DEL = _pins.PIN_TAGS_DEL;
exports.PIN_TAGS_GET_ALL = _pins.PIN_TAGS_GET_ALL;
exports.PIN_TAGS_DEL_ALL = _pins.PIN_TAGS_DEL_ALL;
//# sourceMappingURL=pins.js.map