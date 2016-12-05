export const PIN_PLUGIN = { role: 'plugin', module: 'redis-common' };
export const PIN_OPTIONS = { ...PIN_PLUGIN, cmd: 'options' };
export const PIN_CONNECTION = { ...PIN_PLUGIN, cmd: 'connection' };

import {
  PIN_CACHE_GET,
  PIN_CACHE_SET,
  PIN_CACHE_HAS,
  PIN_CACHE_DEL,
  
  PIN_TAGS_GET,
  PIN_TAGS_SET,
  PIN_TAGS_HAS,
  PIN_TAGS_DEL,
  PIN_TAGS_GET_ALL,
  PIN_TAGS_DEL_ALL
} from './modules/pins';

export {
  PIN_CACHE_GET,
  PIN_CACHE_SET,
  PIN_CACHE_HAS,
  PIN_CACHE_DEL,

  PIN_TAGS_GET,
  PIN_TAGS_SET,
  PIN_TAGS_HAS,
  PIN_TAGS_DEL,
  PIN_TAGS_GET_ALL,
  PIN_TAGS_DEL_ALL
};