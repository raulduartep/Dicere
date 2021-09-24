import styled, { css } from 'styled-components';

type Props = {
  contracted: boolean;
};

const containerContracted = css`
  width: 7rem;
  min-width: 7rem;
`;

export const Container = styled.div<Props>`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 40rem;
  max-width: 40rem;
  transition: width 0.1s;
  background-color: ${({ theme }) => theme.box.twodp};
  box-shadow: ${({ theme }) => theme.box.shadows.twodp};
  border-radius: 0.8rem;

  ${({ contracted }) => contracted && containerContracted}

  @media (max-width: 1000px) {
    ${containerContracted}
  }
`;
