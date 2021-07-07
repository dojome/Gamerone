export const capFLetter = (value: string) => {
  return value[0].toUpperCase() + value.slice(1);
};

/**
 * Rewrite string in camelCase
 */
const toCamel = (s: string): string => {
  return s.replace(/([-_][a-z])/gi, ($1) => {
    return $1.toUpperCase().replace('-', '').replace('_', '');
  });
};

/**
 * Rwrite string in snake_case
 */
const toSnake = (s: string): string => {
  return s
    .replace(/\W+/g, ' ')
    .split(/ |\B(?=[A-Z])/)
    .map((word) => word.toLowerCase())
    .join('_');
};

/**
 * Check if param is type of array
 */
const isArray = function (a: any) {
  return Array.isArray(a);
};

/**
 * Check if param is type of object
 */
const isObject = function (o: any) {
  return o === Object(o) && !isArray(o) && typeof o !== 'function';
};

/**
 * Convert object keys to camelCase
 */
export const keysToCamel = function (o: any) {
  if (isObject(o)) {
    const n: { [key: string]: any } = {};

    Object.keys(o).forEach((k) => {
      n[toCamel(k)] = keysToCamel(o[k]);
    });

    return n;
  } else if (isArray(o)) {
    return o.map((i: any) => {
      return keysToCamel(i);
    });
  }

  return o;
};

/**
 * Convert object keys to snake_case
 */
export const keysToSnake = function (o: any) {
  if (isObject(o)) {
    const n: { [key: string]: any } = {};

    Object.keys(o).forEach((k) => {
      n[toSnake(k)] = keysToSnake(o[k]);
    });

    return n;
  } else if (isArray(o)) {
    return o.map((i: any) => {
      return keysToSnake(i);
    });
  }

  return o;
};

export const truncateString = (str: string, num: number) => {
  // If the length of str is less than or equal to num
  // just return str--don't truncate it.
  if (str.length <= num) {
    return str;
  }
  // Return str truncated with '...' concatenated to the end of str.
  return str.slice(0, num) + '...';
};
