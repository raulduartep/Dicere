import React, { useEffect, useRef } from 'react';
import { CreateAccountBox } from 'components/organisms/CreateAccountBox';
import { MainTemplate } from 'components/templates/MainTemplate';
import { toast } from 'react-toastify';
import { FormHandles } from '@unform/core';
import { ConfirmAccountPage } from 'pages/ConfirmAccountPage';
import background from '../assets/static/backgroundCreateAccountPage.svg';
import { RequestStatus, useLazyFetch } from '../hooks/useFetch';

export const CreateAccountPage = (): JSX.Element => {
  const formRef = useRef<FormHandles>(null);
  const [fetch, stateFetch] = useLazyFetch({
    endpoint: '/users',
    withAuth: false,
    options: {
      method: 'POST',
    },
  });

  useEffect(() => {
    if (stateFetch.status === RequestStatus.fetched) {
      toast.success('Conta criada com sucesso.');
    }

    if (stateFetch.status === RequestStatus.error) {
      toast.error(stateFetch.error);
      formRef.current?.reset();
    }
  }, [stateFetch]);

  if (stateFetch.status === RequestStatus.fetched) {
    return <ConfirmAccountPage />;
  }

  return (
    <MainTemplate
      featureImage={background}
      pageTitle="Dicere - Crie sua conta"
      reverse
      content={
        <CreateAccountBox
          formRef={formRef}
          loading={stateFetch.status === RequestStatus.fetching}
          onSubmit={data =>
            fetch({
              body: data,
            })
          }
        />
      }
    />
  );
};
