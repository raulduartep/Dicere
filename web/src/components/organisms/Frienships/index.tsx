import React from 'react';
import { Switch, useRouteMatch, Route, Redirect } from 'react-router-dom';
import { FrienshipsHeader } from 'components/molecules/FrienshipsHeader';
import { FriendshipsBodyAll } from 'components/organisms/FriendshipsBodyAll';

import { Container, Body } from './styles';
import { FriendshipsBodyPending } from '../FriendshipsBodyPending';
import { FriendshipsBodyAdd } from '../FriendshipsBodyAdd';

export const Frienships = (): JSX.Element => {
  const { url } = useRouteMatch();

  return (
    <Container>
      <FrienshipsHeader />
      <Body>
        <Switch>
          <Route path={url} exact>
            <Redirect to={`${url}/all`} />
          </Route>
          <Route path={`${url}/all`} render={FriendshipsBodyAll} />
          <Route path={`${url}/pendings`} render={FriendshipsBodyPending} />
          <Route path={`${url}/new`} render={FriendshipsBodyAdd} />
        </Switch>
      </Body>
    </Container>
  );
};
