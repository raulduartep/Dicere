import styled from 'styled-components';

export const Container = styled.textarea`
  height: 5rem;
  width: 100%;
  background: #eee;
  display: flex;
  align-items: center;
  flex-grow: 1;
  background-color: ${({ theme }) => theme.input.background};
  border-radius: 4px;
  padding: 1.6rem;
  resize: none;
  word-break: break-all;
  height: min-content;
`;
