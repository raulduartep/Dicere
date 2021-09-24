import styled from 'styled-components';

export const Container = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.6rem;
  border-bottom: 1px solid ${({ theme }) => theme.divider};
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 0.8rem;
  padding: 0 1.6rem;

  p {
    font-size: 2.4rem;
    font-weight: 700;
    text-align: center;
  }
`;

export const Status = styled.div`
  display: flex;
  align-items: center;
  column-gap: 0.8rem;

  > div {
    width: 0.8rem;
    height: 0.8rem;
    min-width: 0.8rem;
    min-height: 0.8rem;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.success};
  }

  span {
    color: ${({ theme }) => theme.success};
    font-size: 1.2rem;
    font-weight: 700;
  }
`;
