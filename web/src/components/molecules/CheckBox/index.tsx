import React, { HTMLAttributes } from 'react';

import { CheckButton } from '../../atoms/CheckButton';

import { Container } from './styles';

type CheckBoxProps = HTMLAttributes<HTMLDivElement> & {
  isChecked: boolean;
  label?: string;
};

export const CheckBox = ({
  isChecked,
  label,
  ...rest
}: CheckBoxProps): JSX.Element => {
  return (
    <Container {...rest}>
      <CheckButton isChecked={isChecked} />
      {label && <p>{label}</p>}
    </Container>
  );
};
