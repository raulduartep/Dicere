import { AxiosRequestConfig } from 'axios';
import { useCallback, useEffect, useReducer, useRef } from 'react';
import { FetchError, useAxios } from './useAxios';

interface LazyFetchOptions {
  endpoint: string;
  options: Omit<AxiosRequestConfig, 'url' | 'baseUrl' | 'data' | 'params'>;
  withAuth?: boolean;
}

interface EagerFetchOptions {
  endpoint: string;
  options: Omit<AxiosRequestConfig, 'url' | 'baseUrl'>;
  withAuth?: boolean;
}

export enum RequestType {
  request = 'request',
  success = 'success',
  failure = 'failure',
}

export enum RequestStatus {
  init = 'init',
  error = 'error',
  fetched = 'fetched',
  fetching = 'fetching',
}

type StateSuccess<T> = {
  status: RequestStatus.fetched;
  data: T;
};

type StateFailure = {
  status: RequestStatus.error;
  error?: string;
};

type StateRequest = {
  status: RequestStatus.fetching;
};

type StateInit = {
  status: RequestStatus.init;
};

type State<T> = StateSuccess<T> | StateFailure | StateRequest | StateInit;

type Action<T> =
  | { type: RequestType.request }
  | { type: RequestType.success; payload: T }
  | { type: RequestType.failure; payload: string };

function useFetchReducer<T>() {
  const initialState: State<T> = {
    status: RequestStatus.init,
  };

  const fetchReducer = (state: State<T>, action: Action<T>): State<T> => {
    switch (action.type) {
      case RequestType.request:
        return {
          status: RequestStatus.fetching,
        };
      case RequestType.success:
        return {
          data: action.payload,
          status: RequestStatus.fetched,
        };
      case RequestType.failure:
        return {
          error: action.payload,
          status: RequestStatus.error,
        };
      default:
        return state;
    }
  };

  const [state, dispatchReducer] = useReducer(fetchReducer, initialState);

  return [state, dispatchReducer] as const;
}

export function useEagerFetch<T = Record<string, unknown>>({
  withAuth = true,
  ...options
}: EagerFetchOptions) {
  const dispatch = useAxios({ withAuth });
  const [stateReducer, dispatchReducer] = useFetchReducer<T>();
  const cancelRequest = useRef<boolean>(false);
  const optionsRef = useRef(options);

  function hasAnyUndefinedValue(object: Record<string, unknown>) {
    return Object.values(object).some(item => item === undefined);
  }

  useEffect(() => {
    async function handleData() {
      if (
        (optionsRef.current.options.data &&
          hasAnyUndefinedValue(optionsRef.current.options.data)) ||
        (optionsRef.current.options.params &&
          hasAnyUndefinedValue(optionsRef.current.options.params))
      ) {
        console.error('Data or params options must have a value');
        return;
      }

      if (cancelRequest.current) {
        console.error('Request canceled');
        return;
      }

      try {
        dispatchReducer({ type: RequestType.request });

        const response = await dispatch(optionsRef.current.endpoint, {
          data: optionsRef.current.options.data,
          headers: optionsRef.current.options.headers,
          params: optionsRef.current.options.params,
          method: optionsRef.current.options.method,
        });

        dispatchReducer({ type: RequestType.success, payload: response.data });
      } catch (error) {
        dispatchReducer({
          type: RequestType.failure,
          payload: (error as FetchError).message,
        });
      }
    }

    handleData();

    return () => {
      cancelRequest.current = true;
    };
  }, [dispatch, dispatchReducer]);

  return stateReducer;
}

export function useLazyFetch<T = Record<string, unknown>>({
  withAuth = true,
  endpoint,
  options,
}: LazyFetchOptions) {
  const dispatchAxios = useAxios({ withAuth });
  const [stateReducer, dispatchReducer] = useFetchReducer<T>();
  const optionsRef = useRef(options);

  const dispatchFetch = useCallback(
    async (data: {
      body?: Record<string, unknown>;
      params?: Record<string, string>;
    }) => {
      try {
        dispatchReducer({ type: RequestType.request });

        const response = await dispatchAxios(endpoint, {
          ...optionsRef.current,
          data: data.body,
          params: data.params,
        });

        dispatchReducer({
          type: RequestType.success,
          payload: response.data,
        });
      } catch (error) {
        dispatchReducer({
          type: RequestType.failure,
          payload: (error as FetchError).message,
        });
      }
    },
    [dispatchAxios, dispatchReducer, endpoint]
  );

  return [dispatchFetch, stateReducer] as const;
}
