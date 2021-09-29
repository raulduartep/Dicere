import React, { useRef, useEffect, useCallback } from 'react';
import { LoadingTemplate } from 'components/templates/LoadingTemplate';

import { Redirect, useHistory, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaGoogle } from 'react-icons/fa';
import { ISessionsData } from '../contexts/auth';
import { useAuth } from '../hooks/useAuth';
import { RequestStatus, useLazyFetch } from '../hooks/useFetch';
import { useQuery } from '../hooks/useQuery';

type ParamsGoogleCallback = {
  code: string;
};

type IStateType = {
  from: { pathname: string };
};

export const GoogleCalbackPage = (): JSX.Element => {
  const { code } = useQuery<ParamsGoogleCallback>();
  const { isSigned, signIn } = useAuth();
  const [dispatchGoogleSignIn, stateGoogleSignIn] = useLazyFetch<ISessionsData>(
    {
      endpoint: 'sessions/google',
      withAuth: false,
      options: {
        method: 'GET',
      },
    }
  );
  const history = useHistory();
  const location = useLocation<IStateType>();
  const locationRef = useRef(location.state || { from: { pathname: '/app' } });

  const handleGoogleSignIn = useCallback(() => {
    dispatchGoogleSignIn({
      params: {
        code,
      },
    });
  }, [code, dispatchGoogleSignIn]);

  useEffect(() => {
    if (!code) {
      toast.error('Código não informado');
      history.push('/');
    }
  });

  useEffect(() => {
    if (!isSigned) {
      handleGoogleSignIn();
    }
  }, [handleGoogleSignIn, isSigned]);

  useEffect(() => {
    if (stateGoogleSignIn.status === RequestStatus.fetched) {
      (async () => {
        try {
          await signIn({
            accessToken: stateGoogleSignIn.data.accessToken,
            refreshToken: stateGoogleSignIn.data.refreshToken,
            userId: stateGoogleSignIn.data.user.id,
          });
          history.push(locationRef.current.from);
          toast.success('Usuário autenticado com sucesso');
        } catch (error) {
          console.log(error);
        }
      })();
    }

    if (stateGoogleSignIn.status === RequestStatus.error) {
      toast.error(stateGoogleSignIn.error);
      history.push('/');
    }
  }, [history, signIn, stateGoogleSignIn]);

  if (isSigned) {
    return <Redirect to={locationRef.current.from} />;
  }

  return (
    <LoadingTemplate featureImage={FaGoogle} text="Carregando informações..." />
  );
};
