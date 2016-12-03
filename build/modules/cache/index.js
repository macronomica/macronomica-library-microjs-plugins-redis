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

var _pins = require('./pins');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (app, plugin, _ref) => {
  let onClose = _ref.onClose;

  app.add(_pins.PIN_CACHE_GET, (0, _get2.default)(app, plugin));
  app.add(_pins.PIN_CACHE_SET, (0, _set2.default)(app, plugin));
  app.add(_pins.PIN_CACHE_HAS, (0, _has2.default)(app, plugin));
  app.add(_pins.PIN_CACHE_DEL, (0, _del2.default)(app, plugin));

  onClose(handlerOnClose);
};

function handlerOnClose(app) {
  app.del(_pins.PIN_CACHE_DEL);
  app.del(_pins.PIN_CACHE_HAS);
  app.del(_pins.PIN_CACHE_SET);
  app.del(_pins.PIN_CACHE_GET);
}
//# sourceMappingURL=index.js.map