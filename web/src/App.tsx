import { Toast } from 'components/atoms/Toast';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './assets/styles/global';

import { darkTheme } from './assets/styles/theme/dark';
import { AuthProvider } from './contexts/auth';
import { ChatProvider } from './contexts/chat';
import { SocketProvider } from './contexts/socket';
import { Routes } from './routes';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <BrowserRouter>
        <SocketProvider>
          <AuthProvider>
            <ChatProvider>
              <Routes />
              <Toast />
            </ChatProvider>
          </AuthProvider>
        </SocketProvider>
      </BrowserRouter>
      <GlobalStyles />
    </ThemeProvider>
  );
};

export default App;
