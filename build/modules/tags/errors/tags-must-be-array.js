'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _propertyMustBeTypeError = require('../../../errors/property-must-be-type-error');

var _propertyMustBeTypeError2 = _interopRequireDefault(_propertyMustBeTypeError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = ERROR_INFO => (0, _propertyMustBeTypeError2.default)(_extends({}, ERROR_INFO, {
  property: 'tags',
  type: 'array'
}));
//# sourceMappingURL=tags-must-be-array.js.map