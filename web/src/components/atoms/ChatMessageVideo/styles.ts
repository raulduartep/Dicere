import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  border-radius: 0.8rem;
  overflow: hidden;
`;

export const Button = styled.button`
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);

  svg {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 5rem;
    height: auto;
  }
`;

export const VideoThumbnailContainer = styled.div`
  filter: blur(0.8rem) grayscale(0.3);
`;
