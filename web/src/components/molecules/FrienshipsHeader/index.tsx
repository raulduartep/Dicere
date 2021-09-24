import React from 'react';
import { useRouteMatch } from 'react-router-dom';

import { Container, Links, Link, Title, Actions, PrimaryLink } from './styles';

export const FrienshipsHeader = (): JSX.Element => {
  const { url } = useRouteMatch();

  return (
    <Container>
      <Title>Amigos</Title>
      <Actions>
        <Links>
          <Link to={`${url}/all`} activeClassName="actived">
            Todos
          </Link>
          <Link to={`${url}/pendings`} activeClassName="actived">
            Pendentes
          </Link>
        </Links>
        <PrimaryLink to={`${url}/new`} activeClassName="actived">
          Adicionar um amigo
        </PrimaryLink>
      </Actions>
    </Container>
  );
};
