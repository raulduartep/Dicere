import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
   :root {
    font-size: 60%;
    overflow-x: hidden;
  }
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;

    /* &::-webkit-scrollbar {
      width: 1rem;
    }

    &::-webkit-scrollbar-corner {
      border: none;
      background: none;
    }

    &::-webkit-scrollbar-thumb {
      border: solid 3px transparent;
      box-shadow: inset 0 0 10px 10px ${({ theme }) =>
        theme.onSurface.disabled};
      border-radius: 0.5rem;
      max-height: 1rem;
      transition: box-shadow .1s;

     &:hover {
      box-shadow: inset 0 0 10px 10px ${({ theme }) => theme.onSurface.medium};
     } 
    } */
    

    ::-webkit-scrollbar {
      width: 1.6rem; 
      width: 1.6rem;
    }

    ::-webkit-scrollbar-thumb, &::-webkit-scrollbar-track {
      border: 0.5rem solid rgba(0, 0, 0, 0); 
      background-clip: padding-box;
      border-radius: 0.8rem;
    }

    ::-webkit-scrollbar-thumb {
      background-color: ${({ theme }) => theme.onSurface.disabled};
      transition: background-color .1s;

      &:hover {
        background-color: ${({ theme }) => theme.onSurface.medium};
      }
    }

    &::-webkit-scrollbar-track {
      background-color: ${({ theme }) => theme.divider};
    }

    ::-webkit-scrollbar-corner {
      background-color: transparent;
    }
  }

  body {
      background: ${({ theme }) => theme.surface};
      -webkit-font-smoothing: antialiased;
  }

  body, button, input, textarea, pre {
      font: 400 1.6rem Roboto;
      color: ${({ theme }) => theme.onSurface.high};
      outline: 0;
      border: 0;
  }

  button {
      cursor: pointer;
      background: none;
  }

  a {
    text-decoration: none;
    color: rgba(255,255,255,0.87);
  }

  @media (min-width: 700px) {
    :root {
        font-size: 62.5%;
    }
  } 
`;
