import { FormHandles } from '@unform/core';
import { LoginBox, FormData } from 'components/organisms/LoginBox';
import { MainTemplate } from 'components/templates/MainTemplate';
import { useLocalStorage } from 'hooks/useLocalStorage';
import React, { useRef, useEffect } from 'react';

import { Redirect, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import logo from '../assets/static/logo.svg';
import { ISessionsData } from '../contexts/auth';
import { useAuth } from '../hooks/useAuth';
import { RequestStatus, useLazyFetch } from '../hooks/useFetch';

type IStateType = {
  from: { pathname: string };
};

type IStoragedAuth = {
  email: string;
  password: string;
};

export const LoginPage = (): JSX.Element => {
  const { isSigned, signIn } = useAuth();
  const location = useLocation<IStateType>();
  const formDataRef = useRef<FormData>();
  const formRef = useRef<FormHandles>(null);
  const [, setStoragedRememberAuth] =
    useLocalStorage<IStoragedAuth>('rememberAuth');
  const [fetchSignIn, stateSignIn] = useLazyFetch<ISessionsData>({
    endpoint: 'sessions',
    withAuth: false,
    options: {
      method: 'POST',
    },
  });

  const locationRef = useRef(location.state || { from: { pathname: '/app' } });

  function handleSubmit(data: FormData) {
    fetchSignIn({
      body: data,
    });

    formDataRef.current = data;
  }

  useEffect(() => {
    async function handleData() {
      if (stateSignIn.status === RequestStatus.fetched) {
        try {
          await signIn({
            accessToken: stateSignIn.data.accessToken,
            refreshToken: stateSignIn.data.refreshToken,
            userId: stateSignIn.data.user.id,
          });

          if (formDataRef.current) {
            setStoragedRememberAuth(formDataRef.current);
          }

          toast.success('Usuário autenticado com sucesso');
          formRef.current?.reset();
        } catch (error) {
          toast.error(error.message);
        }
      }
    }

    handleData();
  }, [setStoragedRememberAuth, signIn, stateSignIn]);

  if (isSigned) {
    return <Redirect to={locationRef.current.from} />;
  }

  return (
    <MainTemplate
      featureImage={logo}
      responsive
      pageTitle="Dicere - Faça login"
      content={
        <LoginBox
          formRef={formRef}
          loading={stateSignIn.status === RequestStatus.fetching}
          onSubmit={handleSubmit}
        />
      }
    />
  );
};
