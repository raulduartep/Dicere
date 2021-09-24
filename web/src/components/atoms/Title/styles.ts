import styled, { css } from 'styled-components';
import { Type } from '.';

type Props = {
  as: Type;
};

const h1 = css`
  font-size: 3.6rem;
  font-weight: 700;
`;

const h3 = css`
  font-size: 1.4rem;
  font-weight: 500;
`;

export const Container = styled.h1<Props>`
  ${({ as }) => (as === 'h1' ? h1 : as === 'h3' ? h3 : '')}
`;
