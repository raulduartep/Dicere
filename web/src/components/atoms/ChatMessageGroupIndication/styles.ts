import { ChatMessageOwner } from 'components/molecules/ChatMessage';
import styled, { css } from 'styled-components';

type Props = {
  owner: ChatMessageOwner;
};

const mineStyles = css`
  right: -6px;
  border-top: 6px solid ${({ theme }) => theme.primary.main};
  border-right: 6px solid transparent;
`;

const yoursStyles = css`
  left: -6px;
  border-top: 6px solid ${({ theme }) => theme.input.background};
  border-left: 6px solid transparent;
`;

export const Container = styled.div<Props>`
  position: absolute;
  top: 0;
  content: '';
  width: 0;
  height: 0;

  ${({ owner }) => (owner === 'mine' ? mineStyles : yoursStyles)}
`;
