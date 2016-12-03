import cacheModule from './cache';
import tagsModule from './tags';

export default (app, plugin, { onClose }) => {
  cacheModule(app, plugin, { onClose });
  tagsModule(app, plugin, { onClose });
}