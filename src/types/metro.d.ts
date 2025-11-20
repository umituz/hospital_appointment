/**
 * Metro Bundler Type Definitions
 *
 * Provides TypeScript type definitions for Metro bundler features
 * that are not included in standard React Native types
 */

declare interface RequireContext {
  /** Returns an array of all possible requests that the context module can handle */
  keys(): string[];

  /** Returns the module id of the request */
  (id: string): any;

  /** Returns the module id of the request (generic version) */
  <T>(id: string): T;

  /** Returns the module id of the request without executing the module */
  resolve(id: string): string;

  /** The module id of the context module */
  id: string;
}

declare interface NodeRequire {
  /**
   * Metro bundler require.context
   *
   * @param directory - Directory to search
   * @param useSubdirectories - Whether to search subdirectories
   * @param regExp - Regular expression to filter files
   * @param mode - Loading mode ('sync' | 'eager' | 'lazy' | 'lazy-once')
   *
   * @example
   * ```typescript
   * const context = require.context('./', false, /\.json$/);
   * const modules = {};
   * context.keys().forEach(key => {
   *   modules[key] = context(key);
   * });
   * ```
   */
  context(
    directory: string,
    useSubdirectories?: boolean,
    regExp?: RegExp,
    mode?: 'sync' | 'eager' | 'lazy' | 'lazy-once'
  ): RequireContext;
}
