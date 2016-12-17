import config from 'config';
import chai from 'chai';
import Micro, { LEVEL_ERROR } from '@microjs/microjs';
import RedisPlugin, { PIN_CONNECTION, EVENTS_CONNECT, EVENTS_DISCONNECT } from '../index';

const should = chai.should();
const CONNECT_OPTIONS = config.has('redis') ? config.get('redis') : {};

describe('lifecicle', function() {

  it('#connect', () => new Promise((resolve, reject) => {
    const micro = Micro({
      level  : LEVEL_ERROR,
      plugins: [ RedisPlugin(CONNECT_OPTIONS) ]
    });
    let __client;

    micro.on(EVENTS_CONNECT, result => should.exist(__client = result));

    return micro
      .run()
      .then(() => micro.act(PIN_CONNECTION))
      .then(client => should.equal(__client, client))
      .then(() => micro.end())
      .then(() => __client = null)
      .then(resolve)
      .catch(reject);
  }));

  it('#disconnect', () => new Promise((resolve, reject) => {
    const micro = Micro({
      level  : LEVEL_ERROR,
      plugins: [ RedisPlugin(CONNECT_OPTIONS) ]
    });

    micro.on(EVENTS_DISCONNECT, result => should.equal(null, result));

    return micro
      .run()
      .then(() => micro.end())
      .then(() => micro.act(PIN_CONNECTION))
      .catch(error => Promise.all([
        should.equal(error.code, 'error.common/act.not.found'),
        should.equal(error.message, 'Вызов не существующего маршрута')
      ]))
      .then(resolve)
      .catch(reject);
  }));

});