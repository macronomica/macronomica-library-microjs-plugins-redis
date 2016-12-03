'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _cache = require('./cache');

var _cache2 = _interopRequireDefault(_cache);

var _tags = require('./tags');

var _tags2 = _interopRequireDefault(_tags);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (app, plugin, _ref) => {
  let onClose = _ref.onClose;

  (0, _cache2.default)(app, plugin, { onClose });
  (0, _tags2.default)(app, plugin, { onClose });
};
//# sourceMappingURL=index.js.map