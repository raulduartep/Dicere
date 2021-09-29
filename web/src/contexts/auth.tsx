import React, { createContext, useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';

import { RequestStatus, useLazyFetch } from '../hooks/useFetch';
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
  ] = useLocalStorage<string>('accessToken');
  const [
    storagedRefreshToken,
    setStoragedRefreshToken,
    removeStoragedRefreshToken,
  ] = useLocalStorage<string>('refreshToken');
  const [, setStoragedUserId, removeStoragedUserId] =
    useLocalStorage<string>('userId');
  const [dispatchFetch, stateFetch] = useLazyFetch<ISessionsData>({
    withAuth: false,
    endpoint: '/sessions/refresh_token',
    options: {
      method: 'POST',
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
      setStoragedAccessToken,
      setStoragedRefreshToken,
      setStoragedUserId,
      connectSocket,
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
    async function handleData(data: ISessionsData) {
      await validate({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        userId: data.user.id,
      });

      toast.info('Usuário já autenticado');
    }

    if (stateFetch.status === RequestStatus.fetched) {
      handleData(stateFetch.data);
    }
  }, [stateFetch, validate]);

  useEffect(() => {
    if (stateFetch.status === RequestStatus.error) {
      invalidate();
    }
  }, [invalidate, stateFetch]);

  useEffect(() => {
    if (storagedAccessToken && storagedRefreshToken && !isValidated) {
      dispatchFetch({
        body: {
          refreshToken: storagedRefreshToken,
          accessToken: storagedAccessToken,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
