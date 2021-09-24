import React, { ReactNode } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import { Container, HeaderBar, Content, SideBar, Body } from './styles';

type Props = {
  headerBar: ReactNode;
  sideBar: ReactNode;
  chat: ReactNode;
  frienships: ReactNode;
};

export const AppTemplate = ({
  headerBar,
  sideBar,
  chat,
  frienships,
}: Props): JSX.Element => {
  const { url } = useRouteMatch();

  return (
    <Container>
      <HeaderBar>{headerBar}</HeaderBar>
      <Content>
        <SideBar>{sideBar}</SideBar>
        <Switch>
          <Route path={`${url}/chat/:id`}>
            <Body>{chat}</Body>
          </Route>
          <Route path={`${url}/frienships`}>
            <Body>{frienships}</Body>
          </Route>
        </Switch>
      </Content>
    </Container>
  );
};
