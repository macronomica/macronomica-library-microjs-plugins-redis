'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redis = require('redis');

var _redis2 = _interopRequireDefault(_redis);

var _microjs = require('@microjs/microjs');

var _connect = require('./connect');

var _connect2 = _interopRequireDefault(_connect);

var _disconnect = require('./disconnect');

var _disconnect2 = _interopRequireDefault(_disconnect);

var _modules = require('./modules');

var _modules2 = _interopRequireDefault(_modules);

var _pins = require('./pins');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  let settings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};


  return (app, _ref) => {
    let onClose = _ref.onClose;

    const plugin = { id: (0, _microjs.genid)(), middleware: _redis2.default, client: null };

    app.add(_pins.PIN_PLUGIN, () => Promise.resolve(plugin));
    app.add(_pins.PIN_OPTIONS, () => Promise.resolve(settings));
    app.add(_pins.PIN_CONNECTION, () => Promise.resolve(plugin.client));

    (0, _modules2.default)(app, plugin, { onClose });

    onClose(() => {
      app.del(_pins.PIN_CONNECTION);
      app.del(_pins.PIN_OPTIONS);
      app.del(_pins.PIN_PLUGIN);
      return (0, _disconnect2.default)(app, plugin).then(result => plugin.client = result);
    });

    return (0, _connect2.default)(app, plugin, settings).then(result => plugin.client = result);
  };
};
//# sourceMappingURL=plugin.js.map