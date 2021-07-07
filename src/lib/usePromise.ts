import { useState, useEffect } from 'react';
import { Nullable } from 'interfaces';

/**
 * An efficient custom hook that handles promise
 *
 * Caveat - Can't be used inside event handler, only useful inside component or hook
 * @param {Func} promiseCreator
 * @param {Array} deps  dependency array
 */
export default function usePromise<T>(
  promiseCreator: () => Promise<any>,
  deps: Array<any>,
) {
  const [loading, setLoading] = useState(false);
  const [resolved, setResolved] = useState<Nullable<T>>(null);
  const [error, setError] = useState<Nullable<Error>>(null);

  useEffect(() => {
    const process = async () => {
      setLoading(true);
      try {
        const resolved = await promiseCreator();
        setResolved(resolved);
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };
    process();
    return () => {
      setResolved(null);
      setError(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return [loading, resolved, error] as const;
}
