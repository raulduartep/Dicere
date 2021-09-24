import { useField } from '@unform/core';
import React, { TextareaHTMLAttributes, useEffect, useRef } from 'react';

import { Container } from './styles';

type InputProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  placeholder: string;
  name: string;
};

export const TextArea = ({
  className,
  name,
  ...props
}: InputProps): JSX.Element => {
  const { fieldName, registerField, defaultValue } = useField(name);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: textAreaRef,
      getValue: ref => {
        return ref.current.value;
      },
      setValue: (ref, value) => {
        ref.current.value = value;
      },
      clearValue: ref => {
        ref.current.value = '';
      },
    });
  }, [fieldName, registerField]);

  return (
    <Container
      id={fieldName}
      ref={textAreaRef}
      defaultValue={defaultValue}
      name={name}
      rows={1}
      {...props}
    />
  );
};
