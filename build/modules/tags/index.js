'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _get = require('./methods/get');

var _get2 = _interopRequireDefault(_get);

var _set = require('./methods/set');

var _set2 = _interopRequireDefault(_set);

var _has = require('./methods/has');

var _has2 = _interopRequireDefault(_has);

var _del = require('./methods/del');

var _del2 = _interopRequireDefault(_del);

var _getAll = require('./methods/get-all');

var _getAll2 = _interopRequireDefault(_getAll);

var _delAll = require('./methods/del-all');

var _delAll2 = _interopRequireDefault(_delAll);

var _pins = require('./pins');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (app, plugin, _ref) => {
  let onClose = _ref.onClose;

  app.add(_pins.PIN_TAGS_GET, (0, _get2.default)(plugin));
  app.add(_pins.PIN_TAGS_SET, (0, _set2.default)(plugin));
  app.add(_pins.PIN_TAGS_HAS, (0, _has2.default)(plugin));
  app.add(_pins.PIN_TAGS_DEL, (0, _del2.default)(plugin));
  app.add(_pins.PIN_TAGS_GET_ALL, (0, _getAll2.default)(plugin));
  app.add(_pins.PIN_TAGS_DEL_ALL, (0, _delAll2.default)(plugin));
};
//# sourceMappingURL=index.js.map