import { useField } from '@unform/core';
import React, { InputHTMLAttributes, useEffect, useRef, useState } from 'react';
import { IconBaseProps } from 'react-icons';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

import {
  Container,
  ContainerInput,
  ButtonHidden,
  PreviousIcon,
  Error,
} from './styles';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  placeholder: string;
  icon?: React.FC<IconBaseProps>;
  name: string;
};

export const InputUnForm = ({
  className,
  icon: Icon,
  type = 'text',
  name,
  ...props
}: InputProps): JSX.Element => {
  const [hidden, setHidden] = useState(type === 'password');
  const realType = hidden ? 'password' : type === 'password' ? 'text' : type;
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef,
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

  function handleToggleHidden() {
    setHidden(!hidden);
  }

  return (
    <Container>
      {error && <Error>{error}</Error>}
      <ContainerInput
        className={className}
        withError={!!error}
        isPassword={type === 'password'}
      >
        {!!Icon && <PreviousIcon as={Icon} />}

        <input
          id={fieldName}
          ref={inputRef}
          defaultValue={defaultValue}
          type={realType}
          {...props}
        />

        {type === 'password' && (
          <ButtonHidden
            size="small"
            icon={hidden ? FaEye : FaEyeSlash}
            onClick={handleToggleHidden}
            type="button"
          />
        )}
      </ContainerInput>
    </Container>
  );
};
