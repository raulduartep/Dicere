import React, { createContext, useState, useEffect, useCallback } from 'react';

import { RequestStatus, useEagerFetch } from '../hooks/useFetch';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useSocket } from '../hooks/useSocket';

export type IStoragedTokens = {
  accessToken: string;
  refreshToken: string;
  userId: string;
};

export type ISessionsData = {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
  };
};

export interface AuthContextData {
  isValidated: boolean;
  validate(data: IStoragedTokens): Promise<void>;
  invalidate(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [isValidated, setIsValidated] = useState(false);
  const { connectSocket, disconnectSocket } = useSocket();
  const [
    storagedAccessToken,
    setStoragedAccessToken,
    removeStoragedAccessToken,
  ] = useLocalStorage('accessToken');
  const [
    storagedRefreshToken,
    setStoragedRefreshToken,
    removeStoragedRefreshToken,
  ] = useLocalStorage('refreshToken');
  const [, setStoragedUserId, removeStoragedUserId] =
    useLocalStorage<string>('userId');
  const stateFetch = useEagerFetch<ISessionsData>({
    withAuth: false,
    endpoint: '/sessions/refresh_token',
    options: {
      method: 'POST',
      data: {
        refreshToken: storagedRefreshToken,
        accessToken: storagedAccessToken,
      },
    },
  });

  const validate = useCallback(
    async ({ accessToken, refreshToken, userId }: IStoragedTokens) => {
      await connectSocket(accessToken);
      setStoragedAccessToken(accessToken);
      setStoragedRefreshToken(refreshToken);
      setStoragedUserId(userId);
      setIsValidated(true);
    },
    [
      connectSocket,
      setStoragedAccessToken,
      setStoragedRefreshToken,
      setStoragedUserId,
    ]
  );

  const invalidate = useCallback(() => {
    removeStoragedAccessToken();
    removeStoragedRefreshToken();
    removeStoragedUserId();
    disconnectSocket();
    setIsValidated(false);
  }, [
    disconnectSocket,
    removeStoragedAccessToken,
    removeStoragedRefreshToken,
    removeStoragedUserId,
  ]);

  useEffect(() => {
    if (stateFetch.status === RequestStatus.fetched) {
      validate({
        accessToken: stateFetch.data.accessToken,
        refreshToken: stateFetch.data.refreshToken,
        userId: stateFetch.data.user.id,
      });
    }
  }, [stateFetch, validate]);

  useEffect(() => {
    if (stateFetch.status === RequestStatus.error) {
      removeStoragedAccessToken();
      removeStoragedRefreshToken();
      removeStoragedUserId();
    }
  }, [
    removeStoragedAccessToken,
    removeStoragedRefreshToken,
    removeStoragedUserId,
    stateFetch.status,
  ]);

  return (
    <AuthContext.Provider
      value={{
        isValidated,
        invalidate,
        validate,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
