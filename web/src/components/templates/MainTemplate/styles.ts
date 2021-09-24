import styled, { css } from 'styled-components';

type ContentProps = {
  reverse: boolean;
  responsive: boolean;
};

export const Container = styled.div`
  width: 100vw;
  min-height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FeatureImage = styled.div`
  max-width: 55rem;
  max-height: 55rem;
  width: 55rem;
  height: 55rem;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

export const SubContainer = styled.div<ContentProps>`
  width: 100%;
  max-width: 1250px;

  display: flex;
  flex-direction: ${({ reverse }) => (reverse ? 'row-reverse' : 'row')};
  align-items: center;
  justify-content: space-around;

  @media (max-width: 1250px) {
    ${({ responsive }) =>
      responsive
        ? css`
            flex-direction: column;
            row-gap: 2.4rem;

            ${FeatureImage} {
              max-height: 100px;
            }
          `
        : css`
            justify-content: center;

            ${FeatureImage} {
              display: none;
            }
          `}
  }
`;

export const Content = styled.div`
  width: 100%;
  max-width: 480px;
`;
