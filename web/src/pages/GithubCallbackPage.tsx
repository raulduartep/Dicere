import { LoadingTemplate } from 'components/templates/LoadingTemplate';
import React, { useEffect, useRef } from 'react';

import { Redirect, useHistory, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FiGithub } from 'react-icons/fi';
import { ISessionsData } from '../contexts/auth';
import { useAuth } from '../hooks/useAuth';
import { RequestStatus, useEagerFetch } from '../hooks/useFetch';
import { useQuery } from '../hooks/useQuery';

type ParamsGithubCallback = {
  code: string;
};

type IStateType = {
  from: { pathname: string };
};

export const GithubCalbackPage = (): JSX.Element => {
  const { code } = useQuery<ParamsGithubCallback>();
  const { isSigned, signIn } = useAuth();
  const stateGithubSignIn = useEagerFetch<ISessionsData>({
    endpoint: 'sessions/google',
    withAuth: false,
    options: {
      method: 'GET',
      params: {
        code,
      },
    },
  });
  const history = useHistory();
  const location = useLocation<IStateType>();
  const locationRef = useRef(location.state || { from: { pathname: '/app' } });

  useEffect(() => {
    if (!code) {
      toast.error('Código não informado');
      history.push('/');
    }
  });

  useEffect(() => {
    if (stateGithubSignIn.status === RequestStatus.fetched) {
      (async () => {
        try {
          await signIn({
            accessToken: stateGithubSignIn.data.accessToken,
            refreshToken: stateGithubSignIn.data.refreshToken,
            userId: stateGithubSignIn.data.user.id,
          });
          history.push(locationRef.current.from);
          toast.success('Usuário autenticado com sucesso');
        } catch (error) {
          console.log(error);
        }
      })();
      return;
    }

    if (stateGithubSignIn.status === RequestStatus.error) {
      toast.error(stateGithubSignIn.error);
      history.push('/');
    }
  }, [history, signIn, stateGithubSignIn]);

  if (isSigned) {
    toast.info('Usuário já autenticado');
    return <Redirect to={locationRef.current.from} />;
  }

  return (
    <LoadingTemplate featureImage={FiGithub} text="Carregando informações..." />
  );
};
