import { LinearLoading } from 'components/atoms/LinearLoading';
import React from 'react';
import { IconBaseProps } from 'react-icons';

import { Container, ContainerProgressBar, FeatureImage } from './styles';

type Props = {
  featureImage: string | React.FC<IconBaseProps>;
  text?: string;
};

export const LoadingTemplate = ({
  featureImage: Image,
  text,
}: Props): JSX.Element => {
  return (
    <Container>
      <FeatureImage>
        {typeof Image === 'string' ? (
          <img src={Image} alt="Talk Talk" />
        ) : (
          <Image />
        )}
      </FeatureImage>
      <ContainerProgressBar>
        <LinearLoading />
      </ContainerProgressBar>
      {!!text && <p>{text}</p>}
    </Container>
  );
};
