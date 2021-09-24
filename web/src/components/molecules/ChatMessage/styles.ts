import styled, { css } from 'styled-components';

type ContainerProps = {
  isMine: boolean;
  hasGroupIndication: boolean;
  isDisabled: boolean;
};

export const SubContainer = styled.div`
  display: flex;
  column-gap: 1.6rem;
  min-width: 0;
`;

export const BoxContainer = styled.div`
  display: flex;
  position: relative;
  min-width: 0;
`;

export const Box = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.6rem 1.6rem 0.8rem 1.6rem;
  max-width: 46rem;
  min-width: 0;
`;

export const MessageDate = styled.span`
  align-self: flex-end;
  font-size: 1rem;
  margin-top: 0.4rem;
`;

export const Triangle = styled.div`
  width: 0;
  height: 0;
`;

const mineStyles = css`
  margin-left: auto;

  ${Box} {
    background-color: ${({ theme }) => theme.primary.main};
    color: ${({ theme }) => theme.onPrimary.high};
  }

  ${MessageDate} {
    color: ${({ theme }) => theme.onPrimary.high};
  }
`;

const yoursStyles = css`
  ${Box} {
    background-color: ${({ theme }) => theme.input.background};
    color: ${({ theme }) => theme.onSurface.high};
  }

  ${MessageDate} {
    color: ${({ theme }) => theme.onSurface.medium};
  }

  ${BoxContainer} {
    flex-direction: row-reverse;
  }
`;

const hasGroupIndicationStyles = (isMine: boolean) => css`
  padding-top: 0.8rem;

  ${Box} {
    border-radius: ${() =>
      isMine ? '0.8rem 0 0.8rem 0.8rem' : '0 0.8rem 0.8rem 0.8rem'};
  }
`;

const dontHaveGroupIndicationStyles = css`
  padding-top: 0.4rem;

  ${Box} {
    border-radius: 0.8rem;
  }
`;

export const Container = styled.div<ContainerProps>`
  display: flex;
  column-gap: 1.6rem;
  min-width: 0;
  height: min-content;
  opacity: ${({ isDisabled }) => (isDisabled ? '0.38' : '1')};

  ${({ isMine }) => (isMine ? mineStyles : yoursStyles)}

  ${({ hasGroupIndication, isMine }) =>
    hasGroupIndication
      ? hasGroupIndicationStyles(isMine)
      : dontHaveGroupIndicationStyles}
`;
