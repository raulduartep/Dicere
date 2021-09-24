import React, { ButtonHTMLAttributes, forwardRef } from 'react';
import { IconBaseProps } from 'react-icons';

import { Container } from './styles';

export type Size = 'tiny' | 'small' | 'normal' | 'big';

type PropsIconButton = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: React.FC<IconBaseProps>;
  size?: Size;
};

export const IconButton = forwardRef<HTMLButtonElement, PropsIconButton>(
  ({ icon: Icon, size = 'normal', ...props }, ref): JSX.Element => {
    return (
      <Container ref={ref} size={size} {...props}>
        <Icon />
      </Container>
    );
  }
);
