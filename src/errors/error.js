export const ERROR_SEPARATOR = ':';
export const ERROR_PREFIX = 'error.plugin-redis';

export const ERROR_INTERNAL_ERROR = 'internal.error';
export const ERROR_PROPERTY_IS_REQUIRED = 'property.is.required';
export const ERROR_PROPERTY_MUST_BE = 'property.must.be';
export const ERROR_PROPERTY_MUST_BE_NOT_EMPTY_ARRAY = 'must.be.not.empty.array';

export default ({ module = '-', action = '-', message = '-' }) => {
  return new Error([
    ERROR_PREFIX,
    module,
    action,
    message
  ].join(ERROR_SEPARATOR));
};