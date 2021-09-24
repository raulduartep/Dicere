import { FormHandles } from '@unform/core';
import { ForgotPasswordBox } from 'components/organisms/ForgotPasswordBox';
import { MainTemplate } from 'components/templates/MainTemplate';
import React, { useRef, useEffect } from 'react';

import { toast } from 'react-toastify';
import background from '../assets/static/backgroundForgotPage.svg';
import { RequestStatus, useLazyFetch } from '../hooks/useFetch';
import { CheckEmailPage } from './CheckEmailPage';

export const ForgotPasswordPage = (): JSX.Element => {
  const formRef = useRef<FormHandles>(null);
  const [fetch, stateFetch] = useLazyFetch({
    endpoint: '/users/forgot_password',
    withAuth: false,
    options: {
      method: 'POST',
    },
  });
  useEffect(() => {
    if (stateFetch.status === RequestStatus.fetched) {
      toast.success('Senha resetada com sucesso.');
    }

    if (stateFetch.status === RequestStatus.error) {
      toast.error(stateFetch.error);
      formRef.current?.reset();
    }
  }, [stateFetch]);

  if (stateFetch.status === RequestStatus.fetched) {
    return <CheckEmailPage />;
  }

  return (
    <MainTemplate
      reverse
      featureImage={background}
      pageTitle="Dicere - Esqueceu sua senha"
      content={
        <ForgotPasswordBox
          onSubmit={data => fetch({ body: data })}
          loading={stateFetch.status === RequestStatus.fetching}
          formRef={formRef}
        />
      }
    />
  );
};
