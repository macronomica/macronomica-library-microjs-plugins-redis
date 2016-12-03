import errorPropertyMustBeTypes from '../../../errors/property-must-be-types-error';

export default (info = {}) => errorPropertyMustBeTypes({
  ...info,
  property: 'setCb',
  types   : [ 'function', 'undefined' ]
});