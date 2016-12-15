import RedisPlugin from './plugin';
import tools from './tools';

import {
  PIN_PLUGIN,
  PIN_OPTIONS,
  PIN_CONNECTION
} from './pins';
import {
  EVENTS_CONNECT,
  EVENTS_CONNECT_ERROR,
  EVENTS_DISCONNECT
} from './constants'
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
  PIN_TAGS_DEL_ALL,
} from './modules/pins';

export default RedisPlugin;
export {
  tools,
  
  PIN_PLUGIN,
  PIN_OPTIONS,
  PIN_CONNECTION,

  EVENTS_CONNECT,
  EVENTS_CONNECT_ERROR,
  EVENTS_DISCONNECT,

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
}