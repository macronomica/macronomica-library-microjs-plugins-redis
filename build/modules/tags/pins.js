'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PIN_TAGS_DEL_ALL = exports.PIN_TAGS_GET_ALL = exports.PIN_TAGS_DEL = exports.PIN_TAGS_HAS = exports.PIN_TAGS_SET = exports.PIN_TAGS_GET = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _constants = require('./constants');

const PIN_TAGS = { role: 'plugin', module: _constants.MODULE_NAME };

const PIN_TAGS_GET = exports.PIN_TAGS_GET = _extends({}, PIN_TAGS, { cmd: _constants.ACTION_NAME_GET, tags: '*' });
const PIN_TAGS_SET = exports.PIN_TAGS_SET = _extends({}, PIN_TAGS, { cmd: _constants.ACTION_NAME_SET, tags: '*' });
// Проверяет наличие тегов и их актуальность
const PIN_TAGS_HAS = exports.PIN_TAGS_HAS = _extends({}, PIN_TAGS, { cmd: _constants.ACTION_NAME_HAS, tags: '*' });
const PIN_TAGS_DEL = exports.PIN_TAGS_DEL = _extends({}, PIN_TAGS, { cmd: _constants.ACTION_NAME_DEL, tags: '*' });

const PIN_TAGS_GET_ALL = exports.PIN_TAGS_GET_ALL = _extends({}, PIN_TAGS, { cmd: _constants.ACTION_NAME_GET_ALL });
const PIN_TAGS_DEL_ALL = exports.PIN_TAGS_DEL_ALL = _extends({}, PIN_TAGS, { cmd: _constants.ACTION_NAME_DEL_ALL });
//# sourceMappingURL=pins.js.map