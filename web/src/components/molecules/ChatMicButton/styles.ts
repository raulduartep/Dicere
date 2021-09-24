import { IconButton } from 'components/atoms/IconButton';
import styled, { css } from 'styled-components';

type ContainerProps = {
  recording: boolean;
};

export const ButtonStartRecording = styled(IconButton)``;

// export const Button = styled.button`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   height: 100%;
//   color: ${({ theme }) => theme.onPrimary.high};
//   width: 100%;

//   svg {
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     height: 2.4rem;
//     width: auto;
//   }

//   &:hover {
//     background-color: ${({ theme }) => theme.primary.mediumDark};
//   }
// `;

export const Info = styled.div`
  display: flex;
  align-items: center;
  column-gap: 0.8rem;
`;

export const Recording = styled.div`
  align-items: center;
  justify-content: space-around;
  width: 100%;
  height: 100%;
  column-gap: 1.6rem;
`;

export const Status = styled.div`
  @keyframes recording {
    0%,
    100% {
      background-color: ${({ theme }) => theme.error};
    }

    50% {
      background-color: transparent;
    }
  }

  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.error};
  animation: recording 1s linear infinite;
`;

export const Count = styled.p`
  color: ${({ theme }) => theme.onSurface.high};
`;

export const CancelButton = styled(IconButton)`
  color: ${({ theme }) => theme.error};

  &:hover {
    background-color: ${({ theme }) => `${theme.error}1F`};
  }
`;

export const AcceptButton = styled(IconButton)`
  color: ${({ theme }) => theme.success};

  &:hover {
    background-color: ${({ theme }) => `${theme.success}1F`};
  }
`;

const recordingStyles = css`
  ${Recording} {
    display: flex;
  }

  ${ButtonStartRecording} {
    display: none;
  }
`;

const notRecordingStyles = css`
  ${Recording} {
    display: none;
  }

  ${ButtonStartRecording} {
    display: flex;
  }
`;

export const Container = styled.div<ContainerProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 5rem;
  max-height: 5rem;
  max-width: 18rem;
  border-radius: 0.4rem;
  overflow: hidden;

  ${({ recording }) => (recording ? recordingStyles : notRecordingStyles)}
`;
