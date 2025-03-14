import * as React from 'react';
import { FetchStateObject } from '~/types/types';
import { FetchState } from '~/utilities/useFetchState';

export const useMakeFetchObject = <T>(fetchState: FetchState<T>): FetchStateObject<T> => {
  const [data, loaded, error, refresh] = fetchState;
  return React.useMemo(() => ({ data, loaded, error, refresh }), [data, loaded, error, refresh]);
};
