import {
  MODULE_NAME,
  ACTION_NAME_GET,
  ACTION_NAME_SET,
  ACTION_NAME_HAS,
  ACTION_NAME_DEL,
  ACTION_NAME_GET_ALL,
  ACTION_NAME_DEL_ALL
} from './constants';

const PIN_TAGS = { role: 'plugin', module: MODULE_NAME };

export const PIN_TAGS_GET = { ...PIN_TAGS, cmd: ACTION_NAME_GET, tags: '*' };
export const PIN_TAGS_SET = { ...PIN_TAGS, cmd: ACTION_NAME_SET, tags: '*' };
// Проверяет наличие тегов и их актуальность
export const PIN_TAGS_HAS = { ...PIN_TAGS, cmd: ACTION_NAME_HAS, tags: '*' };
export const PIN_TAGS_DEL = { ...PIN_TAGS, cmd: ACTION_NAME_DEL, tags: '*' };

export const PIN_TAGS_GET_ALL = { ...PIN_TAGS, cmd: ACTION_NAME_GET_ALL };
export const PIN_TAGS_DEL_ALL = { ...PIN_TAGS, cmd: ACTION_NAME_DEL_ALL };

