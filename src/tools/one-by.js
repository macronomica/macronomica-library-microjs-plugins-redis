import { PIN_CACHE_GET, PIN_CACHE_SET } from '../pins';

export default ({ name, prefix, findOnePin, getTags = value => [], }) => (request) => {
  const { [ name ]: property } = request;
  
  if (!property) {
    return Promise.resolve(null);
  }
  
  const key = `${ prefix }:${ property }`;
  const criteria = { [ name ]: property };
  
  // Попробуем получить из кеша по ключу
  return request.act({ ...PIN_CACHE_GET, key })
    .then(value => {
      // Если нашли значение - вернем его
      if (value) { return value }
      
      // Иначе - найдем новое значение
      return request.act(findOnePin(criteria))
        // Сгенерируем теги для значения и запишем его в кеш
        .then(value => request
          .act({ ...PIN_CACHE_SET, key, tags: getTags(value), value })
          .then(() => value)
        );
    });
};