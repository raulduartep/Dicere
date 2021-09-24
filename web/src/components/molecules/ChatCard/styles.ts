import { Type } from 'components/organisms/SideBarApp';
import { NavLink } from 'react-router-dom';
import styled, { css } from 'styled-components';

type ContainerProps = {
  type: Type;
};

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 0.8rem;
  color: ${({ theme }) => theme.onSurface.high};
  width: 100%;
  margin-left: 1.6rem;
`;

export const FirstRow = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const RoomName = styled.p`
  font-weight: 500;
  white-space: nowrap;
  overflow-x: hidden;
  text-overflow: ellipsis;
  max-width: 17rem;
  font-size: 1.6rem;
`;

export const MessageDate = styled.span`
  font-size: 0.9rem;
`;

export const SecondRow = styled.div``;

export const NewMessagesCount = styled.div`
  display: flex;
  position: absolute;
  bottom: 1.6rem;
  right: 1.6rem;
  align-items: center;
  justify-content: center;
  width: 1.6rem;
  height: 1.6rem;
  min-width: 1.6rem;
  min-height: 1.6rem;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.primary.main};

  span {
    color: ${({ theme }) => theme.onPrimary.high};
    font-size: 0.9rem;
  }
`;

const containerContracted = css`
  padding: 0.4rem;
  width: min-content;
  align-items: center;
  justify-content: center;

  ${Content} {
    display: none;
  }

  ${NewMessagesCount} {
    width: 1.9rem;
    height: 1.9rem;
    min-width: 1.9rem;
    min-height: 1.9rem;
    top: -0.2rem;
    right: -0.2rem;
    bottom: 0;
    border: 3px solid ${({ theme }) => theme.box.twodp};
  }
`;

export const Container = styled(NavLink)<ContainerProps>`
  display: flex;
  position: relative;
  width: 100%;
  border-radius: 0.8rem;
  padding: 1.6rem;
  background-color: transparent;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => `${theme.primary.main}12`};
  }

  ${({ type }) => type === 'contracted' && containerContracted}

  @media (max-width: 1000px) {
    ${containerContracted}
  }

  &.selected::after {
    content: '';
    width: 2px;
    height: 100%;
    background-color: ${({ theme }) => theme.primary.mediumDark};
    position: absolute;
    right: -1rem;
  }
`;
