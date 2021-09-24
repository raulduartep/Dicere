import React, { useEffect } from 'react';
import { LoadingTemplate } from 'components/templates/LoadingTemplate';

import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import logo from '../assets/static/logo.svg';
import { RequestStatus, useEagerFetch } from '../hooks/useFetch';
import { useQuery } from '../hooks/useQuery';

type ParamsVerifyAccount = {
  token: string;
  access_token: string;
};

export const VerifyAccountPage = (): JSX.Element => {
  const { token, access_token: accessToken } = useQuery<ParamsVerifyAccount>();
  const history = useHistory();
  const stateFetch = useEagerFetch({
    endpoint: '/users/verify',
    withAuth: false,
    options: {
      method: 'POST',
      params: {
        token,
        accessToken,
      },
    },
  });

  useEffect(() => {
    if (!token) {
      toast.error('Token não informado');
      history.push('/');
      return;
    }

    if (!accessToken) {
      toast.error('Token de acesso não informado');
      history.push('/');
    }
  });

  useEffect(() => {
    if (stateFetch.status === RequestStatus.fetched) {
      toast.success('Conta verificada com sucesso.');
      history.push('/');
      return;
    }

    if (stateFetch.status === RequestStatus.error) {
      toast.error(stateFetch.error);
      history.push('/');
    }
  }, [history, stateFetch]);

  return <LoadingTemplate featureImage={logo} text="Verificando conta..." />;
};
