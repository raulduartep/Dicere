import styled from 'styled-components';

type VolumeSliderProps = {
  isVisible: boolean;
};

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 0.4rem;
  margin-bottom: 0.8rem;
  position: relative;
`;

export const VolumeSlider = styled.div<VolumeSliderProps>`
  position: absolute;
  top: 0;
  transform: translateY(-100%);
  width: 100%;
  display: flex;
  justify-content: center;
  height: 4rem;
  transition: visibility 0.1s, opacity 0.1s;
  visibility: ${({ isVisible }) => (isVisible ? 'visible' : 'hidden')};
  opacity: ${({ isVisible }) => (isVisible ? '1' : '0')};
`;
