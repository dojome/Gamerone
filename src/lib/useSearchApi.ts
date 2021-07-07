import { useState, useReducer, useEffect, useCallback } from 'react';
import { Nullable } from 'interfaces';

type SearchState<T> = {
  results: Array<T>;
  isSearching: boolean;
  isError: boolean;
};
type SearchAction<T> =
  | { type: 'SET_STATE'; payload: SearchState<T> }
  | { type: 'FETCH_INIT' }
  | { type: 'FETCH_SUCCESS'; payload: Array<T> }
  | { type: 'FETCH_FAILURE' };

const createDataFetchReducer = <T>() => (
  state: SearchState<T>,
  action: SearchAction<T>,
): SearchState<T> => {
  switch (action.type) {
    case 'SET_STATE':
      return {
        ...action.payload,
      };
    case 'FETCH_INIT':
      return {
        ...state,
        isSearching: true,
        isError: false,
      };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        isSearching: false,
        isError: false,
        results: action.payload,
      };
    case 'FETCH_FAILURE':
      return {
        ...state,
        isSearching: false,
        isError: true,
      };
    default:
      throw new Error();
  }
};

export type SearchApi = (param?: Nullable<string>) => Promise<any>;

export default function useSearchApi<T>(
  apiAction: SearchApi,
  initialParam: Nullable<string> | undefined,
  initialData: Array<T>,
) {
  const [param, setParam] = useState(initialParam);
  const dataFetchReducer = createDataFetchReducer<T>();
  const [state, dispatch] = useReducer(dataFetchReducer, {
    isSearching: false,
    isError: false,
    results: initialData,
  });

  const setState = useCallback((state: SearchState<T>) => {
    dispatch({ type: 'SET_STATE', payload: state });
  }, []);

  useEffect(() => {
    let didCancel = false;
    const fetchData = async () => {
      dispatch({ type: 'FETCH_INIT' });
      try {
        const data = await apiAction(param);
        if (!didCancel) {
          dispatch({ type: 'FETCH_SUCCESS', payload: data });
        }
      } catch (error) {
        if (!didCancel) {
          dispatch({ type: 'FETCH_FAILURE' });
        }
      }
    };

    if (typeof param !== 'undefined' && param !== null) fetchData();

    return () => {
      didCancel = true;
    };
  }, [param, apiAction]);

  return [state, setParam, setState] as const;
}
