import { URL_PREFIX_CHECK_REGEX } from './constants';

export const refineUrlPrefix = (url: string | null, prefix = 'https') => {
  if (url === null) return null;
  return url.match(URL_PREFIX_CHECK_REGEX) === null
    ? `${prefix}://${url}`
    : url;
};
