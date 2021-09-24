import React, { useRef, useEffect } from 'react';
import { FormHandles } from '@unform/core';
import { ResetPasswordBox } from 'components/organisms/ResetPasswordBox';
import { MainTemplate } from 'components/templates/MainTemplate';

import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import background from '../assets/static/backgroundResetPassword.svg';
import { RequestStatus, useLazyFetch } from '../hooks/useFetch';
import { useQuery } from '../hooks/useQuery';

type ParamsResetPassword = {
  token: string;
  access_token: string;
};

export const ResetPasswordPage = (): JSX.Element => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
  const { token, access_token: accessToken } = useQuery<ParamsResetPassword>();
  const [fetch, stateFetch] = useLazyFetch({
    endpoint: '/users/reset_password',
    withAuth: false,
    options: {
      method: 'POST',
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
      toast.success('Senha resetada com sucesso.');
      formRef.current?.reset();
      history.push('/');
      return;
    }

    if (stateFetch.status === RequestStatus.error) {
      toast.error(stateFetch.error);
      history.push('/');
    }
  }, [history, stateFetch]);

  return (
    <MainTemplate
      pageTitle="Dicere - Resete sua senha"
      featureImage={background}
      content={
        <ResetPasswordBox
          onSubmit={data =>
            fetch({
              body: data,
              params: {
                token,
                access_token: accessToken,
              },
            })
          }
          loading={stateFetch.status === RequestStatus.fetching}
          formRef={formRef}
        />
      }
    />
  );
};
