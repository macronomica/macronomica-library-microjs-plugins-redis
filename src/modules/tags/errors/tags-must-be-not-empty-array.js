import errorMustBeNotEmptyArray from '../../../errors/property-must-be-not-empty-array-error';

export default (ERROR_INFO) => errorMustBeNotEmptyArray({
  ...ERROR_INFO,
  property: 'tags'
});