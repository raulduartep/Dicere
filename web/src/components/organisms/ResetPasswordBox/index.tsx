import React, { RefObject } from 'react';
import { FormHandles, SubmitHandler } from '@unform/core';
import * as Yup from 'yup';
import { useValidationYup } from 'hooks/useValidationYup';
import { InputUnForm } from 'components/molecules/InputUnForm';
import { FaLock } from 'react-icons/fa';

import { Form } from '@unform/web';
import { Button } from 'components/molecules/Button';
import { PageBox } from '../PageBox';

type Props = {
  loading: boolean;
  onSubmit(data: FormData): void;
  formRef: RefObject<FormHandles>;
};

type FormData = {
  password: string;
  confirmedPassword: string;
};
const shape = {
  password: Yup.string()
    .min(6, 'Senha deve ter no mínimo 6 caracteres')
    .required('Senha é obrigatório'),
  confirmationPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Senhas não conferem')
    .required('Confirmação de senha é obrigatório'),
};

export const ResetPasswordBox = ({
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
      description="Preencha o formulário para resetar a sua senha e acessar a
      plataforma."
      title="Resetar senha"
      form={
        <Form ref={formRef} onSubmit={handleSubmit}>
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
          <Button text="Resetar" type="submit" loading={loading} />
        </Form>
      }
    />
  );
};
