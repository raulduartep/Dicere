import axios, { AxiosRequestConfig } from 'axios';
import { useCallback } from 'react';

import { useAuth } from './useAuth';
import { useLocalStorage } from './useLocalStorage';

interface FetchOptions {
  withAuth?: boolean;
}

export class FetchError extends Error {
  readonly statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'FetchError';
  }
}

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export function useAxios({ withAuth }: FetchOptions) {
  const [storagedAccessToken, setStoragedAccessToken] =
    useLocalStorage<string>('accessToken');
  const [storagedRefreshToken, setStoragedRefreshToken] =
    useLocalStorage<string>('refreshToken');
  const { signOut } = useAuth();

  const refreshTokens = useCallback(async () => {
    try {
      const { data } = await api.post('/sessions/refresh_token', {
        accessToken: storagedAccessToken,
        refreshToken: storagedRefreshToken,
      });

      setStoragedAccessToken(data.accessToken);
      setStoragedRefreshToken(data.refreshToken);
    } catch (error) {
      signOut();
      if (axios.isAxiosError(error)) {
        if (error.response) {
          throw new FetchError(
            error.response.data.message,
            error.response.status
          );
        }
      }

      throw new Error('Verifique sua conexão com a internet');
    }
  }, [
    setStoragedAccessToken,
    setStoragedRefreshToken,
    signOut,
    storagedAccessToken,
    storagedRefreshToken,
  ]);

  const retryRequest = useCallback(
    async (url: string, axiosOptions: AxiosRequestConfig) => {
      try {
        const retryResponse = await api(url, {
          ...axiosOptions,
          headers: {
            ...axiosOptions.headers,
            Authorization: `Bearer ${storagedAccessToken}`,
          },
        });

        return retryResponse;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response) {
            if (error.response.status === 401) {
              signOut();
            }

            throw new FetchError(
              error.response.data.message,
              error.response.status
            );
          }
        }

        throw new Error('Verifique sua conexão com a internet');
      }
    },
    [signOut, storagedAccessToken]
  );

  const dispatch = useCallback(
    async (url: string, axiosOptions: AxiosRequestConfig) => {
      try {
        const response = await api(url, {
          ...axiosOptions,
          headers: {
            ...axiosOptions.headers,
            Authorization: withAuth && `Bearer ${storagedAccessToken}`,
          },
        });

        return response;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response) {
            if (error.response.status === 401 && withAuth) {
              try {
                await refreshTokens();
                await retryRequest(url, axiosOptions);
              } catch (err) {
                throw error;
              }
            }

            throw new FetchError(
              error.response.data.message,
              error.response.status
            );
          }
        }

        throw new Error('Verifique sua conexão com a internet');
      }
    },
    [refreshTokens, retryRequest, storagedAccessToken, withAuth]
  );

  return dispatch;
}
