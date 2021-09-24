import { FormHandles, SubmitHandler } from '@unform/core';
import { Form } from '@unform/web';
import { Button } from 'components/molecules/Button';
import { CheckBox } from 'components/molecules/CheckBox';
import { InputUnForm } from 'components/molecules/InputUnForm';
import React, { RefObject, useEffect, useState } from 'react';
import { FaGoogle, FaEnvelope, FaLock } from 'react-icons/fa';
import { FiGithub } from 'react-icons/fi';
import * as Yup from 'yup';

import { useLocalStorage } from 'hooks/useLocalStorage';
import { useValidationYup } from 'hooks/useValidationYup';
import { Box } from 'components/atoms/Box';
import { Link } from 'components/atoms/Link';
import { Content, Footer, Complements, CreateAccount } from './styles';

type Props = {
  loading: boolean;
  onSubmit(data: FormData): void;
  formRef: RefObject<FormHandles>;
};

export type FormData = {
  email: string;
  password: string;
};

type IStoragedAuth = {
  email: string;
  password: string;
};

const shape = {
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('E-mail é obrigatório'),
  password: Yup.string().required('Senha é obrigatório'),
};

export const LoginBox = ({
  loading,
  onSubmit,
  formRef,
}: Props): JSX.Element => {
  const [isRemember, setIsRemember] = useState(false);
  const { validate } = useValidationYup(shape);
  const [storagedRememberAuth] = useLocalStorage<IStoragedAuth>('rememberAuth');

  const handleSubmit: SubmitHandler<FormData> = async data => {
    const errors = await validate(data);

    formRef.current?.setErrors(errors || {});

    if (!errors) {
      onSubmit(data);
    }
  };

  function handleAuthGoogle() {
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/userinfo.email%20https://www.googleapis.com/auth/userinfo.profile&redirect_uri=${process.env.REACT_APP_GOOGLE_AUTH_REDIRECT_URI}&response_type=code&client_id=${process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID}`;
  }

  function handleAuthGithub() {
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_AUTH_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_GITHUB_AUTH_REDIRECT_URI}&scope=read:user%20user:email`;
  }

  useEffect(() => {
    if (storagedRememberAuth) {
      formRef.current?.setData({
        email: storagedRememberAuth.email,
        password: storagedRememberAuth.password,
      });

      setIsRemember(true);
    }
  }, [formRef, storagedRememberAuth]);

  return (
    <Box elevation="twodp">
      <Content>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <InputUnForm
            name="email"
            placeholder="E-mail"
            type="email"
            required
            icon={FaEnvelope}
          />
          <InputUnForm
            name="password"
            placeholder="Password"
            type="password"
            required
            icon={FaLock}
          />
          <Button type="submit" loading={loading} text="Entrar" />
        </Form>
        <Complements>
          <CheckBox
            isChecked={isRemember}
            onClick={() => setIsRemember(!isRemember)}
            label="Lembrar-me"
          />

          <Link to="/forgot">Esqueci minha senha</Link>
        </Complements>
        <CreateAccount>
          <p>Precisa criar uma conta ?</p>
          <Link to="/create">Registre-se</Link>
        </CreateAccount>
      </Content>
      <Footer>
        <p>Ou entre com</p>
        <Button
          variant="outlined"
          text="Google"
          icon={FaGoogle}
          onClick={handleAuthGoogle}
        />
        <Button
          variant="outlined"
          text="Github"
          icon={FiGithub}
          onClick={handleAuthGithub}
        />
      </Footer>
    </Box>
  );
};
