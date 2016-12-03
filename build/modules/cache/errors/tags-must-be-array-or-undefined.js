'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _propertyMustBeTypesError = require('../../../errors/property-must-be-types-error');

var _propertyMustBeTypesError2 = _interopRequireDefault(_propertyMustBeTypesError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  let info = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return (0, _propertyMustBeTypesError2.default)(_extends({}, info, {
    property: 'tags',
    types: ['array', 'undefined']
  }));
};
//# sourceMappingURL=tags-must-be-array-or-undefined.js.map