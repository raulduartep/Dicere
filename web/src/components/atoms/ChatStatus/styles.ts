import styled from 'styled-components';
import { BiCheckDouble } from 'react-icons/bi';
import { ChatMessageStatusSize } from '.';

type Props = {
  size: ChatMessageStatusSize;
};

export const Container = styled.div<Props>`
  display: flex;
  align-items: flex-end;

  svg {
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${({ size }) => (size === 'normal' ? '2rem' : '1.6rem')};
    height: auto;
    color: inherit;
  }
`;

export const ViewedIcon = styled(BiCheckDouble)`
  color: ${({ theme }) => theme.primary.main};
`;
