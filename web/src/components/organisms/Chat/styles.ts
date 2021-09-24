import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  min-width: 0;
  column-gap: 1.6rem;
`;

export const SubContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => `${theme.primary.main}12`};
  border-radius: 0.8rem;
  display: flex;
  flex-direction: column;
`;
