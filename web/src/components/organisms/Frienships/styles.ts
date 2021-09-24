import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.box.twodp};
  box-shadow: ${({ theme }) => theme.box.shadows.twodp};
  border-radius: 0.8rem;
`;

export const Body = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  padding: 2.4rem 0;
`;
