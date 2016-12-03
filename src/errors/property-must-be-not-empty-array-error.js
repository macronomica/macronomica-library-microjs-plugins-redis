import { propertyMustBeNotEmptyArrayError } from '@microjs/microjs';
import { PLUGIN_SHORT_NAME } from './../constants';

export default (info = {}) => propertyMustBeNotEmptyArrayError({ plugin: PLUGIN_SHORT_NAME, ...info });