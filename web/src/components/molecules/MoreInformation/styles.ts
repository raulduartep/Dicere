import styled from 'styled-components';

export const Container = styled.div`
  width: 60rem;
  height: 100%;
  background-color: ${({ theme }) => theme.box.twodp};
  box-shadow: ${({ theme }) => theme.box.shadows.twodp};
  border-radius: 0.8rem;
`;
