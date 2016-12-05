import errorPropertyMustBeType from '../../../errors/property-must-be-type-error';

export default (ERROR_INFO) => errorPropertyMustBeType({
  ...ERROR_INFO,
  property: 'tags',
  type    : 'object'
});