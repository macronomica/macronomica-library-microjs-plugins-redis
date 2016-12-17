import config from 'config';
import chai from 'chai';
import Microjs, { LEVEL_WARN } from '@microjs/microjs';
import Plugin, {
  PIN_TAGS_GET,
  PIN_TAGS_SET,
  PIN_TAGS_HAS,
  PIN_TAGS_DEL,
  PIN_TAGS_GET_ALL,
  PIN_TAGS_DEL_ALL
} from '../index';

const micro = Microjs({
  level  : LEVEL_WARN,
  plugins: [
    Plugin(config.has('redis') ? config.get('redis') : {})
  ]
});

const should = chai.should();

before(() => micro.run()
  .then(() => micro.act({ ...PIN_TAGS_DEL_ALL })));

after(() => micro.act({ ...PIN_TAGS_DEL_ALL })
  .then(() => micro.end())
);

describe('tags', function() {
  describe('#set', function() {

    it('should set one tag', () => micro
      .act({ ...PIN_TAGS_SET, tags: [ 'user-1' ] })
      .then(tags => tags.should.have.property('user-1'))
      .then(() => micro.act({ ...PIN_TAGS_DEL_ALL }))
    );

    it('вернет объект с тегами и новыми значениями', () => micro
      .act({
        ...PIN_TAGS_SET,
        tags: [ 'user-1', 'user-2' ]
      })
      .then(tags => Promise.all([
        tags.should.be.a('object').have.all.keys('user-1', 'user-2'),
        tags[ 'user-1' ].should.be.a('number'),
        tags[ 'user-2' ].should.be.a('number'),
      ]))
      .then(() => micro.act({ ...PIN_TAGS_DEL_ALL }))
    );

  });

  describe('#has', function() {

    it('вернет true', () => micro
      .act({ ...PIN_TAGS_SET, tags: [ 'user-1' ] })
      .then(tags => micro.act({ ...PIN_TAGS_HAS, tags }))
      .then(exist => exist.should.be.a('boolean').equal(true))
      .then(() => micro.act({ ...PIN_TAGS_DEL_ALL }))
    );

    it('вернет false', () => micro
      .act({ ...PIN_TAGS_SET, tags: [ 'user-1' ] })
      .then(tags => micro.act({ ...PIN_TAGS_HAS, tags: Object.assign(tags, { 'user-1': tags + 10 }) }))
      .then(exist => exist.should.be.a('boolean').equal(false))
      .then(() => micro.act({ ...PIN_TAGS_DEL_ALL }))
    );

  });

  describe('#get', function() {

    it('вернет объект со значениями null для переданных тегов', () => micro
      .act({ ...PIN_TAGS_GET, tags: [ 'user-1', 'user-2', 'user-3' ] })
      .then(tags => tags.should.to.contain.all.keys({ 'user-1': null, 'user-2': null, 'user-3': null }))
    );

    it('вернет объект со значениями для переданных тегов', () => micro
      .act({ ...PIN_TAGS_SET, tags: [ 'user-1', 'user-2' ] })
      .then(tags => micro
        .act({ ...PIN_TAGS_GET, tags: [ 'user-1', 'user-2' ] })
        .then(result => Promise.all([
          result.should.to.contain.all.keys([ 'user-1', 'user-2' ]),
          result[ 'user-1' ].should.equal(tags[ 'user-1' ]),
          result[ 'user-2' ].should.equal(tags[ 'user-2' ]),
        ]))
      )
      .then(() => micro.act({ ...PIN_TAGS_DEL_ALL }))
    );

  });

  describe('#del', function() {

    it('вернет объект со значениtv null для переданных тегов', () => micro
      .act({ ...PIN_TAGS_SET, tags: [ 'user-1', 'user-2' ] })
      .then(tags => micro.act({ ...PIN_TAGS_DEL, tags: [ 'user-1' ] })
        .then(() => micro.act({ ...PIN_TAGS_GET, tags: [ 'user-1' ] }))
        .then(result => Promise.all([
          result.should.to.contain.all.keys([ 'user-1' ]),
          result.should.have.property('user-1').equal(null)
        ]))
      )
      .then(() => micro.act({ ...PIN_TAGS_DEL_ALL }))
    );

  });

  describe('#get-all', function() {

    it('вернет объект со значениями для переданных тегов', () => micro
      .act({ ...PIN_TAGS_SET, tags: [ 'user-1', 'user-2' ] })
      .then(tags => micro
        .act({ ...PIN_TAGS_GET_ALL })
        .then(result => Promise.all([
          result.should.to.contain.all.keys([ 'user-1', 'user-2' ]),
          result[ 'user-1' ].should.equal(tags[ 'user-1' ]),
          result[ 'user-2' ].should.equal(tags[ 'user-2' ]),
        ]))
      )
      .then(() => micro.act({ ...PIN_TAGS_DEL_ALL }))
    );

  });

  describe('#del-all', function() {

    it('вернет объект со значениями для переданных тегов', () => micro
      .act({ ...PIN_TAGS_SET, tags: [ 'user-1', 'user-2' ] })
      .then(() => micro.act({ ...PIN_TAGS_DEL_ALL }))
      .then(tags => micro.act({ ...PIN_TAGS_GET_ALL })
        .then(result => should.equal(null, result))
      )
    );

  });
});
