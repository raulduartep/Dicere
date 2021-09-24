import React from 'react';

import { IconButton } from 'components/atoms/IconButton';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { ButtonUser } from 'components/molecules/ButtonUser';
import { SearchInputApp } from 'components/molecules/SearchInputApp';
import logoMinimal from '../../../assets/static/logo_minimal.svg';

import {
  Container,
  Header,
  Nav,
  Link,
  Main,
  Assets,
  MoreIconButton,
} from './styles';

export const AppBar = (): JSX.Element => {
  return (
    <Container>
      <Header>
        <img src={logoMinimal} alt="Dicere" />
        <Nav>
          <Link to="/app/chat" activeClassName="actived">
            Chat
          </Link>
          <Link to="/app/frienships" activeClassName="actived">
            Amigos
          </Link>
        </Nav>
      </Header>
      <Main>
        <Assets>
          <SearchInputApp />
          <ButtonUser
            image="https://static-cdn.jtvnw.net/jtv_user_pictures/ac696c6f-7843-46f4-9506-2227d187eab5-profile_image-300x300.png"
            status="avaliable"
            name="Raul Duarte Pereira"
          />
        </Assets>
        <MoreIconButton>
          <IconButton icon={BiDotsVerticalRounded} />
        </MoreIconButton>
      </Main>
    </Container>
  );
};
