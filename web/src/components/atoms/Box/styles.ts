import styled from 'styled-components';
import { Elevation, Type } from '.';

type Props = {
  type: Type;
  elevation?: Elevation;
};

export const Container = styled.div<Props>`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme, elevation }) =>
    elevation ? theme.box[elevation] : 'transparent'};
  width: 100%;
  max-width: ${({ type }) => (type === 'contracted' ? '48rem' : 'none')};
  box-shadow: ${({ theme, elevation }) =>
    elevation && theme.box.shadows[elevation]};
  border-radius: 4px;
  padding: 4rem;
`;
