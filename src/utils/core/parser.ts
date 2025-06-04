/**
 * Extracts parameters enclosed in square brackets from a given path string.
 *
 * @param path - The path string containing parameters enclosed in square brackets.
 * @returns An array of parameter names extracted from the path. If no parameters are found, returns an empty array.
 *
 * @example
 * ```typescript
 * const params = extractParamsFromPath('/users/[userId]/posts/[postId]');
 * console.log(params); // Output: ['userId', 'postId']
 * ```
 */
export function extractParamsFromPath(path: string): string[] {
  const params = path.match(/\[.*?\]/g);

  if (!params) return [];

  return params.map((param) => param.slice(1, -1));
}

/**
 * Replaces placeholders in a given path with corresponding values from a data object.
 *
 * @template T - The type of the data object.
 * @param {string} path - The path containing placeholders in the format `[param]`.
 * @param {string[]} params - An array of parameter names to be replaced in the path.
 * @param {T} data - The data object containing values for the placeholders.
 * @returns {string} - The path with placeholders replaced by corresponding values from the data object.
 * @example
 * ```typescript
 * const path = '/users/[userId]/posts/[postId]';
 * const params = extractParamsFromPath(path);
 * const data = { userId: 123, postId: 456 };
 * const result = replaceParamsInPath(path, params, data);
 * console.log(result); // Output: '/users/123/posts/456'
 * ```
 */
export function replaceParamsInPath<T>(
  path: string,
  params: string[],
  data: T,
): string {
  return params.reduce((path, param) => {
    const value = data[param as keyof T];

    return value !== undefined
      ? path.replace(`[${param}]`, String(value))
      : path;
  }, path);
}
