import React, { ReactNode } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Box } from 'components/atoms/Box';

import { Button } from 'components/molecules/Button';
import { useHistory } from 'react-router-dom';
import { Paragraph } from 'components/atoms/Paragraph';
import { Title } from 'components/atoms/Title';
import { Container, Footer, Header, Main } from './styles';

type Props = {
  form?: ReactNode;
  title: string;
  description: string;
};

export const PageBox = ({ description, form, title }: Props): JSX.Element => {
  const history = useHistory();

  return (
    <Container>
      <Header>
        <Title>{title}</Title>
        <Paragraph>{description}</Paragraph>
      </Header>
      {!!form && (
        <Main>
          <Box elevation="twodp">{form}</Box>
        </Main>
      )}
      <Footer>
        <Button
          text="Voltar"
          icon={FaArrowLeft}
          variant="text"
          onClick={() => history.goBack()}
        />
      </Footer>
    </Container>
  );
};
