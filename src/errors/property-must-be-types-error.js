import { propertyMustBeTypesError } from '@microjs/microjs';
import { PLUGIN_SHORT_NAME } from './../constants';

export default (info = {}) => propertyMustBeTypesError({ plugin: PLUGIN_SHORT_NAME, ...info });