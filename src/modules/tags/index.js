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
  app.add(PIN_TAGS_GET, get(app, plugin));
  app.add(PIN_TAGS_SET, set(app, plugin));
  app.add(PIN_TAGS_HAS, has(app, plugin));
  app.add(PIN_TAGS_DEL, del(app, plugin));
  app.add(PIN_TAGS_GET_ALL, getAll(app, plugin));
  app.add(PIN_TAGS_DEL_ALL, delAll(app, plugin));
  
  onClose(handlerOnClose)
}

function handlerOnClose(app) {
  app.del(PIN_TAGS_DEL_ALL);
  app.del(PIN_TAGS_GET_ALL);
  app.del(PIN_TAGS_DEL);
  app.del(PIN_TAGS_HAS);
  app.del(PIN_TAGS_SET);
  app.del(PIN_TAGS_GET);
}