import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.box.fourdp};
  padding: 0.8rem 2.4rem;
  box-shadow: ${({ theme }) => theme.box.shadows.fourdp};
  border-radius: 0.8rem;
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  height: 100%;
  column-gap: 1.6rem;

  img {
    height: 2.7rem;
    width: auto;
  }
`;

export const Nav = styled.nav`
  display: flex;
  column-gap: 1.6rem;
  padding-left: 1.6rem;
  border-left: 1px solid ${({ theme }) => theme.divider};
`;

export const Link = styled(NavLink)`
  font-size: 1.4rem;
  font-weight: 700;
  color: ${({ theme }) => theme.onSurface.high};
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.primary.main};
  }

  &.actived:hover {
    color: ${({ theme }) => theme.primary.mediumDark};
  }

  &.actived {
    color: ${({ theme }) => theme.primary.main};
  }
`;

export const Main = styled.main`
  height: 100%;
`;

export const Assets = styled.div`
  display: flex;
  height: 100%;
  column-gap: 1.6rem;

  @media (max-width: 750px) {
    display: none;
  }
`;

export const MoreIconButton = styled.div`
  display: none;

  @media (max-width: 750px) {
    display: block;
  }
`;
