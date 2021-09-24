import React, { ButtonHTMLAttributes } from 'react';
import { IconBaseProps } from 'react-icons';
import { BubblesLoading } from '../../atoms/BubblesLoading';

import { Container, StyledIcon } from './styles';

export type Variant = 'contained' | 'outlined' | 'text';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  variant?: Variant;
  icon?: React.FC<IconBaseProps>;
  text: string;
};

export const Button = ({
  onClick,
  disabled,
  loading = false,
  variant = 'contained',
  text,
  icon: Icon,
  ...rest
}: Props): JSX.Element => {
  return (
    <Container
      disabled={disabled}
      loading={loading}
      variant={variant}
      onClick={disabled || loading ? undefined : onClick}
      {...rest}
    >
      {loading ? (
        <BubblesLoading />
      ) : (
        <>
          {!!Icon && <StyledIcon as={Icon} />}
          {text}
        </>
      )}
    </Container>
  );
};
