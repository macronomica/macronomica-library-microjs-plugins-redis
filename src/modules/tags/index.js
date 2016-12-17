import get from './methods/get';
import set from './methods/set';
import has from './methods/has';
import del from './methods/del';
import getAll from './methods/get-all';
import delAll from './methods/del-all';
import {
  PIN_TAGS_GET,
  PIN_TAGS_SET,
  PIN_TAGS_HAS,
  PIN_TAGS_DEL,
  PIN_TAGS_GET_ALL,
  PIN_TAGS_DEL_ALL,
} from './pins';

export default (app, plugin, { onClose }) => {
  app.add(PIN_TAGS_GET, get(plugin));
  app.add(PIN_TAGS_SET, set(plugin));
  app.add(PIN_TAGS_HAS, has(plugin));
  app.add(PIN_TAGS_DEL, del(plugin));
  app.add(PIN_TAGS_GET_ALL, getAll(plugin));
  app.add(PIN_TAGS_DEL_ALL, delAll(plugin));
}