import React, { ImgHTMLAttributes } from 'react';

import { Container } from './styles';

export type Size = 'normal' | 'small';

type Props = ImgHTMLAttributes<HTMLImageElement> & {
  size?: Size;
};

export const PictureCircle = ({
  alt,
  className,
  size = 'normal',
  ...props
}: Props): JSX.Element => {
  return (
    <Container className={className} size={size}>
      <img alt={alt || ''} {...props} />
    </Container>
  );
};
