import styled, { css } from 'styled-components';
import { Type } from '../SideBarApp';

type Props = {
  type: Type;
};

const contracted = css`
  padding: 1.6rem 0 0 0;
  align-items: center;
`;

export const Container = styled.nav<Props>`
  display: flex;
  flex-direction: column;
  row-gap: 1.6rem;
  overflow: hidden;
  padding: 1.6rem 2.4rem 0 2.4rem;

  ${({ type }) => type === 'contracted' && contracted}

  @media (max-width: 1000px) {
    ${contracted}
  }
`;
