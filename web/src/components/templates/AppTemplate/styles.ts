import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
`;

export const HeaderBar = styled.div`
  display: flex;
  height: 6.6rem;
  width: 100%;
  padding: 0.8rem;
  z-index: 10;
`;

export const Content = styled.div`
  display: flex;
  width: 100%;
  height: calc(100% - 6.6rem);
`;

export const SideBar = styled.div`
  width: min-content;
  height: 100%;
  padding: 0.8rem;
`;

export const Body = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  padding: 0.8rem;
  min-width: 0;
`;
