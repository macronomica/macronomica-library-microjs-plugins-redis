import get from './methods/get';
import set from './methods/set';
import has from './methods/has';
import del from './methods/del';
import {
  PIN_CACHE_GET,
  PIN_CACHE_SET,
  PIN_CACHE_HAS,
  PIN_CACHE_DEL
} from './pins';

export default (app, plugin, { onClose }) => {
  app.add(PIN_CACHE_GET, get(app, plugin));
  app.add(PIN_CACHE_SET, set(app, plugin));
  app.add(PIN_CACHE_HAS, has(app, plugin));
  app.add(PIN_CACHE_DEL, del(app, plugin));
  
  onClose(handlerOnClose)
}

function handlerOnClose(app) {
  app.del(PIN_CACHE_DEL);
  app.del(PIN_CACHE_HAS);
  app.del(PIN_CACHE_SET);
  app.del(PIN_CACHE_GET);
}