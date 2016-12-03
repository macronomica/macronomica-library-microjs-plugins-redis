import { propertyMustBeTypeError } from '@microjs/microjs';
import { PLUGIN_SHORT_NAME } from './../constants';

export default (info = {}) => propertyMustBeTypeError({ plugin: PLUGIN_SHORT_NAME, ...info });