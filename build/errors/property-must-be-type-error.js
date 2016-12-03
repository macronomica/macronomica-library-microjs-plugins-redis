'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _microjs = require('@microjs/microjs');

var _constants = require('./../constants');

exports.default = function () {
  let info = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return (0, _microjs.propertyMustBeTypeError)(_extends({ plugin: _constants.PLUGIN_SHORT_NAME }, info));
};
//# sourceMappingURL=property-must-be-type-error.js.map