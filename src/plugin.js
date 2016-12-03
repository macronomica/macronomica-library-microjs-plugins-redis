import middleware from 'redis';
import { genid } from '@microjs/microjs';
import connect from './connect';
import disconnect from './disconnect';
import modules from './modules';
import { PIN_PLUGIN, PIN_OPTIONS, PIN_CONNECTION } from './pins';

export default (settings = {}) => {

  return (app, { onClose }) => {
    const plugin = { id: genid(), middleware, client: null };

    app.add(PIN_PLUGIN, () => Promise.resolve(plugin));
    app.add(PIN_OPTIONS, () => Promise.resolve(settings));
    app.add(PIN_CONNECTION, () => Promise.resolve(plugin.client));
  
    modules(app, plugin, { onClose });
    
    onClose(() => {
      app.del(PIN_CONNECTION);
      app.del(PIN_OPTIONS);
      app.del(PIN_PLUGIN);
      return disconnect(app, plugin).then(result => plugin.client = result);
    });

    return connect(app, plugin, settings).then(result => plugin.client = result);
  };
};