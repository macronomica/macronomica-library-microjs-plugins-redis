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
  app.add(PIN_CACHE_GET, get(plugin));
  app.add(PIN_CACHE_SET, set(plugin));
  app.add(PIN_CACHE_HAS, has(plugin));
  app.add(PIN_CACHE_DEL, del(plugin));
}