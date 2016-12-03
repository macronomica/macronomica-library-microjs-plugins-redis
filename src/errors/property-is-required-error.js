import { propertyIsRequiredError } from '@microjs/microjs';
import { PLUGIN_SHORT_NAME } from './../constants';

export default (info = {}) => propertyIsRequiredError({ plugin: PLUGIN_SHORT_NAME, ...info });