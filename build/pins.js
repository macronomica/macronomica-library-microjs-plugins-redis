'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

const PIN_PLUGIN = exports.PIN_PLUGIN = { role: 'plugin', name: 'redis' };
const PIN_OPTIONS = exports.PIN_OPTIONS = _extends({}, PIN_PLUGIN, { cmd: 'options' });
const PIN_CONNECTION = exports.PIN_CONNECTION = _extends({}, PIN_PLUGIN, { cmd: 'connection' });
//# sourceMappingURL=pins.js.map