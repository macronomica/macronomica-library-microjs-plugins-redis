import errorPropertyMustBeTypes from '../../../errors/property-must-be-types-error';

export default (info = {}) => errorPropertyMustBeTypes({
  ...info,
  property: 'tags',
  types   : [ 'array', 'undefined' ]
});