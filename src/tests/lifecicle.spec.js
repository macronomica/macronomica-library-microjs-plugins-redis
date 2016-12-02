import chai from 'chai';
import Micro, { LEVEL_ERROR } from '@microjs/microjs';
import { CONNECT_OPTIONS } from './constants';
import RedisPlugin, { PIN_CONNECTION, EVENTS_CONNECT, EVENTS_DISCONNECT } from '../index';

const should = chai.should();

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
      .catch(error => should.equal(
        error,
        `Вызов не существующего маршрута: ${ JSON.stringify(PIN_CONNECTION) }`
      ))
      .then(resolve)
      .catch(reject);
  }));

});