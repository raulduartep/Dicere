import styled from 'styled-components';

export const Container = styled.div`
  min-height: 100vh;
  width: 100vw;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 2.4rem;

  p {
    font-size: 1.4rem;
    font-weight: 300;
    color: ${({ theme }) => theme.onSurface.medium};
  }
`;

export const FeatureImage = styled.div`
  width: 18rem;
  height: auto;

  img {
    width: 100%;
    height: auto;
    object-fit: contain;
  }

  svg {
    width: 100%;
    height: auto;
  }
`;

export const ContainerProgressBar = styled.div`
  width: 20rem;
`;
