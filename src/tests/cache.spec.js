import config from 'config';
import chai from 'chai';
import Microjs, { LEVEL_WARN } from '@microjs/microjs';
import Plugin, {
  PIN_CACHE_GET,
  PIN_CACHE_SET,
  PIN_CACHE_HAS,
  PIN_CACHE_DEL
} from '../index';

const micro = Microjs({
  level  : LEVEL_WARN,
  plugins: [
    Plugin(config.has('redis') ? config.get('redis') : {})
  ]
});

const should = chai.should();
const key = 'test-key';
export const DATA = {
  null       : null,
  'undefined': undefined,
  number     : 1,
  string     : 'string',
  boolean    : true,
  date       : new Date(),
  narray     : [ 1, 2, 3 ],
  barray     : [ true, false ],
  sarray     : [ 's1', 's2', 's3' ]
};

before(() => micro.run()
  .then(() => micro.act({ ...PIN_CACHE_DEL, key })));

after(() => micro.act({ ...PIN_CACHE_DEL, key })
  .then(() => micro.end()));

describe('cache', function() {

  it('#plugin.get -> должен вернуть null', () => micro
      .act({ ...PIN_CACHE_GET, key })
      .then(result => should.equal(null, result))
  );

  it('#plugin.set + plugin.get -> должен вернуть объект', () =>
    micro
      .act({ ...PIN_CACHE_SET, key, value: DATA })
      .then(() => micro.act({ ...PIN_CACHE_GET, key }))
      .then(result => result.should.be.a('object'))
      .then(() => micro.act({ ...PIN_CACHE_DEL, key }))
      .then(() => micro.act({ ...PIN_CACHE_GET, key }))
      .then(result => should.equal(null, result))
      .then(() => micro.act({ ...PIN_CACHE_DEL, key }))
  );


  it('#plugin.read + callback -> должен вернуть объект', () => micro
    .act({ ...PIN_CACHE_GET, key, setCb: () => DATA })
    .then(result => should.equal(result, DATA))
    .then(() => micro.act({ ...PIN_CACHE_GET, key }))
    .then(result => Promise.all([
      should.not.equal(null, result),
      result.should.be.a('object')
    ]))
    .then(() => micro.act({ ...PIN_CACHE_DEL, key }))
  );

  it('#plugin.read + callback():Promise -> должен вернуть объект', () => micro
    .act({ ...PIN_CACHE_GET, key, setCb: () => Promise.resolve(DATA) })
    .then(result => should.equal(result, DATA))
    .then(() => micro.act({ ...PIN_CACHE_GET, key }))
    .then(result => Promise.all([
      should.not.equal(null, result),
      result.should.be.a('object')
    ]))
    .then(() => micro.act({ ...PIN_CACHE_DEL, key })));
});