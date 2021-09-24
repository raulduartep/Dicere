import { FormHandles, SubmitHandler } from '@unform/core';
import { Form } from '@unform/web';
import { Button } from 'components/molecules/Button';
import { InputUnForm } from 'components/molecules/InputUnForm';
import { useValidationYup } from 'hooks/useValidationYup';
import React, { RefObject } from 'react';
import { FaEnvelope, FaLock, FaUser } from 'react-icons/fa';
import * as Yup from 'yup';
import { PageBox } from '../PageBox';

type Props = {
  loading: boolean;
  onSubmit(data: FormData): void;
  formRef: RefObject<FormHandles>;
};

export type FormData = {
  email: string;
  name: string;
  password: string;
  confirmedPassword: string;
};

const shape = {
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('E-mail é obrigatório'),
  password: Yup.string()
    .min(6, 'Senha deve ter no mínimo 6 caracteres')
    .required('Senha é obrigatório'),
  confirmationPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Senhas não conferem')
    .required('Confirmação de senha é obrigatório'),
  name: Yup.string()
    .matches(/^\s*[\S]+(\s[\S]+)+\s*$/gms, 'Digite seu nome completo')
    .required('Nome é obrigatório'),
};

export const CreateAccountBox = ({
  loading,
  onSubmit,
  formRef,
}: Props): JSX.Element => {
  const { validate } = useValidationYup(shape);

  const handleSubmit: SubmitHandler<FormData> = async data => {
    const errors = await validate(data);

    formRef.current?.setErrors(errors || {});

    if (!errors) {
      onSubmit(data);
    }
  };

  return (
    <PageBox
      title="Crie uma conta"
      description="Preencha o formulário para criar uma conta e converse com seus
  amigos"
      form={
        <Form ref={formRef} onSubmit={handleSubmit}>
          <InputUnForm
            name="name"
            placeholder="Nome"
            type="text"
            icon={FaUser}
          />
          <InputUnForm
            name="email"
            placeholder="E-mail"
            type="text"
            icon={FaEnvelope}
          />
          <InputUnForm
            name="password"
            placeholder="Senha"
            type="password"
            icon={FaLock}
          />
          <InputUnForm
            name="confirmationPassword"
            placeholder="Confirmação sua senha"
            type="password"
            icon={FaLock}
          />
          <Button type="submit" text="Cadastrar" loading={loading} />
        </Form>
      }
    />
  );
};
