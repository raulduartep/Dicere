import React, { InputHTMLAttributes } from 'react';
import { IconBaseProps } from 'react-icons';

import { Container, ContainerInput, PreviousIcon } from './styles';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  icon?: React.FC<IconBaseProps>;
};

export const Input = ({
  icon: Icon,
  className,
  ...props
}: Props): JSX.Element => {
  return (
    <Container className={className}>
      <ContainerInput>
        {!!Icon && <PreviousIcon as={Icon} />}

        <input {...props} />
      </ContainerInput>
    </Container>
  );
};
