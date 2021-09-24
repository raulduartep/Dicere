import { NavLink } from 'react-router-dom';
import styled, { css } from 'styled-components';

export const Container = styled.header`
  display: flex;
  column-gap: 3.6rem;
  height: min-content;
  width: 100%;
  padding: 2.4rem;
  border-bottom: 1px solid ${({ theme }) => theme.divider};
`;

export const Title = styled.h2`
  font-size: 2.4rem;
  font-weight: 700;
  color: ${({ theme }) => theme.onSurface.high};
`;

export const Links = styled.div`
  display: flex;
  align-items: center;
  column-gap: 0.8rem;
`;

const linkStyles = css`
  font-size: 1.2rem;
  text-transform: uppercase;
  padding: 0.8rem 1.2rem;
  border-radius: 0.4rem;
  transition: background-color 0.1s;
  font-weight: 500;
`;

export const Link = styled(NavLink)`
  ${linkStyles}
  color: ${({ theme }) => theme.onSurface.high};

  &:hover {
    background-color: ${({ theme }) => theme.button.hover};
  }

  &.actived {
    color: ${({ theme }) => theme.primary.main};

    &:hover {
      background-color: ${({ theme }) => theme.button.hoverPrimary};
    }
  }
`;

export const Actions = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

export const PrimaryLink = styled(NavLink)`
  ${linkStyles}
  border: 1px solid ${({ theme }) => theme.divider};
  color: ${({ theme }) => theme.onSurface.high};

  &:hover {
    background-color: ${({ theme }) => theme.button.hover};
  }

  &.actived {
    color: ${({ theme }) => theme.primary.main};

    &:hover {
      background-color: ${({ theme }) => theme.button.hoverPrimary};
    }
  }
`;
