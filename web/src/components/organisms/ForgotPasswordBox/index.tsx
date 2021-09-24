import React, { RefObject } from 'react';
import { FormHandles, SubmitHandler } from '@unform/core';
import * as Yup from 'yup';
import { useValidationYup } from 'hooks/useValidationYup';
import { InputUnForm } from 'components/molecules/InputUnForm';
import { FaEnvelope } from 'react-icons/fa';

import { Form } from '@unform/web';
import { Button } from 'components/molecules/Button';
import { PageBox } from '../PageBox';

type Props = {
  loading: boolean;
  onSubmit(data: FormData): void;
  formRef: RefObject<FormHandles>;
};

type FormData = {
  email: string;
};

const shape = {
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('E-mail é obrigatório'),
};

export const ForgotPasswordBox = ({
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
      description="Nos diga seu email e nós resolveremos isso para você."
      title="Eita, esqueceu sua senha ?"
      form={
        <Form ref={formRef} onSubmit={handleSubmit}>
          <InputUnForm
            name="email"
            placeholder="E-mail"
            type="text"
            icon={FaEnvelope}
          />
          <Button text="Enviar" type="submit" loading={loading} />
        </Form>
      }
    />
  );
};
