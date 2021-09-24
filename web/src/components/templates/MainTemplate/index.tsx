import React, { ReactNode, useLayoutEffect } from 'react';

import { Container, SubContainer, Content, FeatureImage } from './styles';

type Props = {
  featureImage: string;
  responsive?: boolean;
  reverse?: boolean;
  content: ReactNode;
  pageTitle?: string;
};

export const MainTemplate = ({
  reverse = false,
  featureImage,
  content,
  responsive = false,
  pageTitle,
}: Props): JSX.Element => {
  useLayoutEffect(() => {
    document.title = pageTitle || 'Dicere';
  });

  return (
    <Container>
      <SubContainer responsive={responsive} reverse={reverse}>
        <FeatureImage>
          <img src={featureImage} alt="Imagem de destaque" />
        </FeatureImage>
        <Content>{content}</Content>
      </SubContainer>
    </Container>
  );
};
