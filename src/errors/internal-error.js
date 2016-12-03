import { internalError } from '@microjs/microjs';
import { PLUGIN_SHORT_NAME } from './../constants';

export default (app, outerError, info = {}) =>
  internalError(app, outerError, { plugin: PLUGIN_SHORT_NAME, ...info });