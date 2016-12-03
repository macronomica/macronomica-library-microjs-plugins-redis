import {
  MODULE_NAME,
  ACTION_NAME_GET,
  ACTION_NAME_SET,
  ACTION_NAME_HAS,
  ACTION_NAME_DEL,
} from './constants';

const PIN_CACHE = { role: 'plugin', module: MODULE_NAME };

export const PIN_CACHE_GET = { ...PIN_CACHE, cmd: ACTION_NAME_GET, key: '*', setCb: '*' };
export const PIN_CACHE_SET = { ...PIN_CACHE, cmd: ACTION_NAME_SET, key: '*', value: '*' };
export const PIN_CACHE_HAS = { ...PIN_CACHE, cmd: ACTION_NAME_HAS, key: '*' };
export const PIN_CACHE_DEL = { ...PIN_CACHE, cmd: ACTION_NAME_DEL, key: '*' };
