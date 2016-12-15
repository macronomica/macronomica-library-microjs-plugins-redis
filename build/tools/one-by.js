'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _pins = require('../pins');

exports.default = (_ref) => {
  let name = _ref.name,
      prefix = _ref.prefix,
      findOnePin = _ref.findOnePin;
  var _ref$getTags = _ref.getTags;
  let getTags = _ref$getTags === undefined ? value => [] : _ref$getTags;
  return request => {
    const property = request[name];


    if (!property) {
      return Promise.resolve(null);
    }

    const key = `${ prefix }:${ property }`;
    const criteria = { [name]: property };

    // Попробуем получить из кеша по ключу
    return request.act(_extends({}, _pins.PIN_CACHE_GET, { key })).then(value => {
      // Если нашли значение - вернем его
      if (value) {
        return value;
      }

      // Иначе - найдем новое значение
      return request.act(findOnePin(criteria))
      // Сгенерируем теги для значения и запишем его в кеш
      .then(value => request.act(_extends({}, _pins.PIN_CACHE_SET, { key, tags: getTags(value), value })).then(() => value));
    });
  };
};
//# sourceMappingURL=one-by.js.map